const express = require("express");
const hero2Router = express.Router();
const Hero2 = require("../models/hero2Routes.js");


hero2Router.get("/", (req, res)=>{
    res.render("pages/hero2.ejs")
});

hero2Router.post("/",(req, res)=>{
    let { heading, buttonText } = req.body;
})


module.exports = hero2Router; 
