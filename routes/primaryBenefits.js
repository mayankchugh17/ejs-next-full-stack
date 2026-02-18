const express = require("express");
const primaryBenefitsRouter = express.Router();

const PrimaryBenefits = require("../models/primaryBenefits.js");
const isAuth = require("../middlewares/isAuth.js");

// GET request
primaryBenefitsRouter.get("/", isAuth, async (req, res) => {
  const id = "699579414d58c3b109be2afe";
  const data = await PrimaryBenefits.findById(id);
  res.render("pages/primaryBenefits.ejs", { data });
});

// POST request
primaryBenefitsRouter.post("/", async (req, res) => {
  try {
    const { heading, card1, card2, card3 } = req.body;
    const id = "699579414d58c3b109be2afe";
    const payload = { heading, card1, card2, card3 };

    const updateData = await PrimaryBenefits.findByIdAndUpdate(
      id,
      payload,
      {new: true}
    );

    if (!updateData) {
      const newPrimaryBenefit = new PrimaryBenefits(payload);

      await newPrimaryBenefit.save();

      res.status(201).json({
        success: true,
        message: "Primary Benefits created successfully",
        data: newPrimaryBenefit,
      });
    }
    else{
      req.flash("success", "Primary Benefits section updated successfully!");
    }

    res.redirect("/primaryBenefits");
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: error.message,
    });
  }
});

// APIs to fetch data for frontend

primaryBenefitsRouter.get("/data", async (req, res) => {
  try{
    const data = await PrimaryBenefits.findById("699579414d58c3b109be2afe");
    return res.status(200).json(data);
  }
  catch(err){
    return res.status(500).json({ error: "Failed to fetch portfolio data" });
  }
});

module.exports = primaryBenefitsRouter;
