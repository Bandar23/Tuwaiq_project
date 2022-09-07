const mongoose             =  require('mongoose');
const AutomotiveParts      =  require('../models/automotiveParts');
const Cars                  =  require('../models/cars');



let createnewAutomotiveParts =  function(req,res,next){
   console.log(req.body)
    const newAutomotiveParts =  new AutomotiveParts({ 
        name:req.body.name,
        type:req.body.type,
        price:req.body.price,
        createAt:req.body.createAt,
        image:req.file.filename,
        car:req.body.car
    });

    newAutomotiveParts.save(function(err){
        if(err) console.log(err);

        console.log ('Adedd a new Automotive Parts ');
    });
}

let getauotParts = function(req,res,next){
    AutomotiveParts.find({car:req.params.id},(error,result)=>{
        if(error) console.log(error);
        Cars.findById({_id:req.params.id},(error,doc)=>{
            if(error) console.log(error);
             console.log('doc',doc);

            res.render('aotupart',{title:'Auoto Part Informaions',items:result,doc:doc,toLogin:false}); 

    
        });
    });
}

let getauotPartsAll = function(req,res,next){
    AutomotiveParts.find({},(error,result)=>{
        if(error) console.log(error);
            res.render('newParts',{title:'New Parts',items:result,doc:doc,toLogin:false});     
        });
}

module.exports = {createnewAutomotiveParts,getauotParts};