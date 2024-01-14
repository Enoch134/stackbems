import User from "../model/User.js";
import Role from "../model/Role.js";
import Privilege from "../model/Privilege.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const generateJWT = (userId, roles, privileges, business_name, CreatedBy) => {
  const payload = {
    userId,
    roles,
    privileges,
    business_name,
    CreatedBy,
  };

  const expiresIn = "12h";

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn
  });

  return token;
};

export const Login = async (req, res) => {
  try {
    const { email, business_name, password } = req.body;
    console.log("Received login request:", { email, business_name, password });
    console.log("Step 1: Inputs Received");

    if ((!email && !business_name) || !password) {
      console.log(
        "Step 2: Invalid Input - Email, business_name, or password missing"
      );
      return res
        .status(400)
        .json({ msg: "Email and password are required" });
    }

    // Check if the login attempt is based on email or business_name
    let user;
    if (email) {
      console.log("Step 2: Querying Database - by email");
      user = await User.findOne({
        where: {
          email: email
        },
        include: [{ model: Role, include: [Privilege] }]
      });
    } else if (business_name) {
      console.log("Step 2: Querying Database - by business_name");
      user = await User.findOne({
        where: {
          business_name: business_name
        },
        include: [{ model: Role, include: [Privilege] }]
      });
    }

    console.log("Step 3: Validating Password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!user.Active) {
      console.log("Step 4: User is not active");
      return res.status(401).json({
        msg: "Your account is disabled. Please contact your administrator."
      });
    }

    const compareUserPassword = await bcrypt.compare(password, user.password);

    if (!compareUserPassword) {
      console.log("Step 4: Wrong Password");
      return res.status(400).json({ msg: "Wrong Password" });
    }

    // Check if the provided business_name matches the user's business_name
    if (
      business_name &&
      user.business_name.toLowerCase() !== business_name.toLowerCase()
    ) {
      console.log("Step 4: Invalid business_name for this user");
      return res
        .status(401)
        .json({ msg: "Invalid business_name for this user" });
    }

    console.log("Step 5: Checking Business Name Match");
    // Check user roles and privileges
    const roles = user.roles.map((role) => role.name);
    const privileges = user.roles.flatMap((role) =>
      role.privileges.map((privilege) => privilege.name)
    );

    // Generate JWT token with user, role, and privilege information
    const token = generateJWT(
      user.id,
      roles,
      privileges,
      user.business_name,
      user.CreatedBy,
    );

    console.log("Step 5: Generating Token");
    // You can include additional user information in the response if needed
    res.status(200).json({
      accessToken: token,
      userId: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      CreatedBy: user.CreatedBy,
      roles: roles,
      privileges: privileges,
      business_name: user.business_name,
      // UpdatedBy: user.UpdatedBy,
      // DeletedBy: user.DeletedBy
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const Me = async (req, res) => {
  const token = req.header("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Invalid token format" });
  }

  const actualToken = token.slice(7);

  try {
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    if (decoded && decoded.userId) {
      const whereClause = {
        id: decoded.userId
      };

      if (decoded.business_name) {
        whereClause.business_name = decoded.business_name;
      }

      if (decoded.CreatedBy) {
        whereClause.CreatedBy = decoded.CreatedBy;
      }
    
      const user = await User.findOne({
        where: whereClause,
        include: [
          {
            model: Role,
            include: [Privilege]
          }
        ]
      });

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      // Extract user roles and privileges
      const roles = user.roles.map((role) => role.name);
      const privileges = user.roles.flatMap((role) =>
        role.privileges.map((privilege) => privilege.name)
      );

      // Create the response object
      const response = {
        msg: "Get User successful",
        user: {
          actualToken: actualToken,
          id: user.id,
          business_name: user.business_name,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          CreatedBy: user.CreatedBy,
          roles: roles,
          privileges: privileges
        }
      };

      res.status(200).json(response);
    } else {
      res.status(401).json({ msg: "No valid credential" });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ msg: "Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).json({ msg: "Invalid token" });
    } else {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
};

export const logoutUser = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    // Check if the token is blacklisted
    const isTokenBlacklisted = await prisma.blacklistedToken.findOne({
      where: {
        token
      }
    });

    if (isTokenBlacklisted) {
      return res
        .status(401)
        .json({ msg: "Token has already been invalidated" });
    }

    // Blacklist the token by adding it to the database
    await prisma.blacklistedToken.create({
      data: {
        token
      }
    });

    res
      .status(200)
      .json({ msg: "Token has been invalidated. You have logged out." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error while blacklisting the token" });
  }
};

export const UserAccess = async (req, res) => {
  const token = req.header("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Invalid token format" });
  }

  const actualToken = token.slice(7);

  try {
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    if (decoded && decoded.userId) {
      const whereClause = {
        id: decoded.userId
      };

      if (decoded.business_name) {
        whereClause.business_name = decoded.business_name;
      }

      if (decoded.CreatedBy) {
        whereClause.CreatedBy = decoded.CreatedBy;
      }

      const user = await User.findOne({
        where: whereClause,
        include: [
          {
            model: Role,
            include: [Privilege]
          }
        ]
      });

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      // Extract user roles and privileges
      const roles = user.roles.map((role) => role.name);
      const privileges = user.roles.flatMap((role) =>
        role.privileges.map((privilege) => privilege.name)
      );

      // Create the response object
      const response = {
        msg: "Get User successful",
        user: {
          actualToken: actualToken,
          id: user.id,
          business_name: user.business_name,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          CreatedBy: user.CreatedBy,
          roles: roles,
          privileges: privileges
        }
      };

      res.status(200).json(response);
    } else {
      res.status(401).json({ msg: "No valid credential" });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ msg: "Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).json({ msg: "Invalid token" });
    } else {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
};
