const mongoose = require("mongoose");
const Company  = require('../models/companys');
const Cars     =  require('../models/cars');


let createCompany = function(req,res,next){
  
    const newCompany = new Company({
        Name:req.body.Name,
        CreatAt:req.body.Date,
        Brife:req.body.Brife,
        image:req.body.image
    });

    newCompany.save(function(err){
       if(err) console.log(err);

       res.send('Added The Compny ! ');
    });
}

let getCompnays = function(req,res,next){
    Company.find({},(error,doc)=>{
        if(error) console.log(error);
        res.render('companys',{title:'Companys',items:doc});
    })
}

let getCompnay = function(req,res,next){
    Company.find({_id:req.params.id},(error,result)=>{
        if(error) console.log(error);
        Cars.find({companay:req.params.id},(error,doc)=>{
             console.log(doc);

            res.render('company-details',{title:'Company Informaions',items:result,doc:doc,toLogin:false}); 
            

    
        });
    });
}

module.exports = {
    createCompany,
    getCompnays,
    getCompnay
}