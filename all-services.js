// Note to self - these will almost certainly break out into their own files

var btoa = require('btoa');
var storeMaker = require('json-fs-store');
var master = storeMaker('store/master');


var services = {
  helloWorld: ( request, response ) => {
    response.status(200).send(JSON.stringify({ hello: 'world' }));
  }
};


module.exports = services;
