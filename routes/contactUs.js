const express = require("express");
const ContactUs = require("../models/contactUs");
const isAuth = require("../middlewares/isAuth");
const contactUsRouter = express.Router();

// GET Request 
contactUsRouter.get("/", isAuth,async (req, res)=>{
    await res.render("pages/contactus.ejs")
});

// POST Request
contactUsRouter.post("/", async (req, res)=>{
    try {
        const {heading, cards, buttonText, description} = req.body;
        const payload = {heading, cards, buttonText, description};
        // console.log("Data is card: ",payload);
        const data = await ContactUs.findOne({});
        if(!data)
        {
            const newData = new ContactUs(payload);
            await newData.save();
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

// Api to get frontend DATA
contactUsRouter.get("/data", async (req, res)=>{
    const data = await ContactUs.findOne({});
    console.log(`fetched data is `, data);
    return res.status(200).json(data);
})

module.exports = contactUsRouter;