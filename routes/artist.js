'use strict'
var express = require('express');
var ArtistController = require('../controller/artist');
var api = express.Router();
var md_auth = require('../middlewares/autenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/artists'});

api.get('/artist/:id',md_auth.ensureAuth,ArtistController.getArtist);
api.post('/artist',md_auth.ensureAuth,ArtistController.saveArtist);
api.get('/artists/:page?',md_auth.ensureAuth,ArtistController.getArtists);
api.put('/artist/:id',md_auth.ensureAuth,ArtistController.updatedArtist);
api.delete('/artist/:id',md_auth.ensureAuth,ArtistController.deleteArtist);
api.post('/upload-artist-image/:id',[md_auth.ensureAuth,md_upload],ArtistController.uploadImage);
api.get('/get-image-artist/:imageFile', ArtistController.getImageFile);

module.exports = api;