import Category from "../model/Category.js";
import Business from "../model/Business.js";
import { Sequelize } from "sequelize";
import jwt from "jsonwebtoken";

export const getCategory = async (req, res) => {
  try {

    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    const response = await Category.findAll({
      where: {
        Active: true,
        Deleted: false,
        business_name:business_name
      },
      order: [["DateCreated", "DESC"]]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const response = await Category.findOne({
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false
      }
    });

    if (!response) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createCategory = async (req, res) => {
       const { name, code, businessId } = req.body;
       const token = req.headers.authorization.replace("Bearer ", "");
       const secretKey = process.env.JWT_SECRET;
       const decodedToken = jwt.verify(token, secretKey);
       const business_name = decodedToken.business_name;
       const CreatedBy = decodedToken.CreatedBy;
   
  try {
    await Category.create({
      name: name,
      code: code,
      businessId: businessId,
      CreatedBy: CreatedBy,
      business_name:business_name
    });
    res.status(201).json({ msg: "Register Successful" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const Categories = await Category.findOne({
    where: {
      id: req.params.id,
      Active: true,
      Deleted: false
    }
  });

  if (!Categories) {
    return res.status(404).json({ msg: "Business not found" });
  }

  const { name, code, businessId } = req.body;
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    const CreatedBy = decodedToken.CreatedBy;

  try {
    await Category.update(
      {
        name: name,
        code: code,
        businessId: businessId,
        UpdatedBy: CreatedBy,
        business_name: business_name,
        DateUpdated: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      {
        where: {
          id: Categories.id
        }
      }
    );
    res.status(200).json({ msg: "Categories Updated Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const Categories = await Category.findOne({
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false
      }
    });

    if (!Categories) {
      return res.status(404).json({ msg: "Business not found" });
    }

      const token = req.headers.authorization.replace("Bearer ", "");
      const secretKey = process.env.JWT_SECRET;
      const decodedToken = jwt.verify(token, secretKey);
      const CreatedBy = decodedToken.CreatedBy;
    await Category.update(
      {
        Active: false,
        Deleted: true,
        DateDeleted: new Date(),
        DeletedBy: CreatedBy
      },
      {
        where: {
          id: Categories.id
        }
      }
    );

    res.status(200).json({ msg: "Category Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
