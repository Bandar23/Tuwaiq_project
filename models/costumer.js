const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = require('bcrypt');
const costumer = new Schema({
    name:{
        type:String,

    },
    userName:{
        type:String,

    },
    emali:{
        type:String,

    },
    password:{
        type:String,

    },
    phonNumber:{
        type:String,
    }
});

costumer.methods.hashPasswprd = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
}

costumer.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password);
}
const Costumer = mongoose.model('Costumer',costumer);
module.exports = Costumer;


 // this schema Contains all info abput the costumer, with this schema we can make a simple login system for the costumer 
// and we can make them select any automotive and praper they orders, using thire id at Order Schema. 
