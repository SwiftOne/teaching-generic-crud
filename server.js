const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const appInfo = require('./app-info');
// const sekrit = require('./sekrit');

const serviceDispatch = appInfo.serviceDispatch;
const api = appInfo.api;

// CORS-lite
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.options('*', (req, res) => {res.status(200).send();} );

// app.post('/apps', sekrit.createApp);
Object.keys(api).forEach( (method) => {
  Object.keys(api[method]).forEach( (path) => {
    if(serviceDispatch[api[method][path]]) {
      app[method](path, serviceDispatch[api[method][path]]);
    } else {
      console.warn(`missing service handler for ${api}${path}`);
    }
  });
});

app.listen(port, () => { console.log(`server listening on port ${port}`);});

