const mongoose = require("mongoose");

// Build Schema
const templateDesignSchema = new mongoose.Schema({
    heading:String, 
    card1:{
        title:String,
        description:String
    },
    card2:{
        title:String,
        description:String
    },
    card3:{
        title:String,
        description:String
    },
    card4:{
        title:String,
        description:String
    }
});

// Build Model
const TemplateDesign = mongoose.model("templateDesign", templateDesignSchema);

module.exports = TemplateDesign;

