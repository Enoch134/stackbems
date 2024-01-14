import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import User from "./model/User";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/bulk-upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const buffer = req.file.buffer.toString();
    const rows = buffer.split("\n");
    const users = [];

    for (const row of rows) {
      const [first_name, last_name, email, phone, password, business_name] =
        row.split(",");

      users.push({
        first_name,
        last_name,
        email,
        phone,
        password,
        business_name,
        Active: true,
        Deleted: false,
        DateCreated: new Date()
      });
    }

    // Bulk insert users into the database
    await User.bulkCreate(users);

    res.json({ success: true, message: "Bulk upload successful." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
