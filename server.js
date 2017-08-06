/* eslint no-console: "off" */
const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);
const appInfo = require(`./app-info`);
const serviceDispatch = appInfo.serviceDispatch;
const api = appInfo.api;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(`public`));

// CORS-lite
app.use(function(req, res, next) {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  res.header(`Access-Control-Allow-Methods`, `POST, GET, PUT, DELETE, OPTIONS`);
  res.header(`Access-Control-Allow-Credentials`, `true`);
  res.header(`Content-Type`, `application/json`);
  next();
});

app.use(bodyParser.json());
app.options(`*`, (req, res) => {res.status(200).send();} ); // accept any OPTIONS request

Object.keys(api).forEach( (method) => {
  Object.keys(api[method]).forEach( (path) => {
    if(serviceDispatch[api[method][path]]) {
      app[method](path, serviceDispatch[api[method][path]]);
      console.log(`adding service handler for ${method} ${path}`);
    } else {
      console.warn(`missing service handler for ${method} ${path}`);
    }
  });
});

// console.log(`initializing inventory app`);
// inventory.initialize()
// .then( () => {
app.listen(app.get('port'), () => { console.log(`server listening on port ${app.get('port')}`);});
// });

