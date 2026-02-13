const express = require("express");
const Marketing = require("../models/marketing.js");
const isAuth = require("../middlewares/isAuth.js");

const marketingRouter = express.Router();

// Marketing route
marketingRouter.get("/", isAuth, async (req, res) => {
  try {
    const id = "698ed526bffcd0d52e9f7152";
    const data = await Marketing.findById(id);
    
    console.log("Marketing data:", data);
    res.render("pages/marketing.ejs", { data });
    
  } catch (error) {
    console.error("Error fetching marketing data:", error);
    res.status(500).send("Internal Server Error");
  }

});

// Marketing form submission
marketingRouter.post("/", isAuth, async (req, res) => {
  try {
    const { heading, description, buttonText, bigData } = req.body;

    // normalize/merge bigData so route accepts both nested and top-level fields
    const finalBigData = {
      subHeading1: (bigData && bigData.subHeading1) || req.body.subHeading1 || (bigData && bigData['subHeading1']) || '',
      subDescription1: (bigData && bigData.subDescription1) || req.body.subDescription1 || '',
      subHeading2: (bigData && bigData.subHeading2) || req.body.subHeading2 || '',
      subDescription2: (bigData && bigData.subDescription2) || req.body.subDescription2 || '',
      subHeading3: (bigData && bigData.subHeading3) || req.body.subHeading3 || '',
      subDescription3: (bigData && bigData.subDescription3) || req.body.subDescription3 || '',
      subHeading4: (bigData && bigData.subHeading4) || req.body.subHeading4 || '',
      subDescription4: (bigData && bigData.subDescription4) || req.body.subDescription4 || ''
    };

    const id = "698ed526bffcd0d52e9f7152";
    let marketingData = await Marketing.findByIdAndUpdate(
      id,
      {
        heading, description, buttonText, bigData: finalBigData
      },
      { new: true }
    );
    if (marketingData) {
      req.flash("success", "Marketing section updated successfully!");
      console.log("Marketing section updated successfully");
    } else {

      // Create new document
      marketingData = new Marketing({
        heading, description, buttonText, bigData
      });
      await marketingData.save();
      req.flash("success", "Marketing section created successfully!");
      console.log("Marketing section created successfully");
    }

    return res.redirect("/marketing");
  } catch (err) {
    console.error(err);
  }
});

// API to get marketing data
marketingRouter.get("/data", async (req, res) => {
  try {
    const marketingData = await Marketing.findById("698ed526bffcd0d52e9f7152");
    return res.status(200).json(marketingData);
  }
    catch (err) {
    console.error("Error fetching marketing data:", err);
    res.status(500).json({ error: "Failed to fetch marketing data" });
  }
});


module.exports = marketingRouter;