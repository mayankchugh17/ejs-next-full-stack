const mongoose = require("mongoose");

const hero2Schema = new mongoose.Schema({
    heading:{
        type:String,
        required: true
    },
    buttonText:String
});

module.exports = mongoose.model("Hero2", hero2Schema);
