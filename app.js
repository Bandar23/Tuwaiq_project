const express         = require('express');
const mongoose        = require('mongoose');
const path                = require('path');
const hbs             = require('hbs');
const app             = express();
const pagesRoutes     = require('./routes/pages');
const Cars            =  require('./models/cars');
const Company         =  require('./models/companys');
const AutomotiveParts =  require('./models/automotiveParts');
const session         =  require('express-session')
const MongogStore     =  require('connect-mongo')(session);
const passport        =  require('passport');
const flash           =  require('connect-flash');

mongoose.connect(
    "mongodb://localhost:27017/Tuwaiq_Project",
    { useNewUrlParser: true },
    (err) => {
      if (err) console.log(err);
      else console.log("DB Conected ..");
    }
  );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret:'Psychology@App',
  saveUninitialized:false,
  cookie:1000 * 60 * 60 * 24,
  resave:true,
  store:new MongogStore({
    mongooseConnection: mongoose.connection,
    ttl: 1 * 24 * 60 * 60, // = 14 days. ttl means "time to live" (expiration in seconds)}
}),
  cookie: {
    secure: false,  
    httpOnly: false, // if true, will disallow JavaScript from reading cookie data
    expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour;
  }
}));


require('./cconfig/passport')
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
    console.log(err.stack)
    res.status(500).send('Something broke!')

});



app.use('/pages',pagesRoutes);



 

app.use((req, res) => {
    res.render('error')
  });

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});