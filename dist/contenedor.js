"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contenedor = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _exampleData = require("./db/exampleData");

var Contenedor = /*#__PURE__*/function () {
  function Contenedor(config, tableName) {
    (0, _classCallCheck2["default"])(this, Contenedor);
    this.config = config;
    this.tableName = tableName;
    this.knex = require('knex')(this.config);
    this.createTable();
  }

  (0, _createClass2["default"])(Contenedor, [{
    key: "createTable",
    value: function () {
      var _createTable = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!(this.config.client === 'mysql')) {
                  _context.next = 12;
                  break;
                }

                _context.next = 4;
                return this.knex.schema.hasTable(this.tableName);

              case 4:
                if (_context.sent) {
                  _context.next = 10;
                  break;
                }

                _context.next = 7;
                return this.knex.schema.createTable(this.tableName, function (table) {
                  table.increments('id');
                  table.string('title');
                  table.decimal('price');
                  table.string('thumbnail');
                });

              case 7:
                _context.next = 9;
                return this.knex(this.tableName).insert(_exampleData.productExampleData);

              case 9:
                console.log("Tabla ".concat(this.tableName, " creada con \xE9xito"));

              case 10:
                _context.next = 20;
                break;

              case 12:
                _context.next = 14;
                return this.knex.schema.hasTable(this.tableName);

              case 14:
                if (_context.sent) {
                  _context.next = 20;
                  break;
                }

                _context.next = 17;
                return this.knex.schema.createTable(this.tableName, function (table) {
                  table.increments('id');
                  table.string('email');
                  table.datetime('date');
                  table.string('message');
                });

              case 17:
                _context.next = 19;
                return this.knex(this.tableName).insert(_exampleData.messagesExampleData);

              case 19:
                console.log("Tabla ".concat(this.tableName, " creada con \xE9xito"));

              case 20:
                _context.next = 25;
                break;

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](0);
                console.error('Error:', _context.t0);

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 22]]);
      }));

      function createTable() {
        return _createTable.apply(this, arguments);
      }

      return createTable;
    }()
  }, {
    key: "getAllProducts",
    value: function () {
      var _getAllProducts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.knex.from(this.tableName).select('title', 'price', 'thumbnail');

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                console.error('Error:', _context2.t0);
                if (this.knex) this.knex.destroy();

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 6]]);
      }));

      function getAllProducts() {
        return _getAllProducts.apply(this, arguments);
      }

      return getAllProducts;
    }()
  }, {
    key: "addProduct",
    value: function () {
      var _addProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(product) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.knex(this.tableName).insert(product);

              case 3:
                _context3.next = 9;
                break;

              case 5:
                _context3.prev = 5;
                _context3.t0 = _context3["catch"](0);
                console.error('Error:', _context3.t0);
                if (this.knex) this.knex.destroy();

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 5]]);
      }));

      function addProduct(_x) {
        return _addProduct.apply(this, arguments);
      }

      return addProduct;
    }()
  }, {
    key: "getAllMessages",
    value: function () {
      var _getAllMessages = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.knex.from(this.tableName).select('email', 'date', 'message');

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](0);
                console.error('Error:', _context4.t0);
                if (this.knex) this.knex.destroy();

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 6]]);
      }));

      function getAllMessages() {
        return _getAllMessages.apply(this, arguments);
      }

      return getAllMessages;
    }()
  }, {
    key: "addMessage",
    value: function () {
      var _addMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(message) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this.knex(this.tableName).insert(message);

              case 3:
                _context5.next = 9;
                break;

              case 5:
                _context5.prev = 5;
                _context5.t0 = _context5["catch"](0);
                console.error('Error:', _context5.t0);
                if (this.knex) this.knex.destroy();

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 5]]);
      }));

      function addMessage(_x2) {
        return _addMessage.apply(this, arguments);
      }

      return addMessage;
    }()
  }]);
  return Contenedor;
}();

exports.Contenedor = Contenedor;