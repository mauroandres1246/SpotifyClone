'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');


function pruebas(req,res){
    res.status(200).send({
        message: "Probando el controlador user del api rest"
    });
}

function saveUser(req,res){
    var user = new User();
    var params = req.body;
    
    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';

    if(params.password){
        //Encriptar y guardar datos
        bcrypt.hash(params.password,null,null,function(err,hash){
            user.password = hash;
            if (user.name != null && user.surname != null && user.email != null) {
                //Guardar el ususario
                user.save(function(err,userStored){
                    if (err) {
                        res.status(500).send({
                            message: "No se ha podido agregar a la base de datos"
                        });
                    } else {
                        if (!userStored) {
                            res.status(404).send({
                                message: "No se ha registrado el usuario"
                            });
                        } else {
                            res.status(200).send({
                                user:userStored
                            });
                        }
                    }
                });
            } else {
                res.status(200).send({
                    message: "Rellena todos los campos tio"
                });
            }
        });
    }else{
        res.status(200).send({
            message: "Ingrese contraseña tio"
        });
    }

}

function loginUser(req,res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()},(err,user)=>{
        if (err) {
            res.status(500).send({
                message: "Error en la peticion"
            });
        } else {
            if (!user) {
                res.status(404).send({
                    message: "No existe usuario"
                });
                
            } else {
                //Comprobar la contraseña
                bcrypt.compare(password,user.password,(err,result)=>{
                    if (result) {
                        //Devolver los datos del usuario logeado
                        if (params.gethash) {
                            //Devolver un token de jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        }else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({
                            message: "El usuario no ha podido logearse"
                        });
                    }
                });
            }
        }
    });

}

module.exports = {
    pruebas,
    saveUser,
    loginUser
};