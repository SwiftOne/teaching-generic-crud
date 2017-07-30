var allServices = require('./all-services');

var api = { 
  get: {
    '/': 'getApi',
    '/users/:appkey': 'getUserList',
    '/users/:appkey/:username': 'getUserStatus',
    '/inventory/:appkey': 'getTopicList',
    '/inventory/:appkey/:topic': 'getTopic'
  },
  delete: {
    '/users/:appkey/:username/session': 'logoutUser',
    '/inventory/:appkey/:topic': 'deleteTopic',
  },
  post: {
    '/user/:appkey/:username': 'createUser',
    '/user/:appkey/:username/:admin': 'promoteUser',
    '/inventory/:appkey/:topic': 'createTopic',
  },
  put: {
    '/user/:appkey/:username/session': 'updateUserSession',
    '/user/:appkey/:username/profile': 'updateUserProfile',
    '/inventory/:appkey/:topic': 'updateTopic'
  } 
};
var serviceDispatch = {
 'getApi': allServices.helloWorld,
 'getUserList': allServices.helloWorld,
 'getUserStatus': allServices.helloWorld,
 'getTopicList': allServices.helloWorld,
 'getTopic': allServices.helloWorld,
 'logoutUser': allServices.helloWorld,
 'deleteTopic': allServices.helloWorld,
 'createUser': allServices.helloWorld,
 'promoteUser': allServices.helloWorld,
 'createTopic': allServices.helloWorld,
 'updateUserSession': allServices.helloWorld,
 'updateUserProfile': allServices.helloWorld,
 'updateTopic': allServices.helloWorld
};

module.exports = { api, serviceDispatch };
