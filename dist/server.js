"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _config = require("./config");

var _contenedor = require("./contenedor");

var _require = require('http'),
    HttpServer = _require.Server;

var _require2 = require('socket.io'),
    IOServer = _require2.Server;

var app = (0, _express["default"])();
var httpServer = new HttpServer(app);
var io = new IOServer(httpServer);
var PORT = process.env.PORT || 8080;
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // ROUTES

app.get('/', function (req, res) {
  res.render('index');
});
app.use(function (req, res) {
  res.status(404).json({
    'error': -2,
    'descripcion': 'Ruta no existente'
  });
});
var contenedorProductos = new _contenedor.Contenedor(_config.configMySQL, 'productos');

var products = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", contenedorProductos.getAllProducts());

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function products() {
    return _ref.apply(this, arguments);
  };
}();

var contenedorMensajes = new _contenedor.Contenedor(_config.configSQLite, 'mensajes');

var messages = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", contenedorMensajes.getAllMessages());

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function messages() {
    return _ref2.apply(this, arguments);
  };
}();

httpServer.listen(PORT, /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
  return _regenerator["default"].wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log("Servidor corriendo en http://localhost:".concat(PORT));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
io.on('connection', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(socket) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log('nuevo cliente conectado');
            _context6.t0 = socket;
            _context6.next = 4;
            return products();

          case 4:
            _context6.t1 = _context6.sent;

            _context6.t0.emit.call(_context6.t0, 'productos', _context6.t1);

            _context6.t2 = socket;
            _context6.next = 9;
            return messages();

          case 9:
            _context6.t3 = _context6.sent;

            _context6.t2.emit.call(_context6.t2, 'mensajes', _context6.t3);

            socket.on('new-product', /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(data) {
                var newListOfProduct;
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return contenedorProductos.addProduct(data);

                      case 2:
                        _context4.next = 4;
                        return contenedorProductos.getAllProducts();

                      case 4:
                        newListOfProduct = _context4.sent;
                        io.emit('productos', newListOfProduct);

                      case 6:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x2) {
                return _ref5.apply(this, arguments);
              };
            }());
            socket.on('new-message', /*#__PURE__*/function () {
              var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(data) {
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return contenedorMensajes.addMessage(data);

                      case 2:
                        _context5.t0 = io;
                        _context5.next = 5;
                        return contenedorMensajes.getAllMessages();

                      case 5:
                        _context5.t1 = _context5.sent;

                        _context5.t0.emit.call(_context5.t0, 'mensajes', _context5.t1);

                      case 7:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x3) {
                return _ref6.apply(this, arguments);
              };
            }());

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x) {
    return _ref4.apply(this, arguments);
  };
}());