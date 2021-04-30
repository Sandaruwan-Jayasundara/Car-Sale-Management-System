var express = require('express');
var router = express.Router();
var connection = require('../../config/connection');
const bcrypt = require('bcrypt');
var Data = require('../Admin/Database/Admin');
const app = require('../../app');

//const vehicleRows = 'SELECT * FROM vehicle WHERE sold = "sold" AND date BETWEEN "2020/09/01" AND "2020/09/31" ';
const spareRows = 'SELECT * FROM spare_part_db WHERE availability="Sold"';
//const totExpenses = 'SELECT SUM( electricty + water + salary + other )net FROM expenses WHERE year = "2019" ';
const totIncome = 'SELECT SUM( sales + spareparts + ads) total FROM income WHERE year = "2019" ';
const totSales = 'SELECT sales FROM income WHERE id = 3 ';
const netProfit = 'SELECT (SELECT SUM( sales + spareparts + ads) FROM income) - (SELECT SUM( electricty + water + salary + other ) FROM expenses) as netprofit';


router.post('/' ,function(req,res){

    
var ussername=req.body.email
var passwords=req.body.password
var Position=req.body.post



if (ussername && passwords) {


    	connection.query('SELECT password FROM employee WHERE email = ? ', [ussername], function(error, results) {

            if (results.length > 0) {

                    var pwd= results[0].password
                      if(bcrypt.compareSync(passwords,pwd)){

                        connection.query(Data.getAdminDashboard,function(EmployeeERR,Employee){
                          connection.query(Data.getAdminDashboard,function(SellerERR,Seller){
                            connection.query(Data.getAdminDashboard,function(OwnerVehicleERR,OwnerVehicle){
                              connection.query(Data.vehiclecount,function(OwnerSparepartsERR,OwnerSparepart){
                      
                      
                        if (!EmployeeERR){
                          
                          if (!SellerERR){
                            
                            if (!OwnerVehicleERR){
                            
                              if (!OwnerSparepartsERR){
                                res.render('Admin',{
                      
                                  OwnerVehicle:OwnerVehicle[0].total,
                                  OwnerSpare:OwnerSparepart[0].total,
                                  Employees:Employee[0].total,
                                  Sellers:Seller[0].total,
                              
                                });
                              }
                              else{
                                err.render('Error',{ERR:err});
                              }
                            }
                          else{
                            err.render('Error',{ERR:err});
                             }
                         }
                        else{
                        err.render('Error',{ERR:err});
                       }
                       
                       }
                             });
                           });
                          });
                        });
  
                    }else{

                         console.log("Incorrect email or passowrd")
                         res.render('Login',{message:"Incorrect email or passowrd"});
                         }

      } 
      
      
      
      
      else {
        res.render('Login',{message:"Incorrect email or passowrd"});
			}						
           
		});

    } 

});




module.exports = router;