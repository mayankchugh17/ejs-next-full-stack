const express = require("express");
const resonanceRouter = express.Router();
const Resonance = require("../models/resonance.js");
const isAuth = require("../middlewares/isAuth.js");

// GET path
resonanceRouter.get("/", isAuth,async (req, res) => {
  await res.render("pages/resonance.ejs");
});

// POST path
resonanceRouter.post("/", isAuth, async (req, res) => {
  try {
    const { heading, description, authorName, degination } = req.body;
    const payload = {
      heading,
      description,
      authorName,
      degination,
    };
    const existData = await Resonance.findOne({});

    if (existData) {
      // Update
      await Resonance.findByIdAndUpdate(existData._id, payload);
      req.flash("success", "Resonance section updated successfully!");
    } else {
      // Create
      const newData = new Resonance(payload);
      await newData.save();
      req.flash("success", "Resonance section inserted successfully!");
    }

    res.redirect("/resonance");

  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Something went wrong");
  }
});

// GET API for Frontend

resonanceRouter.get("/data", async (req, res)=>{
    const data = await Resonance.findOne({});
    return res.status(200).json(data);
})

module.exports = resonanceRouter;
