var express = require('express');
var router = express.Router();
const app = require('../../../app');
var connection = require('../../../config/connection');
var Data = require('../Database/Admin');

router.get('/:item_code', function(req, res) {

    var spd=req.params.item_code;
    console.log('Parameter is',spd);
    connection.query(Data.Deletespareparts,[spd],function(err,rows){

        if(err){
    console.log('Error');

        }
else{
      res.redirect('/Sparts');
      console.log('Success');
    }
    });

});
 





  module.exports = router;