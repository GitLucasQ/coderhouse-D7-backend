"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSQLite = exports.configMySQL = void 0;
var configMySQL = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'coder'
  }
};
exports.configMySQL = configMySQL;
var configSQLite = {
  client: 'sqlite3',
  connection: {
    filename: "".concat(__dirname, "/db/mydb.sqlite")
  },
  useNullAsDefault: true
};
exports.configSQLite = configSQLite;