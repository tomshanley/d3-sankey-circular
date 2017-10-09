"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sankeyPath = undefined;

var _d3Shape = require("d3-shape");

// function that determines whether draw path using d3.linkHorizontal() or the circularPathData.path string
// and returns the path string for the d value
var sankeyPath = exports.sankeyPath = function (link) {
  let path = '';
  if (link.circular) {
    path = link.circularPathData.path;
  } else {
    var normalPath = (0, _d3Shape.linkHorizontal)().source(function (d) {
      let x = d.source.x0 + (d.source.x1 - d.source.x0);
      let y = d.y0;
      return [x, y];
    }).target(function (d) {
      let x = d.target.x0;
      let y = d.y1;
      return [x, y];
    });
    path = normalPath(link);
  }
  return path;
};