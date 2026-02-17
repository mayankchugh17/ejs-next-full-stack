const mongoose = require("mongoose");

const hero2Schema = new mongoose.Schema({
    heading:{
        type:String,
        required: true
    },
    buttonText:String
});

// building model
const Hero2 = mongoose.model("hero2", hero2Schema);

module.exports = Hero2;