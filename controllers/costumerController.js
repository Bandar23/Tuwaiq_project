const mongoose =  require('mongoose');
const costumer = require("../models/costumer");


let createCostumer = function(req,res,next){

    const newCostumer = new costumer({
        name:req.body.name,
         userName:req.body.userName,
        emali:req.body.email,
        password:new costumer().hashPasswprd(req.body.password),
        phonNumber:req.body.phonNumber
    });

     newCostumer.save(function(err){
        if (err) console.log(err);
       res.redirect('/pages/singin');
     });
}

module.exports = {createCostumer};