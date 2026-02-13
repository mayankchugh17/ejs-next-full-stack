const express = require("express");
const Marketing = require("../models/marketing.js");

const marketingRouter = express.Router();

// Marketing route
marketingRouter.get("/", (req, res) => {
  const id = "698ad138873ac8849c6f37c3";
  const data = Marketing.findById(id);
  
  console.log("Marketing data:", data);
  res.render("pages/marketing.ejs", { data });

});

// Marketing form submission
marketingRouter.post("/", async (req, res) => {
  try {
    const { heading, description, buttonText, bigData } = req.body;

    const id = "698ad138873ac8849c6f37c3";
    let marketingData = await Marketing.findByIdAndUpdate(
      id,
      {
        heading, description, buttonText, bigData
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


module.exports = marketingRouter;