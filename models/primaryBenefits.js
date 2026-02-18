const mongoose = require("mongoose");

const primaryBenefitsSchema = new mongoose.Schema({

    heading:String,

    card1:{
        heading:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
    }, 
    
    card2:{
        heading:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
    },
    
    card3:{
        heading:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
    },
});

// build a model
mongoose.model("PrimaryBenefits", primaryBenefitsSchema);