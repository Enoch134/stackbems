import User  from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Sequelize } from "sequelize";


export const getUsers = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const { business_name } = decodedToken;

    const response = await User.findAll({
      where: {
        Active: true,
        Deleted: false,
        business_name: business_name
      },
      order: [["id", "DESC"]]
    });

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in getUsers:", error);

    // Check for specific error types
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token has expired" });
    }

    res.status(500).json({ msg: "Internal Server Error" });
  }
};


export const getUser = async (req, res) => {
  try {
    // Assuming you have the ID of the user who is making the request
    const loggedInUserId = req.user.id;

    // Retrieve users where CreatedBy is equal to the logged-in user's ID
    const response = await User.findAll({
      where: {
        Active: true,
        Deleted: false,
        CreatedBy: loggedInUserId
      },
      order: [["DataCreated", "DESC"]]
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false
      }
    });

    if (!response) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
    const {
    first_name,
    last_name,
    email,
    password,
    confPassword,
    phone,
    business_name
  } = req.body;

  
  // Password validation
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      msg: "Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and symbols"
    });
  }

  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password do not match" });

  const hashedPass = bcrypt.hashSync(password, 10);

  //   const createdBy = req.user.userName
  try {
    await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPass,
      phone: phone,
      CreatedBy: `${first_name} ${last_name}`,
      business_name:business_name
    });
    res.status(201).json({ msg: "Register Successful" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
      Active: true,
      Deleted: false
    }
  });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
    }
    


  const {
    first_name,
    last_name,
    email,
    password,
    confPassword,
    phone,
  } = req.body;

  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password do not match" });
  }

  if (!password || !confPassword) {
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password are required" });
  }

  const passwordRegex =
    /^(?=.*[a-zA-Z0-9])(?=.*[$@$!%*?&])[A-Za-z0-9$@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      msg: "Password must contain at least 8 characters, including at least one letter, one number, and one symbol"
    });
  }

  const isSamePassword = await bcrypt.compare(password, user.password);
  if (isSamePassword) {
    return res
      .status(400)
      .json({ msg: "New password cannot be the same as the current password" });
  }

  let hashedPass;
  try {
    hashedPass = await bcrypt.hash(password, 10);
  } catch (error) {
    return res.status(500).json({ msg: "Error hashing password" });
  }

  
     const token = req.headers.authorization.replace("Bearer ", "");
     const secretKey = process.env.JWT_SECRET;
     const decodedToken = jwt.verify(token, secretKey);
     const CreatedBy = decodedToken.CreatedBy;


  try {
    await User.update(
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashedPass,
        phone: phone,
        UpdatedBy: CreatedBy,
        DateUpdated: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      {
        where: {
          id: user.id
        }
      }
    );
    res.status(200).json({ msg: "User Updated Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false
      }
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

     const token = req.headers.authorization.replace("Bearer ", "");
     const secretKey = process.env.JWT_SECRET;
     const decodedToken = jwt.verify(token, secretKey);
     const CreatedBy  = decodedToken.CreatedBy;


    await User.update(
      {
        Active: false,
        Deleted: true,
        DateDeleted: new Date(),
        DeletedBy:CreatedBy
      },
      {
        where: {
          id: user.id
        }
      }
    );

    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};



