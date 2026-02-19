const express = require("express");
const featureSliderRouter = express.Router();
const FeatureSlider = require("../models/featureSlider.js");
const isAuth = require("../middlewares/isAuth.js");

// GET route
featureSliderRouter.get("/", isAuth,async (req, res) => {
  const data = await FeatureSlider.findOne({});
  await res.render("pages/featureSlider.ejs", { data });
});

// POST Route
featureSliderRouter.post("/", async (req, res) => {
  try {
    let { card1, card2, card3 } = req.body;
    const data = await FeatureSlider.findOne({});

    // Update Data
    let updateData = await FeatureSlider.findByIdAndUpdate(
      data._id,
      { card1, card2, card3 },
      { new: true },
    );

    if (!updateData) {
      const newData = new FeatureSlider({
        card1,
        card2,
        card3,
      });

      // Insert data
      await newData.save();
      req.flash("success", "Feature Slider data inserted successfully!");
      return res.redirect("/featureSlider");
    } else {
      req.flash("success", "Feature Slider data updated successfully!");
      return res.redirect("/featureSlider");
    }
  } catch (error) {
    res.json({ message: "Error obtained" });
    console.log("Error is ", error);
  }
});

// Api to fetch data for frontend

featureSliderRouter.get("/data", async (req, res)=>{
    const data = await FeatureSlider.findOne({});
    return res.status(200).json(data);
})

module.exports = featureSliderRouter;
