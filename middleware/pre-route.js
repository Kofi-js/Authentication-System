const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(express.static('public'));
  app.set('view engine', 'ejs');
  app.get('/', (req, res) => {
    res.render('index');
  });
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
};
