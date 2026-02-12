const mongoose = require("mongoose");

const testimonialsSchema = new mongoose.Schema({
    testimonialsHeading: String,
    testimonialsAuthor: String,
    testimonialsDesignation: String,
});

const Testimonials = mongoose.model("Testimonials", testimonialsSchema);

module.exports = Testimonials;