import Privilege from "../model/Privilege.js";
import Role from "../model/Role.js";
import jwt from "jsonwebtoken";
import { Sequelize } from "sequelize";

export const getPrivilege = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const { business_name } = decodedToken;
    const response = await Privilege.findAll({
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

export const getPrivilegeById = async (req, res) => {
  try {
    const response = await Privilege.findOne({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPrivilege = async (req, res) => {
  try {
    const { name, roleId } = req.body;

    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    
    const privilege = await Privilege.create({
      name:name,
      roleId:roleId,
      business_name:business_name,
    });
    res.status(201).json({ msg: "Registration successful", privilege });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((err) => err.message);
      res
        .status(400)
        .json({ msg: "Validation failed", errors: validationErrors });
    } else {
      console.error("Error creating privilege:", error);
      res
        .status(500)
        .json({ msg: "An error occurred while creating the privilege" });
    }
  }
};

export const updatePrivilege = async (req, res) => {
  const Privileges = await Privilege.findOne({
    where: {
      id: req.params.id
    }
  });
  if (!Privileges) return res.status(404).json({ msg: "Privilege Not Found" });
  const { name, roleId } = req.body;

   const token = req.headers.authorization.replace("Bearer ", "");
   const secretKey = process.env.JWT_SECRET;
   const decodedToken = jwt.verify(token, secretKey);
   const business_name = decodedToken.business_name;

  try {
    await Privilege.update(
      {
        name:name,
        roleId: roleId,
        business_name:business_name
      },
      {
        where: {
          id: Privileges.id
        }
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deletePrivilege = async (req, res) => {
  const Privilege = await Privilege.findOne({
    where: {
      id: req.params.id
    }
  });
  if (!user) return res.status(404).json({ msg: "Privilege Not Found" });
  try {
    await Privilege.destroy({
      where: {
        id: Privilege.id
      }
    });
    res.status(200).json({ msg: "Privilege Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
