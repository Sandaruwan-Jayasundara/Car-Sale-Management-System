var createError = require('http-errors');
var express = require('express');
var path = require('path');
fileUpload = require('express-fileupload');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swal=require('sweetalert');


 hbs=require('express-handlebars');
 


 var Home = require('./routes/index');
var indexRouter = require('./routes/Admin/Admin');
var Chart = require('./routes/Admin/Chart');
var Index_Spare_parts= require('./routes/Index_Spare_parts');


var Auth = require('./routes/Login/employee_login');



//Monthly Report
var Report = require('./routes/Admin/Report/Report');
var ShashikaVReport = require('./routes/Admin/Report/ShashikaVReport');
var ShashikaSReport = require('./routes/Admin/Report/ShashikaSReport');
var SellersVReport = require('./routes/Admin/Report/SellersVReport');


var SellersSReport = require('./routes/Admin/Report/SellersSReport');
var sellerReport = require('./routes/Admin/Report/sellerReport');
var EmpReport = require('./routes/Admin/Report/EmpReport');


//Users
var usersRouter = require('./routes/Admin/User/users');
var deleteuser = require('./routes/Admin/User/DeleteUser');
var EmployeeRouter = require('./routes/Admin/User/Employee');
var Employee_EditRouter = require('./routes/Admin/User/EditEmployee');
var Employee_updateUserRouter = require('./routes/Admin/User/AdminUpdateEmployee');
var addUser = require('./routes/Admin/User/AddUsers');


/**
 * Vehicle router path
 * **/
var Vehicle = require('./routes/Admin/Vehicle/Vehicle');
var VLDelete = require('./routes/Admin/Vehicle/DeleteVL');
var VLedit = require('./routes/Admin/Vehicle/EditVL');
var updateVL = require('./routes/Admin/Vehicle/updateVL');
var AddVihicle_nav = require('./routes/Admin/Vehicle/AddVihicle_nav');
var Sashikaaddvehicle = require('./routes/Admin/Vehicle/Sashika_Add_Vehicle');



//Spare parts
var Sparts = require('./routes/Admin/Spare Parts/Sparts');
var DeleteSP = require('./routes/Admin/Spare Parts/DeleteSP');
var SPedit = require('./routes/Admin/Spare Parts/EditSP');
var updateSP = require('./routes/Admin/Spare Parts/UpdateSP');
var spareP_navigation = require('./routes/Admin/Spare Parts/spareP_navigation');
var addSpareparts = require('./routes/Admin/Spare Parts/AddSpareParts');


//TEST
var ADDSP=require('./routes/Admin/SPADD');
var VADD=require('./routes/Admin/VADD');

var vv=require('./routes/Admin/veadd');
var ss=require('./routes/Admin/spaadd');


//Promotion
var promotion=require('./routes/Admin/promotion/promotionpage-navigation')
var promotion1=require('./routes/Admin/promotion/promotion1')
var promotion2=require('./routes/Admin/promotion/promotion2')
var promotion3=require('./routes/Admin/promotion/promotion3')



var Delete_promotion1=require('./routes/Admin/promotion/Delete_promotion1')
var Delete_promotion2=require('./routes/Admin/promotion/Delete_promotion2')
var Delete_promotion3=require('./routes/Admin/promotion/Delete_promotion3')



//Contactus
var Contactus=require('./routes/Admin/ContactUs/Contactus')
var ContactSubmit=require('./routes/Admin/ContactUs/ContactSubmit')
var deleteContactus=require('./routes/Admin/ContactUs/deleteContactus')

var AdminShow=require('./routes/Admin/ContactUs/AdminShow')

//
var Login=require('./routes/Login/Employee_Login_navigation')






const { extname } = require('path');
var app = express();

// view engine setup

var session = require('express-session'); 
var flash = require('connect-flash');


app.engine('hbs', hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));
app.use(flash());


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.use('/', Home);

app.use('/Admin', indexRouter);


app.use('/SpareHome', Index_Spare_parts);


app.use('/Auth', Auth);
app.use('/Login', Login);
/**
 * User
 */
app.use('/Employee', EmployeeRouter);
app.use('/updateUser', Employee_updateUserRouter);
app.use('/edit', Employee_EditRouter);
app.use('/addUser', addUser);
app.use('/deleteuser', deleteuser);


app.use('/Chart', Chart);
app.use('/users', usersRouter);


/**
 * Vehicle
 */
app.use('/VLedit', VLedit);
app.use('/VLDelete', VLDelete);
app.use('/Vehicle', Vehicle);
app.use('/updateVL', updateVL);
app.use('/AddVihicle_nav', AddVihicle_nav);
app.use('/addvehicle', Sashikaaddvehicle);

/**
 * Spare parts
 */

app.use('/Sparts', Sparts);
app.use('/SPDelete', DeleteSP);
app.use('/SPedit', SPedit);
app.use('/updateSP', updateSP);
app.use('/spareP_navigation', spareP_navigation);
app.use('/addSpareparts', addSpareparts);

//TEST

app.use('/ADDSP',ADDSP);
app.use('/VADD',VADD);
app.use('/spadd',ss);
app.use('/veadd',vv);

//Report

app.use('/Report',Report);
app.use('/ShashikaVReport',ShashikaVReport);
app.use('/ShashikaSReport',ShashikaSReport);
app.use('/SellersVReport',SellersVReport);

app.use('/SellersSReport',SellersSReport);
app.use('/sellerReport',sellerReport);
app.use('/EmpReport',EmpReport);



//Promotion

app.use('/Promotion',promotion);
app.use('/promotion1',promotion1)
app.use('/promotion2',promotion2)
app.use('/promotion3',promotion3)


app.use('/Delete_promotion1',Delete_promotion1)
app.use('/Delete_promotion2',Delete_promotion2)
app.use('/Delete_promotion3',Delete_promotion3)


//contacUS
app.use('/Contactus',Contactus)
app.use('/ContactSubmit',ContactSubmit)
app.use('/deleteContactus',deleteContactus)
app.use('/AdminShow',AdminShow)





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
