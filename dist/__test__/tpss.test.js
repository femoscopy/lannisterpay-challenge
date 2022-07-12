"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../app"));

var _samplePayload = require("./samplePayload");

describe("Tests for lannister pay fee routes:", function () {
  it("should compute TPSS transaction fee for sample data 1", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _supertest["default"])(_app["default"]).post("/split-payments/compute").send(_samplePayload.sample1);

          case 2:
            result = _context.sent;
            expect(result.statusCode).toBe(200);
            expect(result.body).toStrictEqual(_samplePayload.sampleOneResult);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("should compute TPSS transaction fee for sample data 2", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _supertest["default"])(_app["default"]).post("/split-payments/compute").send(_samplePayload.sample2);

          case 2:
            response = _context2.sent;
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual(_samplePayload.sampleTwoResult);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it("should not compute transaction fee for invalid payload", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var response;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _supertest["default"])(_app["default"]).post("/split-payments/compute").send({});

          case 2:
            response = _context3.sent;
            expect(response.statusCode).toBe(400);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});