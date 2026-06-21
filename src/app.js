const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

// ======================
// Middlewares
// ======================
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

console.log("__dirname =", __dirname);
console.log("Uploads Path =", path.join(__dirname, "uploads"));

// Static Upload Folder
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

// ======================
// Routes
// ======================
const businessProfileRoutes = require("./routes/businessProfileRoutes");

app.use("/api/auth", businessProfileRoutes);

// ======================
// Server Start
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
