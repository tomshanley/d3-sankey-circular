"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = constant;
// returns a function, using the parameter given to the sankey setting
function constant(x) {
  return function () {
    return x;
  };
}