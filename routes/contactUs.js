const express = require("express");
const ContactUs = require("../models/contactUs");
const contactUsRouter = express.Router();

// GET Request 
contactUsRouter.get("/", async (req, res)=>{
    await res.render("pages/contactus.ejs")
});

// POST Request
contactUsRouter.post("/", async (req, res)=>{
    try {
        const {heading, cards, buttonText, description} = req.body;
        const payload = {heading, cards, buttonText, description};
        const data = await ContactUs.findOne({});
        if(!data)
        {
            const newData = new ContactUs(payload);
            await newData.save()
            req.flash("Success","Contact Us details inserted Successfully!");
            return res.redirect("/contactus");
        }else{
            await ContactUs.findByIdAndUpdate(data._id, payload, {new:true});
            req.flash("Success","Contact Us details updated Successfully!");
            return res.redirect("/contactus");
        }
    } catch (error) {
        console.log("Error is ", error)
    }
});

module.exports = contactUsRouter;