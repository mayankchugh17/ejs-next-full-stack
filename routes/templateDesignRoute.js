const express = require("express");
const TemplateDesign = require("../models/templateDesign");
const templateDesignRouter = express.Router();
const isAuth = require('../middlewares/isAuth.js');


// GET Route
templateDesignRouter.get("/" ,async (req, res)=>{
    await res.render("pages/templateDesign.ejs")
});

// POST Route
templateDesignRouter.post("/", async (req, res) => {
  try {
    let { heading, card1, card2, card3, card4 } = req.body;
    const payload = { heading, card1, card2, card3, card4 };

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

// API fetching data to frontend
templateDesignRouter.get("/data", async(req, res)=>{
    const data = await TemplateDesign.findOne({});
    return res.status(200).json(data);
})

module.exports = templateDesignRouter;