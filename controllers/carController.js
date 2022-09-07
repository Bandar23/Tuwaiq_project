const mongoose =  require('mongoose');
const Car      =  require('../models/cars');
const Company      =  require('../models/companys');



let createCar =  function(req,res,next){

    const newCar =  new Car({ 
        name:req.body.name,
        modelNumber:req.body.modelNumber,
        modelName:req.body.modelName,
        type:req.body.type,
        image:req.body.image,
        companay:req.body.companay,


    });

    newCar.save(function(err){
        if(err) console.log(err);

        res.send('Adedd a new car ');
    });
}

let getCars = function(req,res,next){
    Car.find({},(error,result)=>{
        if(error) console.log(error);
            res.render('newParts',{title:'New Parts',items:result,toLogin:false});     
        });
}

module.exports = {createCar,getCars};