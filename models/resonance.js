const mongoose = require("mongoose");

// Resonance Schema
const resonanceSchema = new mongoose.Schema({
    heading:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    authorName: String,
    degination: String
});

// Build a Model
const Resonance = mongoose.model("Resonance", resonanceSchema)
module.exports = Resonance;