const express = require("express");
const Hero = require("../models/hero.js");
const Story = require("../models/story.js");
const isAuth = require("../middlewares/isAuth.js");

const dashboardRouter = express.Router();

// Dashboard route
dashboardRouter.get("/", (req, res) => {
  const now = new Date();
  // console.log(now);

  res.render("pages/index.ejs", {
    date: now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: now.toLocaleTimeString("en-US"),
  });
});

// Hero route
dashboardRouter.get("/hero", isAuth, async (req, res) => {
  const id = "6985aba01afc51d4e25eb934";
  const data = await Hero.findById(id);
  //   console.log("Hero data:", data);
  res.render("pages/hero.ejs",{ data });
});

// Handle hero form submission
dashboardRouter.post("/hero", async (req, res) => {
  try {
    const { heroTitle, heroHeading, heroHeading2, button1, button2 } = req.body;

    const updatedHero = await Hero.findByIdAndUpdate(
      "6985aba01afc51d4e25eb934",
      {
        heroTitle,
        heroHeading,
        heroHeading2,
        button1,
        button2,
      },
      { new: true },
    );

    if (updatedHero) {
      console.log("Hero section updated successfully");
      req.flash("success", "Hero section updated successfully!");
    } else {
      const newHero = new Hero({
        heroTitle,
        heroHeading,
        heroHeading2,
        button1,
        button2,
      });
      await newHero.save();
      console.log("New hero section created successfully");
      req.flash("success", "Hero section created successfully!");
    }

    return res.redirect("/dashboard/hero");
  } catch (err) {
    console.error("Error saving hero section:", err);
    req.flash("error", "Failed to update hero section");
    return res.redirect("/dashboard/hero");
  }
});

// API to get hero data
dashboardRouter.get("/hero/data", async (req, res) => {
  try {
    const heroData = await Hero.findOne({});
    console.log("Hero data:", heroData);
    return res.status(200).json(heroData);
  } catch (error) {
    console.error("Error fetching hero data:", error);
    res.status(500).json({ error: "Failed to fetch hero data" });
  }
});

// Story route

dashboardRouter.get("/story", isAuth, async (req, res) => {
  const storyData = await Story.findById("6985a5923f432c9afebacdb3");
  res.render("pages/story.ejs", { storyData });
});

// Handle story form submission
dashboardRouter.post("/story", async (req, res) => {
  try {
    const {
      storyHeading,
      storyTitle1,
      storyDescription1,
      storyTitle2,
      storyDescription2,
    } = req.body;

    const updatedStory = await Story.findByIdAndUpdate(
      "6985a5923f432c9afebacdb3",
      {
        storyHeading,
        storyTitle1,
        storyDescription1,
        storyTitle2,
        storyDescription2,
      },
      { new: true },
    );

    if (updatedStory) {
      console.log("Story section updated successfully");
      req.flash("success", "Story section updated successfully!");
    } else {
      const newStory = new Story({
        storyHeading,
        storyTitle1,
        storyDescription1,
        storyTitle2,
        storyDescription2,
      });
      await newStory.save();
      console.log("New story section created successfully");
      req.flash("success", "Story section created successfully!");
    }

    return res.redirect("/dashboard/story");
  } catch (err) {
    console.error("Error saving story section:", err);
    req.flash("error", "Failed to update story section");
    return res.redirect("/dashboard/story");
  }
});

// API to get story data
dashboardRouter.get("/story/data", async (req, res) => {
  try {
    const storyData = await Story.findOne({});
    console.log(storyData);
    return res.status(200).json(storyData);
  } catch (err) {
    console.error("Error fetching story data:", err);
    res.status(500).json({ error: "Failed to fetch story data" });
  }
});

module.exports = dashboardRouter;
