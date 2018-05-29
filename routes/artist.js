'use strict'
var express = require('express');
var ArtistController = require('../controller/artist');
var api = express.Router();
var md_auth = require('../middlewares/autenticated');

api.get('/artist',md_auth.ensureAuth,ArtistController.getArtist);

module.exports = api;