'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar Rutas

//Configuracion body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar cabeceras http

//Rutas base

module.exports = app;