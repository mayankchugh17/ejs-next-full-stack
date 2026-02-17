const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  subHeading: {
    type: String,
    required: true,
  },
  card: {
    src: {
      type: String,
      default: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    cardHeading: {
      type: String,
    },
    description: {
      type: String,
    }
  }
}, {timestamps:true});

// Build model
const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
