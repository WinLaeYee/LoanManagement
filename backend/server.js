const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Middleware
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/borrowers", require("./routes/BorrowerRoutes"));
app.use("/api/contracts", require("./routes/ContractRoutes"));
app.use("/api/loans", require("./routes/LoanRoutes"));
app.use("/api/repayments", require("./routes/RepaymentRoutes"));
app.use("/api/transactions", require("./routes/TransactionRoutes"));

// MongoDB Connection
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error("MongoDB connection error:", error));
