"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var computeTpssFee = function computeTpssFee(transactionDTO) {
  var ID = transactionDTO.ID,
      Amount = transactionDTO.Amount,
      SplitInfo = transactionDTO.SplitInfo;
  var finalBalance = Number(Amount);
  var totalRatio = 0; // to store total split value for all ratio split types
  // initialize empty array for each split type

  var flatSplitTypes = [];
  var percentageSplitTypes = [];
  var ratioSplitTypes = []; // iterate through splitinfo and update each repective split type array

  SplitInfo.forEach(function (info, index) {
    switch (info.SplitType) {
      case "FLAT":
        flatSplitTypes.push(_objectSpread(_objectSpread({}, info), {}, {
          index: index
        }));
        break;

      case "PERCENTAGE":
        percentageSplitTypes.push(_objectSpread(_objectSpread({}, info), {}, {
          index: index
        }));
        break;

      case "RATIO":
        totalRatio += Number(info.SplitValue); // update total ratio split value

        ratioSplitTypes.push(_objectSpread(_objectSpread({}, info), {}, {
          index: index
        }));
        break;

      default:
        break;
    }
  }); // combine them all to form a new array with the order of precedence recognised: FLAT > PERCENTAGE > RATIO

  var allSplitTypes = [].concat(flatSplitTypes, percentageSplitTypes, ratioSplitTypes);
  var finalSplitBreakDown = []; // array holding final result

  var ratioBalance; // compute the split info based on their type

  for (var i = 0; i < allSplitTypes.length; i++) {
    var currentSplitInfo = allSplitTypes[i];
    var resObj = {};

    if (currentSplitInfo.SplitType === "FLAT") {
      finalBalance -= Number(currentSplitInfo.SplitValue);
      resObj["SplitEntityId"] = currentSplitInfo.SplitEntityId;
      resObj["Amount"] = currentSplitInfo.SplitValue;
      finalSplitBreakDown[currentSplitInfo.index] = resObj;
    } else if (currentSplitInfo.SplitType === "PERCENTAGE") {
      var percentageSplitAmount = Number(currentSplitInfo.SplitValue) / 100 * finalBalance;
      finalBalance -= Number(percentageSplitAmount);
      resObj["SplitEntityId"] = currentSplitInfo.SplitEntityId;
      resObj["Amount"] = percentageSplitAmount;
      finalSplitBreakDown[currentSplitInfo.index] = resObj;
      ratioBalance = finalBalance;
    } else if (currentSplitInfo.SplitType === "RATIO") {
      var openingRatioBalance = ratioBalance;
      var ratioSplitAmount = Number(currentSplitInfo.SplitValue) / totalRatio * openingRatioBalance;
      finalBalance -= Number(ratioSplitAmount);
      resObj["SplitEntityId"] = currentSplitInfo.SplitEntityId;
      resObj["Amount"] = ratioSplitAmount;
      finalSplitBreakDown[currentSplitInfo.index] = resObj;
    }
  }

  return {
    ID: ID,
    Balance: finalBalance,
    SplitBreakdown: finalSplitBreakDown
  };
};

var _default = computeTpssFee;
exports["default"] = _default;