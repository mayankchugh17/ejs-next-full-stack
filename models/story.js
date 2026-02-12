const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    storyHeading: { type: String, required: true},
    storyTitle1: { type: String, required: true},
    storyDescription1: { type: String, required: true},
    storyTitle2: { type: String, required: true},
    storyDescription2: { type: String, required: true},
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;