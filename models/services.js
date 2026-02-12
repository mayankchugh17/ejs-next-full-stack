const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    list: {
        type: [String],
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    subDescription: {
        type: String,
        required: true
    }, 
});

const serviceModel = mongoose.model('Service', serviceSchema);  
module.exports = serviceModel;