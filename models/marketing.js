const mongoose = require("mongoose");

const marketingSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    },
    description: {
    type: String,
    required: true,
    },
    buttonText: {
    type: String,
    },
    bigData:{
        subHeading1: {
            type: String,
            required: true,
        },
        subDescription1: {
            type: String,
            required: true,
        },
        subHeading2: {
            type: String,
            required: true,
        },
        subDescription2: {
            type: String,
            required: true,
        },
         subHeading3: {
            type: String,
            required: true,
        },
        subDescription3: {
            type: String,
            required: true,
        },
        subHeading4: {
            type: String,
            required: true,
        },
        subDescription4: {
            type: String,
            required: true,
        },
    },
});

module.exports = mongoose.model("Marketing", marketingSchema);
