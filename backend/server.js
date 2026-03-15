const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
dotenv.config();
const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const connectDB = require("./config/db");
require("./config/passport");


connectDB();

const app = express();
app.use(passport.initialize());


app.use(cors());
app.use(express.json());

app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/business", require("./routes/businessRoutes"));
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});