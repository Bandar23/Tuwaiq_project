const mongoose =  require('mongoose');
const Company      =  require('../models/companys');

const Schema   = mongoose.Schema;
const car  = new Schema({
    name:{
        type:String,
    },
    modelNumber:{
        type:String,
    },
    modelName:{
        type:String,
    },
    type:{
        type:String,
    },
    image:{
        type:String,
    },
    companay:{
        type:Schema.Types.ObjectId,ref:'Company',
    }
});

const Car = mongoose.model('Car',car);
module.exports = Car;


// this scheam Contains all the information about the car, inside this schema we use the id of company, so when we have to get the car
// we can get the company of this car . 