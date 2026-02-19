const express = require("express");
const Newspaper = require("../models/newsletter");
const newspaperRouter = express.Router();

// GET route
newspaperRouter.get("/", (req, res) => {
  res.render("pages/newspaper.ejs");
});

// POST route
newspaperRouter.post("/", async (req, res) => {
  try {
    let { heading, buttonText, description } = req.body;
    const payload = { heading, buttonText, description };

    const data = await Newspaper.findOne({});
    if (!data) {
      const newData = new Newspaper(payload);
      await newData.save();
      req.flash("success", "Newspaper Section inserted successfully!");
      return res.redirect("/newspaper");
    } else {
      await Newspaper.findByIdAndUpdate(data._id, payload, { new: true });
      req.flash("success", "Newspaper Section updated successfully!");
      return res.redirect("/newspaper");
    }
  } catch (error) {
    console.log(error);
  }
});


module.exports = newspaperRouter;