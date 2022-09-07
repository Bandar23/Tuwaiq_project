const express                    = require('express');
const router                     =  express.Router();
const {createCompany,getCompnays,getCompnay}  = require('../controllers/companyController');
const {createCostumer}           = require('../controllers/costumerController');
const {createCar,getCars}                = require('../controllers/carController');
const {createnewAutomotiveParts,getauotParts} = require('../controllers/automotibeContrller');
const multer                     = require('multer');
const passport                   = require('passport')
let storage    = multer.diskStorage({

    destination:function(req,res,cb){
      cb(null,'./public/images');
    },
    filename:function(req,file,cb){
       cb(null,Date.now()+file.originalname);
    }
});

let fileFilter = function(req,file,cb){
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")
    {
      cb(null, true);
    }
    else
    {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'+file));
    }
  };
  
  let upload = multer({
    storage:storage,
    fileFilter:fileFilter
  });



router.get('/index',(req,res,next)=>{
    res.render('index', {
        post: {
            author: 'Janith Kasun',
            comments: []
        },
        title:'Demo'
     })
})


router.get('/about',(req,res,next)=>{
    res.send('About Us Page ! ! !');
})

router.get('/parts',getCars);

router.get('/singin',(req,res,next)=>{
  let messageError =  req.flash('error-login')
    res.render('login',{title:'Login',error:messageError});
  })
  router.get('/signup',(req,res,next)=>{
    let messageError =  req.flash('error-signup')
    res.render('signup',{title:'Reg',error:messageError});
  })

  router.get('/main',(req,res,next)=>{
    res.render('main',{title:'Profile'});
  })

  router.get('/companys',getCompnays);
  router.get('/company-details/:id',getCompnay)
  router.get('/aotupart/:id',getauotParts);

router.post('/newCompany',createCompany);
router.post('/newUser',createCostumer);
router.post('/newCar',createCar);
router.post('/newAutomotiveParts',upload.single('image'),createnewAutomotiveParts,
(error,req,res,next)=>{
    if(error){
      console.log(error.message);
      return;
    }
});
router.post('/login',((req,res,next)=>{

  next();
},passport.authenticate('local-login',{
  successRedirect:'main',
  failureRedirect:'singin',
  failureFlash: true
})));

router.get('/logout',isSingin,((req,res,next)=>{
  req.logout(function(err) {
    if (err) return next(err);
  res.redirect('singin')
});
}));



function isSingin(req,res,next){
  if(!req.isAuthenticated()){
  
    res.redirect('singin');
    return;
   }
  next();
  }
  

module.exports = router;