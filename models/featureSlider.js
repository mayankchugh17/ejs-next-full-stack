const mongoose = require("mongoose");

// Build Schema
const featureSliderSchema = new mongoose.Schema({
  card1: {
    title: {
      type: String,
      required: true,
    },
    description: String,
  },
  card2: {
    title: {
      type: String,
      required: true,
    },
    description: String,
  },
  card3: {
    title: {
      type: String,
      required: true,
    },
    description: String,
  },
});

// Build model
const FeatureSlider = mongoose.model("FeatureSlider", featureSliderSchema);

module.exports = FeatureSlider;
