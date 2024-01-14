import Role from "../model/Role.js";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import { Sequelize } from "sequelize";

export const getRole = async (req, res) => {
  try {
     const token = req.headers.authorization.replace("Bearer ", "");
     const secretKey = process.env.JWT_SECRET;
     const decodedToken = jwt.verify(token, secretKey);
     const business_name = decodedToken.business_name;
    const response = await Role.findAll({
      where: {
        business_name: business_name
      },
      order: [["id", "DESC"]]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const response = await Role.findOne({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createRole = async (req, res) => {
  try {
    const { name, userId } = req.body;

      const token = req.headers.authorization.replace("Bearer ", "");
      const secretKey = process.env.JWT_SECRET;
      const decodedToken = jwt.verify(token, secretKey);
      const business_name = decodedToken.business_name;
    const role = await Role.create({
      name:name,
      userId: userId,
      business_name:business_name
    });
    res.status(201).json({ msg: "Registration successful", role });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((err) => err.message);
      res
        .status(400)
        .json({ msg: "Validation failed", errors: validationErrors });
    } else {
      console.error("Error creating user:", error);
      res
        .status(500)
        .json({ msg: "An error occurred while creating the user" });
    }
  }
};

export const updateRole = async (req, res) => {
  const role = await Role.findOne({
    where: {
      id: req.params.id
    }
  });
  if (!role) return res.status(404).json({ msg: "Role Not Found" });
  const { name, userId } = req.body;

  try {
    await Role.update(
      {
        name,
        userId,
      },
      {
        where: {
          id: role.id
        }
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteRole = async (req, res) => {
  const role = await Role.findOne({
    where: {
      id: req.params.id
    }
  });
  if (!role) return res.status(404).json({ msg: "Role Not Found" });
  try {
    await Role.destroy({
      where: {
        id: role.id
      }
    });
    res.status(200).json({ msg: "Role Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
