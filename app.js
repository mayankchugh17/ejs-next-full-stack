const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const flash = require('connect-flash');
const cookieParser = require("cookie-parser");

const path = require("path");
const ejsMate = require("ejs-mate");
const dotenv = require("dotenv");
dotenv.config();

// Routes
const adminRouter = require("./routes/adminRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");
const testimonialsRoute = require("./routes/testimonials/testimonials");
const serviceRouter = require("./routes/serviceRoute");
const unauthorizedRouter = require("./routes/unauthorized");

// port
const port = process.env.PORT || 8080;

// Middleware
app.use(cors(
  {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  }
));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", ejsMate);
app.use(bodyParser.json());
app.use(cookieParser());


// Use flash middleware
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});


// Middle to check is Admin Logged In
app.use((req, res, next) => {
  res.locals.isAdminLoggedIn = req.cookies.token ? true : false; // check is admin logged In
  next();
});

// Routes
app.use("/admin", adminRouter);
app.use("/dashboard", dashboardRouter);  
app.use("/testimonials", testimonialsRoute);
app.use("/services", serviceRouter);
app.use("/unauthorized", unauthorizedRouter);

// DB connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




