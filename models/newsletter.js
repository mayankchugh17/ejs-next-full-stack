const mongoose = require("mongoose");

// Build schema
const newsPaperSchema = new mongoose.Schema({
    heading:{type:String, required:true},
    buttonText:{type:String, default:"Subscribe Now"},
    description:String
});

// Make model
const Newspaper = mongoose.model("newspaper", newsPaperSchema);

module.exports = Newspaper;