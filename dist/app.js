"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _response = require("./helpers/response");

var _celebrate = require("celebrate");

var _validation = require("./helpers/validation");

var _tpssCompute = _interopRequireDefault(require("./helpers/tpssCompute"));

var app = (0, _express["default"])();
app.use((0, _morgan["default"])("dev"));
app.use((0, _cors["default"])());
app.use((0, _helmet["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.get("/", function (req, res) {
  return res.status(200).json({
    message: "Welcome to LannisterPay TPSS API"
  });
}); // endpoint to compute TPSS for transactions

app.post("/split-payments/compute", (0, _validation.validateTransactionObject)(), /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = (0, _tpssCompute["default"])(req.body);
            return _context.abrupt("return", (0, _response.successResponse)(res, result));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.use("*", function (req, res) {
  return (0, _response.errorResponse)(res, "Route / Method not supported", 404);
});
app.use(function (error, _req, res, next) {
  if ((0, _celebrate.isCelebrateError)(error)) {
    var errorMessage = error.details.get("body") || error.details.get("query") || error.details.get("params");
    var message = errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.message.replace(/"/g, "");
    return (0, _response.errorResponse)(res, message);
  }

  next();
});
var _default = app;
exports["default"] = _default;