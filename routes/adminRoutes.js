const express = require("express");
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const { isAdminLoggedIn } = require("../middleware");
const genToken = require("../utils/genToken");

const adminRouter = express.Router();

// Dashboard route

adminRouter.get("/dashboard", isAdminLoggedIn, (req, res) => {
  res.render("admin/dashboard.ejs");
  req.flash("success", "Welcome to the admin dashboard!");
});

adminRouter.get("/register", (req, res) => {
  res.render("auth/register.ejs");
});

// Registration route
adminRouter.post("/auth/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log("Registration attempt for username:", username);
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.render("auth/register.ejs", {
        error: "Username already exists",
      });
    }

    // Let the model's pre-save hook hash the password to avoid double-hashing
    const newAdmin = new Admin({ username, password, role: "admin" });
    await newAdmin.save();
    res.redirect("/admin/login");
  } catch (err) {
    console.error(err);
    res.render("auth/register.ejs", {
      error: "An error occurred during registration",
    });
  }
});

// Login page route by get method
adminRouter.get("/login", (req, res) => {
  res.render("auth/login.ejs");
});

// Login route
adminRouter.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    // console.log('Login attempt for username:', username);

    if (!admin) {
      console.log("Admin not found for username:", username);
      return res.render("auth/login.ejs", { error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.render("auth/login.ejs", { error: "Invalid credentials" });
    }

    // Generating token
    const token = await genToken(admin.username);

    // set token in cookies 
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });


    console.log("Admin logged in:", admin.username);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("auth/login.ejs", { error: "An error occurred during login" });
  }
});

// Logout route
adminRouter.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.redirect("/admin/login")
});

module.exports = adminRouter;
