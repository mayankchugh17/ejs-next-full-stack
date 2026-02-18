const express = require("express");
const hero2 = require("../models/hero2.js");
const isAuth = require("../middlewares/isAuth.js");
const hero2Router = express.Router();

// render hero2 page
hero2Router.get("/", isAuth,async (req, res) => {
    try {
        const id = "699496ef47df18ed6191b46f"
        const data = await hero2.findById(id);
        res.render("pages/hero2.ejs", { data });
    } catch (error) {
        res.status(401);
        console.log(error)
    }
});

// submit form
hero2Router.post("/", isAuth,async (req, res) => {
  try {
    const { heading, buttonText } = req.body;

    // update document
    const updatedHero2 = await hero2.findByIdAndUpdate(
      "699496ef47df18ed6191b46f",
      { heading, buttonText },
      { new: true },
    );

    if (updatedHero2) {
      req.flash("success", "Hero2 section updated successfully!");
    } else {
      // create new
      const data = new hero2({ heading, buttonText });
      await data.save();
      req.flash("success", "Hero2 section inserted successfully!");
    }

    return res.redirect("/hero2");
  } catch (error) {
    console.log(error);
    req.flash("error", "Failed to update hero2 section");
    return res.redirect("/hero2");
  }
});

// APIs to get data for frontend

hero2Router.get("/data", async (req, res) => {
    try {
        const data = await hero2.findOne({});
        return res.status(200).json(data);
    } catch (error) {
        res.json(error);
    }
});

module.exports = hero2Router;
