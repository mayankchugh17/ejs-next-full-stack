const express = require("express");
const testimonialsRoute = express.Router();
const Testimonials = require("../../models/testimonials");
const isAuth = require("../../middlewares/isAuth");

// get testimonials page

testimonialsRoute.get("/", isAuth,async (req, res) => {
  const data = await Testimonials.findOne({});
  // console.log("data:", data);
  res.render("pages/testimonials.ejs", { data });
});

// update testimonials data

testimonialsRoute.post("/", async (req, res) => {
  const { testimonialsHeading, testimonialsAuthor, testimonialsDesignation } =
    req.body;
  const existingTestimonials = await Testimonials.findByIdAndUpdate(
    "698a1b3cbe1f1d034c5ce18a",
    {
      testimonialsHeading,
      testimonialsAuthor,
      testimonialsDesignation,
    },
    { new: true },
  );

  if (!existingTestimonials) {
    await Testimonials.create({
      testimonialsHeading,
      testimonialsAuthor,
      testimonialsDesignation,
    });
  }

  req.flash("success", "Testimonials section updated successfully!");
  res.redirect("/testimonials");
});

// Frontend API to get testimonials data

testimonialsRoute.get("/data", async (req, res) => {
    try {
      const testimonialsData = await Testimonials.findOne({});
      console.log("Testemonials data is :", testimonialsData);
        return res.json(testimonialsData);
    } catch (error) {
        console.error("Error fetching testimonials data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

        

module.exports = testimonialsRoute;
