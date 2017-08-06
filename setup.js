// Note to self - these will almost certainly break out into their own files
const sqlite3 = require(`sqlite3`);

const db = new sqlite3.Database(`data/inventory.db.sqlite`);

const genericErrorHandler = (err) => {
  err && console.warn(err);
};

const setup = {

  runDbCmd: function(sqlText, params) {
    const stmt = db.prepare(sqlText);
    db.serialize( () => {
      stmt.run(params, genericErrorHandler);
      stmt.finalize();
    });
  },

  firstInit: function() {
    const cmds = [
      `CREATE TABLE apps( appkey primarykey, student, description)`,
      `CREATE TABLE topics( appkey, topic, json )`,
      `CREATE TABLE users( username, pwhash, appkey, userlevel, profile)`,
      `CREATE TABLE sessions(token, appkey, username, expires)`
    ];
    console.log(`Running setup commands`);
    cmds.forEach( (cmd) => this.runDbCmd(cmd));
    console.log(`setup complete`);
  },

  addAppkey: function({appkey, student, description}) {
    this.runDbCmd(`INSERT into apps(appkey, student, description) values (?,?,?)`, [appkey, student, description]);
  }
};

module.exports = setup;
