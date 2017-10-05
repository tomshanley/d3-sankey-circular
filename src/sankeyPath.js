import {linkHorizontal} from "d3-shape";

// function that determines whether draw path using d3.linkHorizontal() or the circularPathData.path string
// and returns the path string for the d value
export var sankeyPath = function (link) {
  let path = ''
  if (link.circular) {
    path = link.circularPathData.path
  } else {
    var normalPath = linkHorizontal()
      .source(function (d) {
        let x = d.source.x0 + (d.source.x1 - d.source.x0)
        let y = d.y0
        return [x, y]
      })
      .target(function (d) {
        let x = d.target.x0
        let y = d.y1
        return [x, y]
      })
    path = normalPath(link)
  }
  return path
}
