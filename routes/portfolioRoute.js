const express = require("express");
const Portfolio = require("../models/portfolio.js");
const isAuth = require("../middlewares/isAuth.js");

const portfolioRouter = express.Router();

// Admin page to edit portfolio
portfolioRouter.get("/", isAuth, async (req, res) => {
  try {
      const data = await Portfolio.findOne({});

      // console.log(`working data ${data}`);
     res.render("pages/portfolio.ejs", { data });
  } catch (err) {
    console.error("Error fetching portfolio data:", err);
    return res.status(500).send("Internal Server Error");
  }
});

// update portfolio data
portfolioRouter.post("/", isAuth, async (req, res) => {
  try {
    const { heading, subHeading, cardSrc, cardHeading, description } = req.body;
    const payload = {
      heading: heading,
      subHeading: subHeading,
      card: {
        src: cardSrc,
        cardHeading: cardHeading,
        description: description,
      },
    };

    // console.log(`request handle , ${payload.heading} and sub heading is ${payload.subHeading}`);

    let save = await Portfolio.findOneAndUpdate({}, payload, {
      new: true,
    });

    if (save) {
      req.flash("success", "Portfolio section updated successfully!");
      return res.redirect("/portfolio");
    } else {
      const data = new Portfolio(payload);
      await data.save();
      req.flash("success", "Portfolio section created successfully!");
      return res.redirect("/portfolio");
    }

  } catch (err) {
    // console.error("Error saving portfolio data:", err);
    req.flash("error", "Failed to update portfolio section");
    return res.redirect("/portfolio");
  }
});

// frontend API data
portfolioRouter.get("/data", async (req, res) => {
  try {
    const data = await Portfolio.findById("69941a8ddba247433901ae54");
    // console.log(data);
    return res.status(200).json(data);
  } catch (err) {
    // console.error(err);
    return res.status(500).json({ error: "Failed to fetch portfolio data" });
  }
});


module.exports = portfolioRouter;
