const express = require("express");
const unauthorizedRouter = express.Router();

unauthorizedRouter.get("/", (req, res) => {
  res.render("pages/unauthorized.ejs");
});

module.exports = unauthorizedRouter;