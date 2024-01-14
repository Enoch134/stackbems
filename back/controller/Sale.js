import Business from "../model/Business.js";
import Sale from "../model/Sale.js";
import { Op } from "sequelize";
import { Sequelize } from "sequelize";
import jwt from "jsonwebtoken";

export const getSale = async (req, res) => {
  try {
      const token = req.headers.authorization.replace("Bearer ", "");

      // Use the environment variable for the secret key
      const secretKey = process.env.JWT_SECRET;

      // Decode the token to get user information
      const decodedToken = jwt.verify(token, secretKey);
      const { business_name } = decodedToken;
      const response = await Sale.findAll({
      where: {
        Active: true,
        Deleted: false,
        business_name:business_name
  
      },
      order: [["DateCreated", "DESC"]],
      include: [
        {
          model: Business,
          as: "business",
          attributes: ["id", "name"]
        }
      ]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSaleById = async (req, res) => {
  try {
    const response = await Sale.findOne({
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false
      }
    });

    if (!response) {
      return res.status(404).json({ msg: "Sale not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createSale = async (req, res) => {
  const {
    selected_items,
    sub_total,
    tax,
    discount,
    payment_receive,
    charges_description,
    shipping,
    balance,
    ground_total,
    payment_status,
    payment_method,
    customer_phone,
    customer_name,
    businessId,
  } = req.body;

  try {
  
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
     const CreatedBy = decodedToken.CreatedBy;

    // Create sale with business_name automatically set
    await Sale.create({
      selected_items: selected_items,
      sub_total: sub_total,
      tax: tax,
      discount: discount,
      payment_receive: payment_receive,
      charges_description: charges_description,
      shipping: shipping,
      balance: balance,
      ground_total: ground_total,
      payment_status: payment_status,
      payment_method: payment_method,
      customer_phone: customer_phone,
      customer_name: customer_name,
      business_name: business_name,
      businessId: businessId,
      CreatedBy: CreatedBy
    });

    res.status(201).json({ msg: "Sale created successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


export const updateSale = async (req, res) => {

  const response = await Sale.findOne({
    where: {
      id: req.params.id,
      Active: true,
      Deleted: false
    }
  });

  if (!response) {
    return res.status(404).json({ msg: "Sale not found" });
    }

  const {
    selected_items,
    sub_total,
    tax,
    discount,
    payment_receive,
    charges_description,
    shipping,
    balance,
    ground_total,
    payment_status,
    payment_method,
    customer_phone,
    customer_name,
    businessId,
  } = req.body;

   const token = req.headers.authorization.replace("Bearer ", "");
   const secretKey = process.env.JWT_SECRET;
   const decodedToken = jwt.verify(token, secretKey);
  const business_name = decodedToken.business_name;
  const CreatedBy = decodedToken.CreatedBy;
  

  try {
    await Sale.update(
      {
        selected_items: selected_items,
        sub_total: sub_total,
        tax: tax,
        discount: discount,
        payment_receive: payment_receive,
        charges_description: charges_description,
        shipping: shipping,
        balance: balance,
        ground_total: ground_total,
        payment_status: payment_status,
        payment_method: payment_method,
        customer_phone: customer_phone,
        customer_name: customer_name,
        business_name: business_name,
        businessId: businessId,
        UpdatedBy: CreatedBy,
        DateUpdated: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      {
        where: {
          id: response.id
        }
      }
    );
    res.status(200).json({ msg: "Sale Updated Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteSale = async (req, res) => {
  try {
    const response = await Sale.findOne({
      where: {
        id: req.params.id,
        Active: true,
        Deleted: false
      }
    });

    if (!response) {
      return res.status(404).json({ msg: "Sale not found" });
    }

    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const CreatedBy = decodedToken.CreatedBy;
    await Sale.update(
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

    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};




// export const getTotalPaidAmountPerDay = async (req, res) => {
//   try {
//     const response = await Sale.findAll({
//       attributes: [
//         [
//           Sequelize.fn("date_trunc", "day", Sequelize.col("DateCreated")),
//           "day"
//         ],
//         [
//           Sequelize.fn(
//             "sum",
//             Sequelize.cast(Sequelize.col("sub_total"), "NUMERIC")
//           ),
//           "totalAmount"
//         ]
//       ],
//       where: {
//         payment_status: "unpaid"
//       },
//       group: ["day"],
//       order: [["day", "ASC"]] 
//     });

//     res.status(200).json(response);
//   } catch (error) {
//     console.error("Error getting total paid amount per day:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
export const getTopSalesPerItemSelectedItemsPerDay = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const response = await Sale.findAll({
      attributes: [
        [
          Sequelize.fn("date_trunc", "day", Sequelize.col("DateCreated")),
          "day"
        ],
        [Sequelize.literal('"selected_items"'), "selected_items"],
        [
          Sequelize.fn(
            "sum",
            Sequelize.cast(Sequelize.col("sub_total"), "NUMERIC")
          ),
          "totalAmount"
        ]
      ],
      where: {
        business_name:business_name,
        DateCreated: {
          [Op.gte]: today
        }
      },
      group: ["day", "selected_items"],
      order: [
        ["day", "ASC"],
        ["totalAmount", "DESC"]
      ],
      limit: 20
    });

    const formattedResponse = response.map((item) => ({
      day: item.dataValues.day,
      selected_items: item.dataValues.selected_items,
      totalAmount: item.dataValues.totalAmount.toString()
    }));

    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error("Error getting top sales per selected_items per day:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTotalSalesPerDay = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const response = await Sale.findAll({
      attributes: [
        [
          Sequelize.fn("date_trunc", "day", Sequelize.col("DateCreated")),
          "day"
        ],
        [
          Sequelize.fn(
            "sum",
            Sequelize.cast(Sequelize.col("ground_total"), "NUMERIC")
          ),
          "totalAmount"
        ]
      ],
      where: {
        business_name:business_name,
        DateCreated: {
          [Sequelize.Op.gte]: today 
        }
      },
      group: ["day"],
      order: [["day", "ASC"]]
    });

    const formattedResponse = response.map((item) => ({
      day: item.dataValues.day,
      totalAmount: item.dataValues.totalAmount.toString() 
    }));

    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error("Error getting total sales per day:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const SalesReport = async (req, res) => {
  try {
    const { startDate, endDate, payment_status, selected_items } = req.body;
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    let response;
     response = await Sale.findAll({
      where: {
        DateCreated: {
          [Op.between]: [startDate, endDate]
        },
        payment_status: payment_status,
         selected_items: selected_items,
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

export const getTopSalesPerItemSelectedItemsPerWeek = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    const response = await Sale.findAll({
      attributes: [
        [
          Sequelize.fn("date_trunc", "week", Sequelize.col("DateCreated")),
          "week"
        ],
        [Sequelize.literal('"selected_items"'), "selected_items"], 
        [
          Sequelize.fn(
            "sum",
            Sequelize.cast(Sequelize.col("sub_total"), "NUMERIC")
          ),
          "totalAmount"
        ]
      ],
      where: {
        business_name:business_name
      },
      group: ["week", "selected_items"],
      order: [
        ["week", "ASC"],
        ["totalAmount", "DESC"]
      ],
      limit: 20 
    });

    const formattedResponse = response.map((item) => ({
      week: item.dataValues.week,
      selected_items: item.dataValues.selected_items,
      totalAmount: item.dataValues.totalAmount.toString()
    }));

    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error(
      "Error getting top sales per selected_items per week:",
      error
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getTopSalesPerItemSelectedItemsPerYear = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    const response = await Sale.findAll({
      attributes: [
        [
          Sequelize.fn("date_trunc", "year", Sequelize.col("DateCreated")),
          "year"
        ],
        [Sequelize.literal('"selected_items"'), "selected_items"], // Add alias for selected_items
        [
          Sequelize.fn(
            "sum",
            Sequelize.cast(Sequelize.col("ground_total"), "NUMERIC")
          ),
          "totalAmount"
        ]
      ],
      where: {
        business_name:business_name
      },
      group: ["year", "selected_items"],
      order: [
        ["year", "ASC"],
        ["totalAmount", "DESC"]
      ],
      limit: 20
    });

    const formattedResponse = response.map((item) => ({
      year: item.dataValues.year,
      selected_items: item.dataValues.selected_items,
      totalAmount: item.dataValues.totalAmount.toString()
    }));

    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error(
      "Error getting top sales per selected_items per year:",
      error
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getTotalSalesPerMonth = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    const response = await Sale.findAll({
      attributes: [
        [
          Sequelize.fn("date_trunc", "month", Sequelize.col("DateCreated")),
          "month"
        ],
        [
          Sequelize.fn(
            "sum",
            Sequelize.cast(Sequelize.col("ground_total"), "NUMERIC")
          ),
          "totalAmount"
        ]
      ],
      where: {
        business_name:business_name
      },
      group: ["month"],
      order: [["month", "ASC"]]
    });

    // Initialize an object to store the monthly sums
    const monthlySums = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0
    };

    response.forEach((item) => {
      if (item.dataValues.month) {
        const date = new Date(item.dataValues.month);
        const monthName = date.toLocaleString("en-US", { month: "long" });

        // Add the totalAmount value to the corresponding month
        if (item.dataValues.totalAmount) {
          monthlySums[monthName] += parseFloat(item.dataValues.totalAmount);
        }
      }
    });

    // Log the final monthly sums for debugging
    console.log("Monthly Sums:", monthlySums);

    // Format the response to match your desired format
    const formattedResponse = Object.keys(monthlySums).map((month) => ({
      month,
      totalAmount: monthlySums[month].toString()
    }));

    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error("Error getting total sales per month:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




export const getSalesWithPositiveBalance = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey);
    const business_name = decodedToken.business_name;
    const sales = await Sale.findAll({
      attribute: ["id", "selected_items", "sub_total", "balance", "customer_name", "customer_phone"],
      where: {
        Active: true,
        Deleted: false,
        balance: {
          [Sequelize.Op.gt]: "0"
        },
        business_name:business_name
      },
      include: [
        {
          model: Business,
          as: "business",
          attributes: []
        }
      ]
    });

    res.status(200).json(sales);
  } catch (error) {
    console.error("Error retrieving sales with positive balance:", error);
    throw error;
  }
};


