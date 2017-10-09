"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.left = left;
exports.right = right;
exports.justify = justify;
exports.center = center;

var _d3Array = require("d3-array");

// For a given link, return the target node's depth
function targetDepth(d) {
  return d.target.depth;
}

// The depth of a node when the nodeAlign (align) is set to 'left'
function left(node) {
  return node.depth;
}

// The depth of a node when the nodeAlign (align) is set to 'right'
function right(node, n) {
  return n - 1 - node.height;
}

// The depth of a node when the nodeAlign (align) is set to 'justify'
function justify(node, n) {
  return node.sourceLinks.length ? node.depth : n - 1;
}

// The depth of a node when the nodeAlign (align) is set to 'center'
function center(node) {
  return node.targetLinks.length ? node.depth : node.sourceLinks.length ? (0, _d3Array.min)(node.sourceLinks, targetDepth) - 1 : 0;
}