const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// Load env vars
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(express.json());

// CORS (keep only once)
app.use(
  cors({
    origin: "http://localhost:3000", // Next.js frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Import routes
const vendorRoutes = require("./routes/vendorRoutes");
const businessProfileRoutes = require("./routes/businessProfileRoutes");

// Use routes
app.use("/api/vendors", vendorRoutes);
app.use("/api/business-profiles", businessProfileRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
