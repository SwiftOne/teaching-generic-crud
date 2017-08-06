// Note to self - these will almost certainly break out into their own files
const sqlite3 = require(`sqlite3`);

const db = new sqlite3.Database(`data/inventory.db.sqlite`);

// const resultHandler = ( request, response, result ) => {
//   response.status(result.status || 200);
//   if(result.data) {
//     response.send(JSON.stringify( result.data ));
//   } else {
//     response.send();
//   }
// };
//

// const commands = {
//   renewUserSession: function(appkey, user) {
//   },
// };
// These should handle all the HTTP parts
const services = {
  helloWorld: ( request, response ) => {
    response.status(200).send(JSON.stringify({ hello: `world` }));
  },
  // getApi: ( request, response ) => {
  //   resultHandler( request, response, appServices.getApi());
  // },
  getUserListForApp: (request, response) => {
    const stmt = db.prepare(`select username from users where appkey = ?`);
    stmt.all(request.params.appkey, (err, rows) => {
      if(err) {
        response.status(500).send(JSON.stringify({ error: err }));
      } else {
        response.status(200).send(JSON.stringify(rows.map( (row) => row.username )));
      }
    });
  },
  //////////////////////////////////////////////
  createUserForApp: (request, response) => { // TODO Handle first user, don't allow conflicts
    const stmt = db.prepare(`insert into users (username, pwhash, appkey, userlevel, profile) values( ?, ?, ?, ?, ?)`);
    let userlevel = 'normal';
    userlevel = userlevel || 'admin';
    stmt.run(request.params.username, `XXX`, request.params.appkey, userlevel, `{}`, (err) => {
      if(err) {
        response.status(500).send(JSON.stringify({error: err }));
      } else {
        response.status(204).send();
      }
    });
    stmt.finalize();
  },
  //////////////////////////////////////////////
  loginUser: (request, response) => {
    const stmt = db.prepare(`insert into sessions (token, username, appkey, expires) values ( ?,?,?,?)`);
    const token = `XXX-XXX`;
    stmt.run(token, request.params.username, request.params.appkey, (new Date()).getTime(), (err) => {
      if(err) {
        response.status(500).send(JSON.stringify({error: err }));
      } else {
        response.status(204).send();
      }
    });
    stmt.finalize();
  },
  //////////////////////////////////////////////
  updateUserProfile: (request, response) => {
    const stmt = db.prepare(`update users set profile = ? where appkey = ? and username = ?`);
    stmt.run(JSON.stringify(request.body), request.params.appkey, request.params.username, (err) => {
      if(err) {
        response.status(500).send(JSON.stringify({error: err }));
      } else {
        response.status(204).send();
      }
    });
    stmt.finalize();
  },
  //////////////////////////////////////////////
  getUserStatusForApp: (request, response) => {
    const stmt = db.prepare(`select username from sessions where appkey = ? and username = ?`);
    stmt.get(request.params.appkey, request.params.username, (err, row) => {
      if(err) {
        response.status(500).send(JSON.stringify({error: err}));
      } else if (!row) {
        response.status(200).send(JSON.stringify({}));
      } else {
        response.status(200).send(JSON.stringify(row.username));
      }
    });
    stmt.finalize();
  },
  //////////////////////////////////////////////
  logoutUser: (request, response) => {
    const stmt = db.prepare(`delete from sessions where appkey = ? and username = ?`);
    stmt.run(request.params.appkey, request.params.username, (error) => {
      if(error) {
        response.status(500).send(JSON.stringify({error}));
      } else {
        response.status(204).send();
      }
    });
    stmt.finalize();
  },
  //////////////////////////////////////////////
  getTopicList: (request, response) => {
    const stmt = db.prepare(`select topic from topics where appkey = ?`);
    stmt.all(request.params.appkey, (error, rows) => {
      if(error) {
        response.status(500).send(JSON.stringify({error}));
      } else {
        response.status(200).send(JSON.stringify(rows));
      }
    });
    stmt.finalize();
  },
  //////////////////////////////////////////////
  getTopic: (request, response) => {
    const stmt = db.prepare(`select json from topics where appkey = ? and topic = ?`);
    stmt.run(request.params.appkey, request.params.topic, (error, row) => {
      if(error) {
        response.status(500).send(JSON.stringify({error}));
      } else {
        response.status(200).send(JSON.stringify(row));
      }
    });
    stmt.finalize();
  },
  //////////////////////////////////////////////
  deleteTopic: (request, response) => {
    const stmt = db.prepare(`delete from topics where appkey = ? and topic = ?`);
    stmt.run(request.params.appkey, request.params.topic, (error, row) => {
      if(error) {
        response.status(500).send(JSON.stringify({error}));
      } else {
        response.status(200).send(JSON.stringify(row));
      }
    });
    stmt.finalize();
  },
  //////////////////////////////////////////////
  createTopic: (request, response) => {
    const stmt = db.prepare(`insert into topics (appkey, topic, json) values (?,?,?)`);
    stmt.run(request.params.appkey, request.params.topic, '', (error) => {
      if(error) {
        response.status(500).send(JSON.stringify({error}));
      } else {
        response.status(204).send();
      }
    });
    stmt.finalize();
  },
  //////////////////////////////////////////////
  updateTopic: (request, response) => {
    const stmt = db.prepare(`insert into topics (appkey, topic, json) values (?,?,?)`);
    stmt.run(request.params.appkey, request.params.topic, '', (error) => {
      if(error) {
        response.status(500).send(JSON.stringify({error}));
      } else {
        response.status(204).send();
      }
    });
    stmt.finalize();
  },
  //////////////////////////////////////////////
  promoteUser: (request, response) => {
    const stmt = db.prepare(`update users set userlevel = 'admin' where appkey = ? and username = ?`);
    stmt.run(request.params.appkey, request.params.username, (error) => {
      if(error) {
        response.status(500).send(JSON.stringify({error}));
      } else {
        response.status(204).send();
      }
    });
    stmt.finalize();
  },
  //////////////////////////////////////////////
  demoteUser: (request, response) => {
    const stmt = db.prepare(`update users set userlevel = 'normal' where appkey = ? and username = ?`);
    stmt.run(request.params.appkey, request.params.username, (error) => {
      if(error) {
        response.status(500).send(JSON.stringify({error}));
      } else {
        response.status(204).send();
      }
    });
    stmt.finalize();
  },
};


module.exports = services;
