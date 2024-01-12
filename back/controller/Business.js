import Business from "../model/Business.js";
import User from "../model/User.js";
import { Sequelize } from "sequelize";
import jwt from "jsonwebtoken";

export const getBusinesses = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    const response = await Business.findAll({
      where: {
        Active: true,
        Deleted: false,
        business_name:business_name
      },
      order: [["DateCreated", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "first_name", "last_name"]
        }
      ]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getBusiness = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    const businesses = await Business.findAll({
      where: {
        Active: true,
        Deleted: false,
        business_name: business_name 
      },
      order: [["DateCreated", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "first_name", "last_name"]
        }
      ]
    });

    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getBusinessById = async (req, res) => {
  try {
    const response = await Business.findOne({
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false
      }
    });

    if (!response) {
      return res.status(404).json({ msg: "Business not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createBusiness = async (req, res) => {
  const { name, description, email, country, currency, phone, business_type, userId } =
    req.body;
  
     const token = req.headers.authorization.replace("Bearer ", "");
     const secretKey = process.env.JWT_SECRET;
     const decodedToken = jwt.verify(token, secretKey);
     const business_name = decodedToken.business_name;
     const CreatedBy = decodedToken.CreatedBy;
    
  try {
    await Business.create({
      name: name,
      description: description,
      country: country,
      currency: currency,
      phone: phone,
      email: email,
      userId: userId,
      business_type: business_type,
      CreatedBy: CreatedBy,
      business_name:business_name
    });
    res.status(201).json({ msg: "Register Successful" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateBusiness = async (req, res) => {
  const response = await Business.findOne({
    where: {
      id: req.params.id,
      Active: true,
      Deleted: false
    }
  });

  if (!response) {
    return res.status(404).json({ msg: "Business not found" });
  }

  const { name, description, email, country, currency, phone, business_type } =
    req.body;
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    const CreatedBy = decodedToken.CreatedBy;

  try {
    await Business.update(
      {
        name: name,
        description: description,
        country: country,
        currency: currency,
        phone: phone,
        email: email,
        business_type: business_type,
        UpdatedBy: CreatedBy,
        business_name: business_name,
        DateUpdated: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      {
        where: {
          id: response.id
        }
      }
    );
    res.status(200).json({ msg: "User Updated Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


export const deleteBusiness = async (req, res) => {
  try {
    const user = await Business.findOne({
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false
      }
    });

    if (!user) {
      return res.status(404).json({ msg: "Business not found" });
    }

      const token = req.headers.authorization.replace("Bearer ", "");
      const secretKey = process.env.JWT_SECRET;
      const decodedToken = jwt.verify(token, secretKey);
      const CreatedBy = decodedToken.CreatedBy;
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

