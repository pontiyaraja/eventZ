/**
 * New node file
 */
var express = require('express');

var loginRoutes = function(User){

    var loginRouter = express.Router();

    var loginController = require('../Controllers/loginController')(User);

    loginRouter.route('/')
        .post(loginController.post)
        .get(loginController.get);

    loginRouter.route('/register')
            .post(loginController.regPost);

    loginRouter.use('/:loginId', function(req, res, next){
        if(req.query.username){
            query.username = req.query.username;
        }

        Login.findById(req.params.userId, function(err, login){
            if(err){
                res.status(500).send(err);
            } else if (login) {
                req.login = login;
                next();
            } else {
                res.status(404).send('no book found');
            }
        });
    });


    loginRouter.route('/:loginId')
        .get(function(req, res){
            var returnLogin = req.login.toJSON();
            returnLogin.links = {};
            var newLink = 'http://' + req.headers.host + '/api/users/?username=' + returnLogin.username;
            returnLogin.links.filterByThisGenre = newLink.replace(' ', '%20');
            res.json(returnLogin);
        }
    )
    .put(function(req, res){

        login.username = req.body.username;
        login.password = req.body.password;

        login.save(function(err){
            if(err){
                res.status(500).send(err);
            } else {
                res.json(req.login);
            }
        });
    })
    .patch(function(req, res){
        if(req.body._id){
            delete req.body._id;
        }

        for(var p in req.body){
            req.login[p] = req.body[p];
        }

        req.login.save(function(err){
            if(err){
                res.status(500).send(err);
            } else {
                res.json(req.login);
            }

        });

    })
    .delete(function(req, res){
        req.login.remove(function(err){
            if(err){
                res.status(500).send(err);
            } else {
                res.status(204).send('Removed');
            }
        });
    });

    return loginRouter;

};


module.exports = loginRoutes;
