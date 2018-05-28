'use strict'
var express = require('express');
var UserController = require('../controller/user');
var api = express.Router();
var md_auth = require('../middlewares/autenticated');

api.get('/probando-controlador', md_auth.ensureAuth ,UserController.pruebas);
api.post('/register',UserController.saveUser);
api.post('/login',UserController.loginUser);

module.exports = api;
