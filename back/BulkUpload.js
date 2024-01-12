import express from "express";
import bodyparser from  "body-parser";
import fs from "fs";
import csv from "fast-csv";
import multer from "multer";
import path from "path";
import Product from "./model/Product.js";

const app = express();
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
//use express static folder
app.use(express.static("./public"));
app.use(express.json({ limit: "50mb" }));
// body-parser middleware use
app.use(bodyparser.json());



//! Use of Multer
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./uploads/");
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

var upload = multer({
  storage: storage
});


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


export const productBulkUpload = app.post(
  "/uploadfile",
  upload.single("uploadfile"),
  async (req, res) => {
    const filePath = path.join(__dirname, "uploads", req.file.filename);

    try {
      await UploadCsvDataToMySQL(filePath);

      res.json({
        msg: "File uploaded successfully!",
        file: req.file
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  }
);

async function UploadCsvDataToMySQL(filePath) {
  const stream = fs.createReadStream(filePath);
  const csvData = [];
  const csvStream = csv
    .parse()
    .on("data", function (data) {
      csvData.push(data);
    })
    .on("end", async function () {
      csvData.shift();

      try {
     
        await Promise.all(
          csvData.map(async (entry) => {
              const name = entry[0];
              const sell_method = entry[1];
              const margin = entry[2];
              const price = entry[3];
              const cost_price = entry[4];
              const new_stock = entry[5];
              const stock_available = entry[6];
              const tag = entry[7];
              const expiry_date = entry[8];
              const expiry_date_alert = entry[9];
              const batch_no = entry[10];
              const tax = entry[11];
              const variant_name = entry[12];
              const low_stock_alert = entry[13];
              const cateId = entry[14];
              const url = entry[15];
              const businessId = entry[16];
            await Product.create({
              name: name,
              sell_method: sell_method,
              margin: margin,
              price: price,
              cost_price: cost_price,
              new_stock: new_stock,
              stock_available: stock_available,
              tag: tag,
              expiry_date: expiry_date,
              expiry_date_alert: expiry_date_alert,
              batch_no: batch_no,
              tax: tax,
              variant_name: variant_name,
              low_stock_alert: low_stock_alert,
              cateId: cateId,
              url: url,
              businessId: businessId
            });
          })
        );
        console.log("Data inserted successfully");
      } catch (error) {
        console.error(error);
      }

      fs.unlinkSync(filePath);
    });

  stream.pipe(csvStream);
}