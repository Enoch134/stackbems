import Business from "../model/Business.js";
import Category from "../model/Category.js";
import Product from "../model/Product.js";
import path from "path";
import fs from "fs/promises";
import { __dirname } from "../dirname.js";
import { Sequelize } from "sequelize";
import User from "../model/User.js";
import { Op } from "sequelize"
import Sale from "../model/Sale.js"; 
import jwt from "jsonwebtoken"; 
import { v2 as cloudinary } from "cloudinary";



export const getProduct = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    const response = await Product.findAll({
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

export const getAllProducts = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    const response = await Product.findAll({
      where: {
        business_name: business_name,
        Active: true,
        Deleted: false
      },
      include: [
        {
          model: Business,
          as: "business",
          attributes: ["id","name", "userId"]
        }
      ],
      order: [["DateCreated", "DESC"]]
    });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getStockAvailable = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    const response = await Product.findOne({
      where: {
        business_name: business_name,
        Active: true,
        Deleted: false
      },
      order: [["DateCreated", "DESC"]]
    });

    if (response) {
      res.status(200).json({ stock_available: response.stock_available });
    } else {
      res.status(404).json({ msg: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false
      }
    });

    if (!response) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const createProduct = async (req, res) => {
//   const {
//     name,
//     sell_method,
//     margin,
//     price,
//     cost_price,
//     stock_available,
//     new_stock,
//     tag,
//     expiry_date,
//     expiry_date_alert,
//     batch_no,
//     tax,
//     variant_name,
//     low_stock_alert,
//     cateId,
//     businessId,
//   } = req.body;

//    const token = req.headers.authorization.replace("Bearer ", "");
//    const secretKey = process.env.JWT_SECRET;
//    const decodedToken = jwt.verify(token, secretKey);
//   const business_name = decodedToken.business_name;
//    const CreatedBy = decodedToken.CreatedBy;


//   const stocks = parseInt(stock_available) + parseInt(new_stock);


//   if (!req.files || !req.files.url)
//     return res.status(400).json({ msg: "No File Uploadeds" });

//   console.log(req.files);

//   const file = req.files.url;
//   if (!file || !file.data) {
//     return res.status(400).json({ msg: "Invalid File Structure" });
//   }

//   const fileSize = file.data.length;
//   const ext = path.extname(file.name);
//   const fileName = file.md5 + ext;
//   const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
//   const allowedType = [".png", ".jpg", ".jpeg"];

//   if (!allowedType.includes(ext.toLowerCase()))
//     return res.status(422).json({ msg: "Invalid Images" });
//   if (fileSize > 20000000)
//     return res.status(422).json({ msg: "Image must be less than 20 MB" });

//   file.mv(`./public/images/${fileName}`, async (err) => {
//     if (err) return res.status(500).json({ msg: "File upload error" });

//     try {
//       await Product.create({
//         name: name,
//         sell_method: sell_method,
//         margin: margin,
//         price: price,
//         cost_price: cost_price,
//         new_stock: new_stock,
//         stock_available: stocks,
//         tag: tag,
//         url: url,
//         expiry_date: expiry_date,
//         expiry_date_alert: expiry_date_alert,
//         batch_no: batch_no,
//         tax: tax,
//         variant_name: variant_name,
//         low_stock_alert: low_stock_alert,
//         businessId: businessId,
//         cateId: cateId,
//         CreatedBy: CreatedBy,
//         business_name:business_name
//       });
//       res.status(201).json({ msg: "Register Successful" });
//     } catch (error) {
//       res.status(400).json({ msg: error.message });
//     }
//   });
// };


import { v2 as cloudinary } from "cloudinary";


export const createProduct = async (req, res) => {
  const {
    name,
    sell_method,
    margin,
    price,
    cost_price,
    stock_available,
    new_stock,
    tag,
    expiry_date,
    expiry_date_alert,
    batch_no,
    tax,
    variant_name,
    low_stock_alert,
    cateId,
    businessId
  } = req.body;

  const token = req.headers.authorization.replace("Bearer ", "");
  const secretKey = process.env.JWT_SECRET;
  const decodedToken = jwt.verify(token, secretKey);
  const business_name = decodedToken.business_name;
  const CreatedBy = decodedToken.CreatedBy;

  const stocks = parseInt(stock_available) + parseInt(new_stock);

  if (!req.files || !req.files.url) {
    return res.status(400).json({ msg: "No File Uploaded" });
  }

  const file = req.files.url;
  if (!file || !file.data) {
    return res.status(400).json({ msg: "Invalid File Structure" });
  }

  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase())) {
    return res.status(422).json({ msg: "Invalid Images" });
  }

  if (fileSize > 20000000) {
    return res.status(422).json({ msg: "Image must be less than 20 MB" });
  }

  try {
    // Configure Cloudinary using environment variables
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    // Upload the image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      file.tempFilePath,
      {
        folder: "demo" 
      }
    );

    await Product.create({
      name: name,
      sell_method: sell_method,
      margin: margin,
      price: price,
      cost_price: cost_price,
      new_stock: new_stock,
      stock_available: stocks,
      tag: tag,
      url: cloudinaryResponse.secure_url,
      expiry_date: expiry_date,
      expiry_date_alert: expiry_date_alert,
      batch_no: batch_no,
      tax: tax,
      variant_name: variant_name,
      low_stock_alert: low_stock_alert,
      businessId: businessId,
      cateId: cateId,
      CreatedBy: CreatedBy,
      business_name: business_name
    });

    res.status(201).json({ msg: "Register Successful" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};



export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if the product exists and is active
    const existingProduct = await Product.findOne({
      where: {
        id: productId,
        Active: true,
        Deleted: false
      }
    });

    if (!existingProduct) {
      return res.status(404).json({ msg: "Product not found or inactive" });
    }

    const {
      name,
      sell_method,
      margin,
      price,
      cost_price,
      new_stock,
      stock_available,
      tag,
      expiry_date,
      expiry_date_alert,
      batch_no,
      tax,
      variant_name,
      low_stock_alert,
      cateId,
      businessId,
    } = req.body;

    const stocks = parseInt(stock_available) + parseInt(new_stock);
    
    let imageUrl = existingProduct.url; // Keep the existing image URL by default

    // Check if a new image file is provided
    if (req.files && req.files.url) {
      const file = req.files.url;

      if (!file || !file.data) {
        return res.status(400).json({ msg: "Invalid File Structure" });
      }

      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Invalid Images" });
      }

      if (fileSize > 20000000) {
        return res.status(422).json({ msg: "Image must be less than 20 MB" });
      }

      // Move the new file to the images directory
      await file.mv(`./public/images/${fileName}`);
      imageUrl = `${req.protocol}://${req.get("host")}/images/${fileName}`;

      // Delete the old image file if it exists
      if (existingProduct.url) {
        const oldImagePath = path.join(
          __dirname,
          "../public/images/",
          path.basename(existingProduct.url)
        );

        try {
          // Check if the file exists before attempting to delete it
          await fs.access(oldImagePath);
          await fs.unlink(oldImagePath);
        } catch (error) {
          console.error("Error deleting old image:", error.message);
        }
      }
    }

    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    const CreatedBy = decodedToken.CreatedBy;

    await Product.update(
      {
        name,
        sell_method,
        margin,
        price,
        url: imageUrl, 
        cost_price,
        new_stock,
        stock_available: stocks,
        tag,
        expiry_date,
        expiry_date_alert,
        batch_no,
        tax,
        variant_name,
        low_stock_alert,
        businessId,
        cateId,
        UpdatedBy: CreatedBy,
        business_name: business_name,
        DateUpdated: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      {
        where: {
          id: productId
        }
      }
    );

    res.status(200).json({ msg: "Product Updated Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false
      }
    });

    if (!response) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const CreatedBy = decodedToken.CreatedBy;

    await Product.update(
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

    res.status(200).json({ msg: "Product Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


export const getExpiringProducts = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    const currentDate = new Date();
    const expiringProducts = await Product.findAll({
      where: {
        business_name:business_name,
        expiry_date_alert: {
          [Op.lte]: currentDate
        },
        expiry_date: {
          [Op.gte]: currentDate
        }
      },
      attributes: [ "name", "expiry_date", "tag"]
    });

    const productsWithRemainingDays = expiringProducts.map((product) => {
      const expiryDate = new Date(product.expiry_date);
      const remainingDays = Math.ceil(
        (expiryDate - currentDate) / (1000 * 60 * 60 * 24)
      );

      return {
        name: product.name,
        tag: product.tag,
        expiry_date: product.expiry_date,
        remaining_days: remainingDays
      };
    });

    res.status(200).json(productsWithRemainingDays);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getLowStockProducts = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    const lowStockProducts = await Product.findAll({
      where: {
        business_name:business_name,
        stock_available: {
          [Op.lte]: Sequelize.literal('"low_stock_alert"') 
        }
      },
      attributes: [ "name", "stock_available", "low_stock_alert", "tag"]
    });

    res.status(200).json(lowStockProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


export const reduceProducts = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by ID
    const product = await Product.findByPk(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Check if there is enough stock to reduce
    if (product.stock_available <= 0) {
      return res.status(400).json({ msg: "No stock available to reduce" });
    }

    // Reduce the stock by 1
    product.stock_available -= 1;

    // Save the updated product
    await product.save();

    res.json({ msg: "Stock reduced successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getendSockAvailable = async (req, res) => {
  try {
    const productName = req.params.productName;

    // Execute a Sequelize query to get product details by name
    const product = await Product.findOne({
      where: {
        name: {
          [Op.iLike]: productName // Case-insensitive search
        }
      }
    });

    if (product) {
      // Extract the stock_available attribute
      const { stock_available } = product;

      // Send only the stock_available attribute in the response
      res.json({ stock_available });
    } else {
      // Return an error if the product was not found
      res.status(404).json({ msg: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


export const getProductHistory = async (req, res) => {
  try {
    const { name } = req.body;
     const token = req.headers.authorization.replace("Bearer ", "");
     const secretKey = process.env.JWT_SECRET;
     const decodedToken = jwt.verify(token, secretKey);
     const business_name = decodedToken.business_name;
    let response;
    response = await Product.findAll({
      where: {
        name: name,
        business_name:business_name
      },
      include: [
        {
          model: Business,
          as: "business"
        }
      ]
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

