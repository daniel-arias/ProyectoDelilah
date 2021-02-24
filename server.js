/**
 * Dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

/**
 * Modules
 */
const service = require('./service/routes');

/**
 * Constants
 */
const app = express();

/* Listen to port */
app.listen(process.env.HOST_PORT, (err) => {
  if(err) return console.log('cannot init server'), process.exit(1);
  console.log(`iniciando server en http://${process.env.HOST}:${process.env.HOST_PORT}`);
});

/* generic middlewares */
app.use(bodyParser.json());
app.use((err,req, res, next) => {
  if (!err){
    console.log(err);
    return  next();
  }
  res.status(500).send('Server Error');
});

/* start Service routes */
service.setRoutes(app);
