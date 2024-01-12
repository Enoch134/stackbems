import Business from "../model/Business.js";
import Customer from "../model/customer.js";
import { Sequelize } from "sequelize";
import jwt from "jsonwebtoken";

export const getCustomer = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    const response = await Customer.findAll({
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

export const getCustomerById = async (req, res) => {
  try {
    const response = await Customer.findOne({
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false
      }
    });

    if (!response) {
      return res.status(404).json({ msg: "Customer not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createCustomer = async (req, res) => {
  const { name, gender, email, country, address, phone, city, businessId } = req.body;
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    const CreatedBy = decodedToken.CreatedBy;
  try {
    await Customer.create({
      name: name,
      gender: gender,
      country: country,
      city: city,
      phone: phone,
      email: email,
      address: address,
      businessId: businessId,
      business_name:business_name,
      CreatedBy: CreatedBy
    });
    res.status(201).json({ msg: "Register Successful" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  const response = await Customer.findOne({
    where: {
      id: req.params.id,
      Active: true,
      Deleted: false
    }
  });

  if (!response) {
    return res.status(404).json({ msg: "Customer not found" });
  }

  const { name, gender, email, country, address, phone, city, businessId } =
    req.body;
  const token = req.headers.authorization.replace("Bearer ", "");
  const secretKey = process.env.JWT_SECRET;
  const decodedToken = jwt.verify(token, secretKey);
  const business_name = decodedToken.business_name;
  const CreatedBy = decodedToken.CreatedBy;

  try {
    await Customer.update(
      {
        name: name,
        gender: gender,
        country: country,
        city: city,
        phone: phone,
        email: email,
        address: address,
        businessId: businessId,
        UpdatedBy: CreatedBy,
        business_name:business_name,
        DateUpdated: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      {
        where: {
          id: response.id
        }
      }
    );
    res.status(200).json({ msg: "Customer Updated Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const response = await Customer.findOne({
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false
      }
    });

    if (!response) {
      return res.status(404).json({ msg: "Customer not found" });
    }

      const token = req.headers.authorization.replace("Bearer ", "");
      const secretKey = process.env.JWT_SECRET;
      const decodedToken = jwt.verify(token, secretKey);
      const CreatedBy = decodedToken.CreatedBy;
    
    await Customer.update(
      {
        Active: false,
        Deleted: true,
        DateDeleted: new Date(),
        CreatedBy:CreatedBy
      },
      {
        where: {
          id: response.id
        }
      }
    );

    res.status(200).json({ msg: "Customer Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
