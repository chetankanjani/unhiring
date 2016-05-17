var mongoose = require('mongoose');
var User = require('../model/users');
var Admin = require('../model/admin');
var Colleges = require('../model/Colleges');

var config = require('../config');

var jsonwebtoken = require('jsonwebtoken');


function createToken(user) {

    var token = jsonwebtoken.sign({

        _id: user._id,
        name: user.name,
        email: user.email

    }, config.superSecret, {
        expiresIn: 1440

    });


    return token;


}



module.exports = function (app, express, passport) {

    var api = express.Router();


    api.post('/signup', function (req, res) {

        var user = new User();

        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;


        user.save(function (err) {
            if (err) {
                if (err.code == 1100)
                    return res.json({message: "User with this email already exist ", success: false});
                else {
                    console.log(err);
                    return res.json({message: "User not created", success: false});

                }
            }
            else
                return res.json({message: "User created Successfully!", success: true});


        });

    });


    api.post('/login', function (req, res) {


        User.findOne({

            'email': req.body.email
        }).select('password').exec(function (err, user) {

            console.log(user);
            if (err)
                throw err;
            if (!user) {
                res.json({message: "User doesn't exist", success: false});


            } else if (user) {
                var validPassword = user.comparePassword(req.body.password);

                if (!validPassword) {
                    res.json({message: "Invalid Password", success: false})
                }
                else {
                    var token = createToken(user);

                    res.json({
                        success: true,
                        message: "Successfully login",
                        token: token,
                        userid: user._id


                    });

                }

            }
        });
    });



    api.post('/addAdmin',function(req,res){

       var admin=new Admin();

        admin.password=req.body.password;

        admin.save(function(err){
           if(err)
            res.json(err);
            else
                res.json({success:true});

        });
    });


    api.post('/adminLogin',function(req,res){


        var password=req.body.password;
        Admin.findOne({}).select('password').exec(function(err,admin){


            //console.log(admin.comparePassword(password));

            if(admin.comparePassword(password))
                res.json({success:true});
            else
               res.json({success:false});

        });




    });

    api.get('/getAllUsers',function(req,res){

       User.find({},function(err,users){

           res.json(users);

       }) ;

    });

    api.get('/getAllColleges',function(req,res){

        Colleges.find({},function(err,users){

            res.json(users);

        }) ;

    });


    api.post('/addColleges',function(req,res){


        var college=new Colleges();

        college.name=req.body.name;

        var data=req.body.degree;

        //if(data)
        //for(var i=0;i<data.length;i++)
        //    college.degree.push(data[i]);
        //
        //
        college.save(function(err){
           if(err)
                res.json(err);
            else
                res.json({success:true});

        });


    });


    api.post('/addDegree',function(req,res){

        var degree=req.body.degree;
        var name=req.body.name;

        Colleges.findOneAndUpdate({name:name},{$push: {"degree": degree}},
            {upsert: true},function(err,college){

               if(err)
                res.json(err);
                else
                    res.json({success:true});

            });

    });

    api.post('/getUser',function(req,res){

       User.findOne({_id:req.body.userid},function(err,user){

           res.json(user);

       }) ;


    });

    api.get('/searchCollege',function(req,res){

       var search=req.param('college');

        //console.log(search);
        if(search)
        Colleges.find({name: {$regex:search,$options:'i'}},function(err,college ){

            if(err)
                res.json(err);
            else{
                var array=[];
                var i=0;
                while(i!=college.length) {
                    array.push(college[i].name);
                    i++;
                }

                if(array.length==college.length)
                    res.json(array);

            }

        });


    });



    api.get('/degreesearch',function(req,res){

        var college=req.param('college');
        var degree=req.param('degree');


        Colleges.findOne({name:college},function(err,college ){

            if(err)
                res.json(err);
            else{

                //console.log(college);
                var array=[];
                var i=0;
                while(i!=college.degree.length) {
                    array.push(college.degree[i]);
                    i++;
                }

                if(array.length==college.degree.length)
                    res.json(array);
            }

        });


    });


    api.post('/addUserCollege',function(req,res){

        //console.log(req.body.userid);

        User.findOneAndUpdate({_id:req.body.userid},{$set:{College:req.body.name,degree:req.body.degree}},function(err,user){


           if(err)
            res.json(err);
            else
                res.json({success:true});


        });


    });


    api.post('/getStatus',function(req,res){


       User.findOne({_id:req.body.userid},function(err,user){

          if(user){
                console.log(user.College);
              if(user.College)
                res.json({success:true});
              else
                res.json({success:false});


          }


       });

    });






    return api;

}





