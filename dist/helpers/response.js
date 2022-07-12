"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.successResponse = exports.errorResponse = void 0;

var errorResponse = function errorResponse(res) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "NOT VALID";
  var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 400;
  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return res.status(status).json({
    status: "NOT OK",
    message: message,
    data: data
  });
};

exports.errorResponse = errorResponse;

var successResponse = function successResponse(res) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return res.status(200).json(data);
};

exports.successResponse = successResponse;