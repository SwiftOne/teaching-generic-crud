const allServices = require(`./all-services`);

const api = {
  get: {
    '/': `getApi`,
    '/users/:appkey': `getUserListForApp`,
    // '/users/:appkey': allServices.getUserListForApp,
    '/users/:appkey/:username': `getUserStatusForApp`,
    '/inventory/:appkey': `getTopicList`,
    '/inventory/:appkey/:topic': `getTopic`
  },
  delete: {
    '/users/:appkey/:username/session': `logoutUser`,
    '/users/:appkey/:username/:admin': `demoteUser`,
    '/inventory/:appkey/:topic': `deleteTopic`,
  },
  post: {
    '/user/:appkey/:username': `createUserForApp`,
    '/user/:appkey/:username/session': `loginUser`,
    '/user/:appkey/:username/:admin': `promoteUser`,
    '/inventory/:appkey/:topic': `createTopic`,
  },
  put: {
    '/user/:appkey/:username/profile': `updateUserProfile`,
    '/inventory/:appkey/:topic': `updateTopic`
  }
};

// TODO: can I automatically create this?
const serviceDispatch = {
  'getApi': allServices.getApi,
  'getUserListForApp': allServices.getUserListForApp,
  'getUserStatusForApp': allServices.getUserStatusForApp,
  'getTopicList': allServices.getTopicList,
  'getTopic': allServices.getTopic,
  'loginUser': allServices.loginUser,
  'logoutUser': allServices.logoutUser,
  'deleteTopic': allServices.deleteTopic,
  'createUserForApp': allServices.createUserForApp,
  'promoteUser': allServices.promoteUser,
  'demoteUser': allServices.demoteUser,
  'createTopic': allServices.createTopic,
  'updateUserProfile': allServices.updateUserProfile,
  'updateTopic': allServices.updateTopic
};

module.exports = { api, serviceDispatch };
