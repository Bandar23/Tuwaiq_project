const mongoose =  require('mongoose');
const Car      = require('./cars');
const Schema   = mongoose.Schema;
const autoMotiveParts  = new Schema({
    name:{
        type:String,
    },
    type:{
        type:String,
    },
    price:{
        type:Number,
    },
    createAt:{
        type:Date
    },
    image:{
        type:String,

    },
    car:{
        type:Schema.Types.ObjectId,ref:'Car',
   }
});

 // images: save path as string and images in images folder and can display them on front end
// I want to see the front end of application also.

const AutomotiveParts = mongoose.model('AoutoMotive',autoMotiveParts);
module.exports = AutomotiveParts; 

// this schema Contains the information about the automotive Parts,like id,name,price ..., and the id of the car schema 