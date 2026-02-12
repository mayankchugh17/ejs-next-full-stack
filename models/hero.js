const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
    heroTitle: { type: String, required: true},
    heroHeading: { type: String, required: true},
    heroHeading2: { type: String, required: true},
    button1: { type: String, required: true},
    button2: { type: String, required: true},
});

const Hero = mongoose.model("Heros", heroSchema);

module.exports = Hero;