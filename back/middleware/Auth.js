import jwt from "jsonwebtoken";
import User from "../model/User.js";
import Role from "../model/Role.js";
import Privilege from "../model/Privilege.js";


export const verifyToken = async (req, res, next) => {
  try {
    // Check if the Authorization header is present
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ msg: "Invalid or missing Authorization header" });
    }

    // Extract the token from the Authorization header
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Please login to your account!" });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Retrieve user information from the database
    const user = await User.findOne({
      where: {
        id: decodedToken.userId
      },
      include: {
        model: Role,
        include: [Privilege]
      }
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if user.roles is an array before using map and reduce
    const userRoles = Array.isArray(user.roles) ? user.roles : [];

    // Attach user information to the request object
    req.userId = user.id;

    req.businessName = user.business_name || '';
    req.CreatedBy = user.CreatedBy || "";


    req.userRoles = userRoles.map((role) => {
      if (role && role.name) {
        return role.name;
      } else {
        console.error("Undefined role found:", role);
        return "Undefined Role";
      }
    });

   req.userPrivileges = userRoles.reduce((acc, role) => {
     if (role && role.privileges) {
       role.privileges.forEach((privilege) => {
         if (privilege && privilege.name) {
           if (Array.isArray(privilege.name)) {
             acc = acc.concat(
               privilege.name.map((name) => ({ id: privilege.id, name }))
             );
           } else {
           
             acc.push({
               id: privilege.id,
               name: privilege.name
             });
           }
         } else {
           console.error("Undefined privilege found:", privilege);
         }
       });
     } else {
       console.error("Undefined role or privileges found:", role);
     }
     return acc;
   }, []);


    console.log("User information attached to request:", {
      userId: req.userId,
      userRoles: req.userRoles,
      userPrivileges: req.userPrivileges,
      businessName: req.businessName,
      CreatedBy: req.CreatedBy,
    });

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export const verifyTokenAndPrivileges = async (req, res, next) => {
  try {
    // Check if the Authorization header is present
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ msg: "Invalid or missing Authorization header" });
    }

    // Extract the token from the Authorization header
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Please login to your account!" });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Retrieve user information from the database
    const user = await User.findOne({
      where: {
        id: decodedToken.userId
      },
      include: {
        model: Role,
        include: [Privilege]
      }
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if user is an admin
    const isAdmin = req.userRoles.includes("admin");

    // Check if required roles and privileges are specified in the request body
    const requiredRoles = req.body.requiredRoles || [];
    const requiredPrivileges = req.body.requiredPrivileges || [];

    // Check if user has specific roles
    const hasRequiredRoles =
      isAdmin || requiredRoles.every((role) => req.userRoles.includes(role));

    // Check if user has specific privileges
    const hasRequiredPrivileges =
      isAdmin ||
      req.userPrivileges.some((privilege) =>
        requiredPrivileges.includes(privilege.name)
      );

    // If the user lacks either the required roles or privileges, return a 403 Forbidden status
    if (!hasRequiredRoles || !hasRequiredPrivileges) {
      return res.status(403).json({ msg: "Unauthorized access" });
    }

    // Attach user information to the request object for further use in the route handlers
    req.userId = user.id;
    req.businessName = user.business_name || "";
    req.CreatedBy = user.CreatedBy || "";
    req.userRoles = req.userRoles.map((role) => role.name);
    req.userPrivileges = req.userPrivileges.map((privilege) => ({
      id: privilege.id,
      name: privilege.name
    }));

    // Log user information for debugging purposes
    console.log("User information attached to request:", {
      userId: req.userId,
      userRoles: req.userRoles,
      userPrivileges: req.userPrivileges,
      businessName: req.businessName,
      CreatedBy: req.CreatedBy
    });

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};


