"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateTransactionObject = void 0;

var _celebrate = require("celebrate");

var _joi = _interopRequireDefault(require("joi"));

var validateTransactionObject = function validateTransactionObject() {
  var splitInfoValidation = _joi["default"].object().keys({
    SplitType: _joi["default"].valid("FLAT", "RATIO", "PERCENTAGE").required(),
    SplitValue: _joi["default"].number().positive().required(),
    SplitEntityId: _joi["default"].string().required()
  });

  return (0, _celebrate.celebrate)({
    body: _joi["default"].object({
      ID: _joi["default"].number().required(),
      Amount: _joi["default"].number().positive().required(),
      Currency: _joi["default"].string().required(),
      CustomerEmail: _joi["default"].string().email().required(),
      SplitInfo: _joi["default"].array().min(1).items(splitInfoValidation).min(1).max(20).required()
    })
  });
};

exports.validateTransactionObject = validateTransactionObject;