import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import bodyparser from "body-parser";
import dotenv from "dotenv"
import flash from "express-flash";
import {pool, db} from "./config/Database.js";
import User from "./routes/User.js";
import Role from "./routes/Role.js";
import Privilege from "./routes/Privilege.js";
import Business from "./routes/Business.js";
import Auth from "./routes/Auth.js";
import Customer from "./routes/Customer.js";
import Sale from "./routes/Sale.js";
import Product from "./routes/Product.js";
import Category from "./routes/Category.js";
import path from "path"
import fileUpload from "express-fileupload"
import { __dirname } from "./dirname.js";
import { productBulkUpload } from "./BulkUpload.js";



const app = express();

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(fileUpload());

app.use(express.json());
app.use(express.static("./public"));

app.use(cookieParser());

// body-parser middleware use
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


app.use(flash());


(async () => {
  await db.sync();
})();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:2025"
  })
);

app.use(User)
app.use(Role)
app.use(Privilege)
app.use(Business)
app.use(Auth)
app.use(Product)
app.use(Sale)
app.use(Category)
app.use(Customer)
app.use(productBulkUpload)

dotenv.config();
const PORT = process.env.PORT || 2024;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});