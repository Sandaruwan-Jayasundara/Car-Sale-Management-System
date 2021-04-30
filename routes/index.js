var express = require('express');
var router = express.Router();
var connection = require('../config/connection');
var Data = require('./Admin/Database/Admin');


router.get('/', function(req, res, next) {

    connection.query('SELECT * FROM comvehicles', function (err,rows){
      connection.query(Data.promotion1, function(err, promo1){
        connection.query(Data.promotion2, function(err, promo2){
          connection.query(Data.promotion3, function(err, promo3){

            
          console.log("img retrived");
          res.render('Home',{
          promotion3:promo3,
          promotion2:promo2,
          promotion1:promo1,
          vehicles:rows,
          title:"Home page"
   
          });
        });
        });

      });
    });

  });
 
    

    

module.exports = router;
