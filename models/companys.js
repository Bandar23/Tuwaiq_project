const mongoose =  require('mongoose');
const Schema   = mongoose.Schema;
const company = new Schema({
    Name:{
        type:String,
    },
    CreatAt:{
        type:Date,

    },
    Brife:{
        type:String,
    },
    image:{
        type:String,
    },
},{ timestamps: true }
);

const Company = mongoose.model('Company',company);
module.exports = Company;