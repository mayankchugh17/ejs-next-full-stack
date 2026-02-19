const mongoose = require("mongoose");

// Schema design
const contactUsSchema = new mongoose.Schema({
    cards:[{
        title:{
            type:String,
            required: true
        },
        email: String,
        phone: String,
        address: String
    }],
    heading:{
        type:String,
        required:true
    },
    buttonText:String,
    description:String
});

// Building Model
const ContactUs = mongoose.model("contactusdetail", contactUsSchema);

module.exports = ContactUs;
