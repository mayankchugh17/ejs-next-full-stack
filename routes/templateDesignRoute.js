const express = require("express");
const TemplateDesign = require("../models/templateDesign");
const templateDesignRouter = express.Router();
const isAuth = require('../middlewares/isAuth.js');


// GET Route
templateDesignRouter.get("/", isAuth ,async (req, res)=>{
    await res.render("pages/templateDesign.ejs")
});

// POST Route
templateDesignRouter.post("/", async (req, res) => {
  try {
    let { card1, card2, card3, card4 } = req.body;
    const payload = { card1, card2, card3, card4 };

    const existingData = await TemplateDesign.findOne({});

    if (existingData) {
      await TemplateDesign.findByIdAndUpdate(
        existingData._id,
        payload,
        { new: true }
      );

      req.flash("success", "Template Design updated successfully!");
    } else {
      await TemplateDesign.create(payload);
      req.flash("success", "Template Design inserted successfully!");
    }

    res.redirect("/templateDesign"); 
  } catch (error) {
    console.log("error", error);
    req.flash("error", "Template Design has an error!");
    res.redirect("/dashboard/template-design");
  }
});

module.exports = templateDesignRouter;