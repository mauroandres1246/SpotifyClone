'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');


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

module.exports = {
    pruebas,
    saveUser
};