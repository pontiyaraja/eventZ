//var User = require("../models/userModel");

var loginController = function(User){
    var post = function(req, res){
        var login = new User(req.body);
        console.log(req.body);

        if(!req.body.userName){
            res.status(400);
            res.send('User name or password is missing');
        } else {
        	var query = {};

            if(req.query.username && req.query.password){
                query.username = req.query.username;
                query.password = req.query.password;
            }else{
            	User.find(query, function(err, users){
                    if(err){
                        res.status(500).send(err);
                    } else {
                        var returnUser = [];
                        users.forEach(function(element, index, array){
                            var newUser = element.toJSON();
                                 /*newUser.links = {};
        	                     newUser.links.self =  'http://' + req.headers.host + '/api/user/' + newUser._id;*/
        	                     returnUser = newUser;
                        });
                        res.json(returnUser);
                    }
                });
            }
        }
    };


    var get = function(req, res){
        var query = {};

        if(req.query.username && req.query.password){
            query.username = req.query.username;
            query.password = req.query.password;
        }else{
        	User.find(query, function(err, users){
                if(err){
                    res.status(500).send(err);
                } else {
                    var returnUsers = [];
                    users.forEach(function(element, index, array){
                        var newUser = element.toJSON();
                             newUser.links = {};
    	                     newUser.links.self =  'http://' + req.headers.host + '/api/user/' + newUser._id;
    	                     returnUsers.push(newUser);                                           
                    });
                    res.json(null);
                }
            });
        }
    };

    var regPost = function(req, res){
    console.log(req.body)
            var user = new User(req.body);
            console.log(user.userName);

            if(!req.body.userName){
                res.status(400);
                res.send('User name is missing');
            }else if(!req.body.email) {
                res.status(400);
                res.send('email is missing');
            }else if(!req.body.phone) {
                res.status(400);
                res.send('phone is missing');
            }else {
                user.save();
                const nodemailer = require('@nodemailer/pro');

                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'pandiyarajaramamoorthy@gmail.com',
                        pass: '***********'
                    }
                });

                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"Fred Foo 👻" <pandiyarajaramamoorthy@gmail.com>', // sender address
                    to: 'aeka*****@gmail.com',//, baz@blurdybloop.com', // list of receivers
                    subject: 'Hello ✔', // Subject line
                    text: 'Hello world ?', // plain text body
                    html: '<b>Hello world ?</b>' // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                });

                res.status(201);
                res.send(user);
            }
        };

    return {
        post: post,
        get: get,
        regPost: regPost
    };

};

module.exports = loginController;
