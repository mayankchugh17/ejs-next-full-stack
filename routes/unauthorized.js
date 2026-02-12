const express = require("express");
const unauthorizedRouter = express.Router();

unauthorizedRouter.get("/", (req, res) => {
    console.log("unauthorized")
  res.render("pages/unauthorized.ejs");
});

module.exports = unauthorizedRouter;