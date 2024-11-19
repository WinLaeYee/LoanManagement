// const express = require("express");
// const mongoose = require("mongoose");
// const fs = require("fs");
// const path = require("path");
// const dotenv = require("dotenv");
// const cors = require("cors");

// dotenv.config();
// const app = express();
// const corsOptions = {
//   origin: "http://localhost:5173", // Allow only your frontend app
//   methods: "GET,POST,PUT,DELETE", // Specify allowed methods
// };
// app.use(cors(corsOptions));
// app.use(express.json());

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// app.use("/api/borrowers", require("./routes/BorrowerRoutes"));
// app.use("/api/contracts", require("./routes/ContractRoutes"));
// app.use("/api/loans", require("./routes/LoanRoutes"));
// app.use("/api/repayments", require("./routes/RepaymentRoutes"));
// app.use("/api/transactions", require("./routes/TransactionRoutes"));

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("MongoDB connected successfully");
//     app.listen(process.env.PORT, () =>
//       console.log(`Server running on port ${process.env.PORT}`)
//     );
//   })
//   .catch((error) => console.log("MongoDB connection error:", error));



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
