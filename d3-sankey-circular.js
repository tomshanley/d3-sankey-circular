// https://github.com/tomshanley/d3-sankey-circular
// fork of https://github.com/d3/d3-sankey copyright Mike Bostock
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(
        exports,
        require('d3-array'),
        require('d3-collection'),
        require('d3-shape')
      )
    : typeof define === 'function' && define.amd
        ? define(['exports', 'd3-array', 'd3-collection', 'd3-shape'], factory)
        : factory(
            (global.d3 = global.d3 || {}),
            global.d3,
            global.d3,
            global.d3
          )
})(this, function (exports, d3Array, d3Collection, d3Shape) {
  'use strict'
  function targetDepth (d) {
    return d.target.depth
  }

  function left (node) {
    return node.depth
  }

  function right (node, n) {
    return n - 1 - node.height
  }

  function justify (node, n) {
    return node.sourceLinks.length ? node.depth : n - 1
  }

  function center (node) {
    return node.targetLinks.length
      ? node.depth
      : node.sourceLinks.length
          ? d3Array.min(node.sourceLinks, targetDepth) - 1
          : 0
  }

  function constant (x) {
    return function () {
      return x
    }
  }

  function ascendingSourceBreadth (a, b) {
    return ascendingBreadth(a.source, b.source) || a.index - b.index
  }

  function ascendingTargetBreadth (a, b) {
    return ascendingBreadth(a.target, b.target) || a.index - b.index
  }

  function ascendingBreadth (a, b) {
    if (a.partOfCycle === b.partOfCycle) {
      return a.y0 - b.y0
    } else {
      if (a.circularLinkType === 'top' || b.circularLinkType === 'bottom') {
        return -1
      } else {
        return 1
      }
    }
  }

  function value (d) {
    return d.value
  }

  function nodeCenter (node) {
    return (node.y0 + node.y1) / 2
  }

  function linkSourceCenter (link) {
    return nodeCenter(link.source)
  }

  function linkTargetCenter (link) {
    return nodeCenter(link.target)
  }

  function weightedSource (link) {
    return nodeCenter(link.source) * link.value
  }

  function weightedTarget (link) {
    return nodeCenter(link.target) * link.value
  }

  function defaultId (d) {
    return d.index
  }

  function defaultNodes (graph) {
    return graph.nodes
  }

  function defaultLinks (graph) {
    return graph.links
  }

  function find (nodeById, id) {
    var node = nodeById.get(id)
    if (!node) throw new Error('missing: ' + id)
    return node
  }

  var sankey = function () {
    var x0 = 0,
      y0 = 0,
      x1 = 1,
      y1 = 1, // extent
      dx = 24, // nodeWidth
      py, // nodePadding
      scale = 1,
      id = defaultId,
      align = justify,
      nodes = defaultNodes,
      links = defaultLinks,
      iterations = 32

    var padding = Infinity
    var paddingRatio = 0.1

    function sankey () {
      var graph = {
        nodes: nodes.apply(null, arguments),
        links: links.apply(null, arguments)
      }
      computeNodeLinks(graph)
      identifyCircles(graph)
      selectCircularLinkTypes(graph)
      computeNodeValues(graph)
      computeNodeDepths(graph)
      computeNodeBreadths(graph, iterations)
      computeLinkBreadths(graph)

      //sort links per node, based on the links' source/target positions
      sortSourceLinks(graph)
      sortTargetLinks(graph)
      
      //adjust nodes that overlap links that span 2+ depths
      resolveNodeLinkOverlaps(graph)

      //sort links per node, based on the links' source/target positions
      sortSourceLinks(graph)
      sortTargetLinks(graph)
  
      //add d string for circular paths
      addCircularPathData(graph);

      return graph
    }

    sankey.update = function (graph) {
      computeLinkBreadths(graph)
      return graph
    }

    sankey.nodeId = function (_) {
      return arguments.length
        ? ((id = typeof _ === 'function' ? _ : constant(_)), sankey)
        : id
    }

    sankey.nodeAlign = function (_) {
      return arguments.length
        ? ((align = typeof _ === 'function' ? _ : constant(_)), sankey)
        : align
    }

    sankey.nodeWidth = function (_) {
      return arguments.length ? ((dx = +_), sankey) : dx
    }

    sankey.nodePadding = function (_) {
      return arguments.length ? ((py = +_), sankey) : py
    }

    sankey.scale = function (_) {
      return arguments.length ? ((scale = +_), sankey) : scale
    }

    sankey.nodes = function (_) {
      return arguments.length
        ? ((nodes = typeof _ === 'function' ? _ : constant(_)), sankey)
        : nodes
    }

    sankey.links = function (_) {
      return arguments.length
        ? ((links = typeof _ === 'function' ? _ : constant(_)), sankey)
        : links
    }

    sankey.size = function (_) {
      return arguments.length
        ? ((x0 = y0 = 0), (x1 = +_[0]), (y1 = +_[1]), sankey)
        : [x1 - x0, y1 - y0]
    }

    sankey.extent = function (_) {
      return arguments.length
        ? ((x0 = +_[0][0]), (x1 = +_[1][0]), (y0 = +_[0][1]), (y1 = +_[1][
            1
          ]), sankey)
        : [[x0, y0], [x1, y1]]
    }

    sankey.iterations = function (_) {
      return arguments.length ? ((iterations = +_), sankey) : iterations
    }

    sankey.nodePaddingRatio = function (_) {
      return arguments.length ? ((paddingRatio = +_), sankey) : paddingRatio
    }

    // Populate the sourceLinks and targetLinks for each node.
    // Also, if the source and target are not objects, assume they are indices.
    function computeNodeLinks (graph) {
      graph.nodes.forEach(function (node, i) {
        node.index = i
        node.sourceLinks = []
        node.targetLinks = []
      })
      var nodeById = d3Collection.map(graph.nodes, id)
      graph.links.forEach(function (link, i) {
        link.index = i
        var source = link.source
        var target = link.target
        if (typeof source !== 'object') {
          source = link.source = find(nodeById, source)
        }
        if (typeof target !== 'object') {
          target = link.target = find(nodeById, target)
        }
        source.sourceLinks.push(link)
        target.targetLinks.push(link)
      })
    }

    // Compute the value (size) and cycleness of each node by summing the associated links.
    function computeNodeValues (graph) {
      graph.nodes.forEach(function (node) {
        node.partOfCycle = false
        node.value = Math.max(
          d3Array.sum(node.sourceLinks, value),
          d3Array.sum(node.targetLinks, value)
        )
        node.sourceLinks.forEach(function (link) {
          if (link.circular) {
            node.partOfCycle = true
            node.circularLinkType = link.circularLinkType
          }
        })
        node.targetLinks.forEach(function (link) {
          if (link.circular) {
            node.partOfCycle = true
            node.circularLinkType = link.circularLinkType
          }
        })
      })
    }

    // Iteratively assign the depth (x-position) for each node.
    // Nodes are assigned the maximum depth of incoming neighbors plus one;
    // nodes with no incoming links are assigned depth zero, while
    // nodes with no outgoing links are assigned the maximum depth.
    function computeNodeDepths (graph) {
      var nodes, next, x

      for (
        (nodes = graph.nodes), (next = []), (x = 0);
        nodes.length;
        ++x, (nodes = next), (next = [])
      ) {
        nodes.forEach(function (node) {
          node.depth = x
          node.sourceLinks.forEach(function (link) {
            if (next.indexOf(link.target) < 0 && !link.circular) {
              next.push(link.target)
            }
          })
        })
      }

      for (
        (nodes = graph.nodes), (next = []), (x = 0);
        nodes.length;
        ++x, (nodes = next), (next = [])
      ) {
        nodes.forEach(function (node) {
          node.height = x
          node.targetLinks.forEach(function (link) {
            if (next.indexOf(link.source) < 0 && !link.circular) {
              next.push(link.source)
            }
          })
        })
      }

      var kx = (x1 - x0 - dx) / (x - 1)
      graph.nodes.forEach(function (node) {
        node.x1 =
          (node.x0 =
            x0 +
            Math.max(
              0,
              Math.min(x - 1, Math.floor(align.call(null, node, x)))
            ) *
              kx) + dx
      })
    }

    function computeNodeBreadths (graph) {
      var columns = d3Collection
        .nest()
        .key(function (d) {
          return d.x0
        })
        .sortKeys(d3Array.ascending)
        .entries(graph.nodes)
        .map(function (d) {
          return d.values
        })

      initializeNodeBreadth()
      resolveCollisions()

      for (var alpha = 1, n = iterations; n > 0; --n) {
        // relaxRightToLeft((alpha *= 0.99))
        // resolveCollisions()
        // relaxLeftToRight((alpha *= 0.99))
        // resolveCollisions()
        relaxLeftAndRight((alpha *= 0.99))
        resolveCollisions()
      }

      function initializeNodeBreadth () {
        columns.forEach(function (nodes) {
          let thisPadding = y1 * paddingRatio / (nodes.length + 1)
          padding = thisPadding < padding ? thisPadding : padding
        })

        py = padding

        var ky = d3Array.min(columns, function (nodes) {
          return (y1 - y0 - (nodes.length - 1) * py) / d3Array.sum(nodes, value)
        })

        ky = ky * scale

        columns.forEach(function (nodes) {
          var nodesLength = nodes.length
          nodes.forEach(function (node, i) {
            if (node.partOfCycle) {
              if (node.circularLinkType == 'top') {
                node.y0 = y0 + i
                node.y1 = node.y0 + node.value * ky
              } else {
                node.y0 = y1 - (node.value * ky) - i
                node.y1 = node.y0 + node.value * ky
              }
            } else {
              // node.y1 = (node.y0 = i) + node.value * ky
              node.y0 = (y1 - y0) / 2 - nodesLength / 2 + i
              node.y1 = node.y0 + node.value * ky
            }
          })
        })

        graph.links.forEach(function (link) {
          link.width = link.value * ky
        })
      }

      function relaxLeftAndRight (alpha) {
        let columnsLength = columns.length
        // console.log("cols: " + columnsLength);

        columns.forEach(function (nodes, i) {
          let n = nodes.length
          let depth = nodes[0].depth

          // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

          // console.log(depth + ': ' + n)

          nodes.forEach(function (node) {

            // check the node is not an orphan
            if (node.sourceLinks.length || node.targetLinks.length) {
              if (node.partOfCycle /*&& n > 1 /* && depth != 0 */) {
                // console.log('do nothing')
              } else if (depth == 0 && n == 1) {
                let nodeHeight = node.y1 - node.y0

                node.y0 = y1 / 2 - nodeHeight / 2
                node.y1 = y1 / 2 + nodeHeight / 2
              } else if (depth == columnsLength - 1 && n == 1) {
                let nodeHeight = node.y1 - node.y0

                node.y0 = y1 / 2 - nodeHeight / 2
                node.y1 = y1 / 2 + nodeHeight / 2
              } else {
                let avg = 0

                let avgTargetY = d3Array.mean(
                  node.sourceLinks,
                  linkTargetCenter
                )
                let avgSourceY = d3Array.mean(
                  node.targetLinks,
                  linkSourceCenter
                )

                if (avgTargetY && avgSourceY) {
                  avg = (avgTargetY + avgSourceY) / 2
                } else {
                  avg = avgTargetY || avgSourceY
                }

                let dy = (avg - nodeCenter(node)) * alpha

                // positive if it node needs to move down
                // let dy = (nodeCenter(node.sourceLinks[0].target) - nodeCenter(node.sourceLinks[0].source) / 2) * alpha;

                node.y0 += dy
                node.y1 += dy

                // console.log('after: ' + node.y0 + ' ' + node.y1)
              }
            }
          })
        })
      }

      function resolveCollisions () {
        
        columns.forEach(function (nodes) {
          var node, dy, y = y0, n = nodes.length, i

          // Push any overlapping nodes down.
          nodes.sort(ascendingBreadth)
          
          for (i = 0; i < n; ++i) {
            node = nodes[i]
            dy = y - node.y0
            
            if (dy > 0) {
              node.y0 += dy
              node.y1 += dy
            }
            y = node.y1 + py
          }

          // If the bottommost node goes outside the bounds, push it back up.
          dy = y - py - y1
          if (dy > 0) {
            ;(y = node.y0 -= dy), (node.y1 -= dy)

            // Push any overlapping nodes back up.
            for (i = n - 2; i >= 0; --i) {
              node = nodes[i]
              dy = node.y1 + py - y
              if (dy > 0) (node.y0 -= dy), (node.y1 -= dy)
              y = node.y0
            }
          }
        })
      }
    }

    function computeLinkBreadths (graph) {
      graph.nodes.forEach(function (node) {
        node.sourceLinks.sort(ascendingTargetBreadth)
        node.targetLinks.sort(ascendingSourceBreadth)
      })
      graph.nodes.forEach(function (node) {
        var y0 = node.y0
        var y1 = y0

        // start from the bottom of the node for cycle links
        var y0cycle = node.y1
        var y1cycle = y0cycle

        node.sourceLinks.forEach(function (link) {
          if (link.circular) {
            link.y0 = y0cycle - link.width / 2
            y0cycle = y0cycle - link.width
          } else {
            link.y0 = y0 + link.width / 2
            y0 += link.width
          }
        })
        node.targetLinks.forEach(function (link) {
          if (link.circular) {
            link.y1 = y1cycle - link.width / 2
            y1cycle = y1cycle - link.width
          } else {
            link.y1 = y1 + link.width / 2
            y1 += link.width
          }
        })
      })
    }

    return sankey
  }

  /// /////////////////////////////////////////////////////////////////////////////////
  // Cycle functions

  //portion of code to detect circular links based on Colin Fergus' bl.ock https://gist.github.com/cfergus/3956043

  // Identify circles in the link objects
  function identifyCircles (graph) {
    var addedLinks = []
    var circularLinkID = 0
    graph.links.forEach(function (link) {
      if (createsCycle(link.source, link.target, addedLinks)) {
        link.circular = true
        link.circularLinkID = circularLinkID
        circularLinkID = circularLinkID + 1
      } else {
        link.circular = false
        addedLinks.push(link)
      }
    })
  }

  function selectCircularLinkTypes (graph) {
    let numberOfTops = 0
    let numberOfBottoms = 0
    graph.links.forEach(function (link) {
      if (link.circular) {
        // if either souce or target has type already use that
        if (link.source.circularLinkType || link.target.circularLinkType) {
          // default to source type if available
          link.circularLinkType = link.source.circularLinkType
            ? link.source.circularLinkType
            : link.target.circularLinkType
        } else {
          link.circularLinkType = numberOfTops < numberOfBottoms
            ? 'top'
            : 'bottom'
        }

        if (link.circularLinkType == 'top') {
          numberOfTops = numberOfTops + 1
        } else {
          numberOfBottoms = numberOfBottoms + 1
        }

        graph.nodes.forEach(function (node) {
          if (node.name == link.source.name || node.name == link.target.name) {
            node.circularLinkType = link.circularLinkType
          }
        })
      }
    })
  }

  // Checks if link creates a cycle
  function createsCycle (originalSource, nodeToCheck, graph) {
    if (graph.length == 0) {
      return false
    }

    var nextLinks = findLinksOutward(nodeToCheck, graph)
    // leaf node check
    if (nextLinks.length == 0) {
      return false
    }

    // cycle check
    for (var i = 0; i < nextLinks.length; i++) {
      var nextLink = nextLinks[i]

      if (nextLink.target === originalSource) {
        return true
      }

      // Recurse
      if (createsCycle(originalSource, nextLink.target, graph)) {
        return true
      }
    }

    // Exhausted all links
    return false
  }

  /* Given a node, find all links for which this is a source
     in the current 'known' graph  */
  function findLinksOutward (node, graph) {
    var children = []

    for (var i = 0; i < graph.length; i++) {
      if (node == graph[i].source) {
        children.push(graph[i])
      }
    }

    return children
  }

  // Create a normal curve or circular curve
  //var curveSankeyForceLink = 

  // Return the angle between a straight line between the source and target of the link, and the vertical plane of the node
  function linkAngle (link) {
    let adjacent = Math.abs(link.y1 - link.y0)
    let opposite = Math.abs(link.target.x0 - link.source.x1)

    return Math.atan(opposite / adjacent)
  }

  function circularLinksCross (link1, link2) {
    if (link1.source.depth < link2.target.depth) {
      return false
    } else if (link1.target.depth > link2.source.depth) {
      return false
    } else {
      return true
    }
  }

  function calcVerticalBuffer (links) {
    links.sort(sortLinkDepthAscending)
    links.forEach(function (link, i) {
      let buffer = 0

      let j = 0
      for (j; j < i; j++) {
        if (circularLinksCross(links[i], links[j])) {
          let bufferOverThisLink =
            links[j].circularPathData.verticalBuffer +
            links[j].width / 2 +
            circularLinkGap
          buffer = bufferOverThisLink > buffer ? bufferOverThisLink : buffer
        }
      }

      link.circularPathData.verticalBuffer = buffer + link.width / 2
    })

    return links
  }

  // calculate the optimum path for a link to reduce overlaps
  function addCircularPathData (graph) {

    let baseRadius = 10;
    let buffer = 10;
    let verticalMargin = 25;

    let minY = d3.min(graph.links, function (link) { return link.source.y0 })

    // create object for circular Path Data
    graph.links.forEach(function (link) {
      if (link.circular) {
        link.circularPathData = {}
      }
    })

    // calc vertical offsets per top/bottom links
    let topLinks = graph.links.filter(function (l) {
      return l.circularLinkType == 'top'
    })
    topLinks = calcVerticalBuffer(topLinks)

    let bottomLinks = graph.links.filter(function (l) {
      return l.circularLinkType == 'bottom'
    })
    bottomLinks = calcVerticalBuffer(bottomLinks)

    // add the base data for each link
    graph.links.forEach(function (link) {
      if (link.circular) {

        link.circularPathData.arcRadius = link.width + baseRadius
        link.circularPathData.leftNodeBuffer = buffer;
        link.circularPathData.rightNodeBuffer = buffer;
        link.circularPathData.sourceWidth = link.source.x1 - link.source.x0
        link.circularPathData.sourceX = link.source.x0 + link.circularPathData.sourceWidth
        link.circularPathData.targetX = link.target.x0
        link.circularPathData.sourceY = link.y0
        link.circularPathData.targetY = link.y1

        // add left extent coordinates, based on links with same source depth and circularLink type
        let thisDepth = link.source.depth
        let thisCircularLinkType = link.circularLinkType
        let sameDepthLinks = graph.links.filter(function (l) {
          return (
            l.source.depth == thisDepth &&
            l.circularLinkType == thisCircularLinkType
          )
        })

        if (link.circularLinkType == 'bottom') {
          sameDepthLinks.sort(sortLinkSourceYDescending)
        } else {
          sameDepthLinks.sort(sortLinkSourceYAscending)
        }

        let radiusOffset = 0;
        sameDepthLinks.forEach(function (l, i) {
          if (l.circularLinkID == link.circularLinkID) {
            link.circularPathData.leftSmallArcRadius = baseRadius + link.width/2 + radiusOffset
            link.circularPathData.leftLargeArcRadius = baseRadius + link.width/2 + i * circularLinkGap + radiusOffset
          }
          radiusOffset = radiusOffset + l.width
        })

        // add right extent coordinates, based on links with same target depth and circularLink type
        thisDepth = link.target.depth
        sameDepthLinks = graph.links.filter(function (l) {
          return (
            l.target.depth == thisDepth &&
            l.circularLinkType == thisCircularLinkType
          )
        })
        if (link.circularLinkType == 'bottom') {
          sameDepthLinks.sort(sortLinkTargetYDescending)
        } else {
          sameDepthLinks.sort(sortLinkTargetYAscending)
        }

        radiusOffset = 0
        sameDepthLinks.forEach(function (l, i) {
          if (l.circularLinkID == link.circularLinkID) {
            link.circularPathData.rightSmallArcRadius = baseRadius + link.width/2 + radiusOffset
            link.circularPathData.rightLargeArcRadius = baseRadius + link.width/2 + i * circularLinkGap + radiusOffset
          }
          radiusOffset = radiusOffset + l.width
        })

        // all links
        link.circularPathData.leftInnerExtent = link.circularPathData.sourceX + link.circularPathData.leftNodeBuffer
        link.circularPathData.rightInnerExtent = link.circularPathData.targetX - link.circularPathData.rightNodeBuffer
        link.circularPathData.leftFullExtent = link.circularPathData.sourceX + link.circularPathData.leftLargeArcRadius + link.circularPathData.leftNodeBuffer
        link.circularPathData.rightFullExtent = link.circularPathData.targetX - link.circularPathData.rightLargeArcRadius - link.circularPathData.rightNodeBuffer

        // bottom links
        if (link.circularLinkType == 'bottom') {
          link.circularPathData.verticalFullExtent = height + verticalMargin + link.circularPathData.verticalBuffer
          link.circularPathData.verticalLeftInnerExtent = link.circularPathData.verticalFullExtent - link.circularPathData.leftLargeArcRadius
          link.circularPathData.verticalRightInnerExtent = link.circularPathData.verticalFullExtent - link.circularPathData.rightLargeArcRadius
        } else {
          // top links
          link.circularPathData.verticalFullExtent = minY - verticalMargin - link.circularPathData.verticalBuffer
          link.circularPathData.verticalLeftInnerExtent = link.circularPathData.verticalFullExtent + link.circularPathData.leftLargeArcRadius
          link.circularPathData.verticalRightInnerExtent = link.circularPathData.verticalFullExtent + link.circularPathData.rightLargeArcRadius
        }

        link.circularPathData.path = createCircularPathString(link)
      }
    })

  }

  // create a d path using the addCircularPathData
  function createCircularPathString (link) {
    let pathString = ''
    let pathData = {}

    if (link.circularLinkType == 'top') {
      pathString =
        // start at the right of the source node
        'M' +
        link.circularPathData.sourceX +
        ' ' +
        link.circularPathData.sourceY +
        ' ' +
        // line right to buffer point
        'L' +
        link.circularPathData.leftInnerExtent +
        ' ' +
        link.circularPathData.sourceY +
        ' ' +
        // Arc around: Centre of arc X and  //Centre of arc Y
        'A' +
        link.circularPathData.leftLargeArcRadius +
        ' ' +
        link.circularPathData.leftSmallArcRadius +
        ' 0 0 0 ' +
        // End of arc X //End of arc Y
        link.circularPathData.leftFullExtent +
        ' ' +
        (link.circularPathData.sourceY -
          link.circularPathData.leftSmallArcRadius) +
        ' ' + // End of arc X
        // line up to buffer point
        'L' +
        link.circularPathData.leftFullExtent +
        ' ' +
        link.circularPathData.verticalLeftInnerExtent +
        ' ' +
        // Arc around: Centre of arc X and  //Centre of arc Y
        'A' +
        link.circularPathData.leftLargeArcRadius +
        ' ' +
        link.circularPathData.leftLargeArcRadius +
        ' 0 0 0 ' +
        // End of arc X //End of arc Y
        link.circularPathData.leftInnerExtent +
        ' ' +
        link.circularPathData.verticalFullExtent +
        ' ' + // End of arc X
        // line left to buffer point
        'L' +
        link.circularPathData.rightInnerExtent +
        ' ' +
        link.circularPathData.verticalFullExtent +
        ' ' +
        // Arc around: Centre of arc X and  //Centre of arc Y
        'A' +
        link.circularPathData.rightLargeArcRadius +
        ' ' +
        link.circularPathData.rightLargeArcRadius +
        ' 0 0 0 ' +
        // End of arc X //End of arc Y
        link.circularPathData.rightFullExtent +
        ' ' +
        link.circularPathData.verticalRightInnerExtent +
        ' ' + // End of arc X
        // line down
        'L' +
        link.circularPathData.rightFullExtent +
        ' ' +
        (link.circularPathData.targetY -
          link.circularPathData.rightSmallArcRadius) +
        ' ' +
        // Arc around: Centre of arc X and  //Centre of arc Y
        'A' +
        link.circularPathData.rightLargeArcRadius +
        ' ' +
        link.circularPathData.rightSmallArcRadius +
        ' 0 0 0 ' +
        // End of arc X //End of arc Y
        link.circularPathData.rightInnerExtent +
        ' ' +
        link.circularPathData.targetY +
        ' ' + // End of arc X
        // line to end
        'L' +
        link.circularPathData.targetX +
        ' ' +
        link.circularPathData.targetY
    } else {
      // bottom path
      pathString =
        // start at the right of the source node
        'M' +
        link.circularPathData.sourceX +
        ' ' +
        link.circularPathData.sourceY +
        ' ' +
        // line right to buffer point
        'L' +
        link.circularPathData.leftInnerExtent +
        ' ' +
        link.circularPathData.sourceY +
        ' ' +
        // Arc around: Centre of arc X and  //Centre of arc Y
        'A' +
        link.circularPathData.leftLargeArcRadius +
        ' ' +
        link.circularPathData.leftSmallArcRadius +
        ' 0 0 1 ' +
        // End of arc X //End of arc Y
        link.circularPathData.leftFullExtent +
        ' ' +
        (link.circularPathData.sourceY +
          link.circularPathData.leftSmallArcRadius) +
        ' ' + // End of arc X
        // line down to buffer point
        'L' +
        link.circularPathData.leftFullExtent +
        ' ' +
        link.circularPathData.verticalLeftInnerExtent +
        ' ' +
        // Arc around: Centre of arc X and  //Centre of arc Y
        'A' +
        link.circularPathData.leftLargeArcRadius +
        ' ' +
        link.circularPathData.leftLargeArcRadius +
        ' 0 0 1 ' +
        // End of arc X //End of arc Y
        link.circularPathData.leftInnerExtent +
        ' ' +
        link.circularPathData.verticalFullExtent +
        ' ' + // End of arc X
        // line left to buffer point
        'L' +
        link.circularPathData.rightInnerExtent +
        ' ' +
        link.circularPathData.verticalFullExtent +
        ' ' +
        // Arc around: Centre of arc X and  //Centre of arc Y
        'A' +
        link.circularPathData.rightLargeArcRadius +
        ' ' +
        link.circularPathData.rightLargeArcRadius +
        ' 0 0 1 ' +
        // End of arc X //End of arc Y
        link.circularPathData.rightFullExtent +
        ' ' +
        link.circularPathData.verticalRightInnerExtent +
        ' ' + // End of arc X
        // line up
        'L' +
        link.circularPathData.rightFullExtent +
        ' ' +
        (link.circularPathData.targetY +
          link.circularPathData.rightSmallArcRadius) +
        ' ' +
        // Arc around: Centre of arc X and  //Centre of arc Y
        'A' +
        link.circularPathData.rightLargeArcRadius +
        ' ' +
        link.circularPathData.rightSmallArcRadius +
        ' 0 0 1 ' +
        // End of arc X //End of arc Y
        link.circularPathData.rightInnerExtent +
        ' ' +
        link.circularPathData.targetY +
        ' ' + // End of arc X
        // line to end
        'L' +
        link.circularPathData.targetX +
        ' ' +
        link.circularPathData.targetY
    }

    return pathString
  }

  // sort links based on the distance between the source and tartget node depths
  // if the same, then use Y position of the source node
  function sortLinkDepthAscending (link1, link2) {
    if (linkDepthDistance(link1) == linkDepthDistance(link2)) {
      return link1.circularLinkType == 'bottom'
        ? sortLinkSourceYDescending(link1, link2)
        : sortLinkSourceYAscending(link1, link2)
    } else {
      // return linkDepthDistance(link1) - linkDepthDistance(link2);
      return linkDepthDistance(link2) - linkDepthDistance(link1)
    }
  }

  function sortLinkSourceYAscending (link1, link2) {
    return link1.y0 - link2.y0
  }

  function sortLinkSourceYDescending (link1, link2) {
    return link2.y0 - link1.y0
  }

  function sortLinkTargetYAscending (link1, link2) {
    return link1.y1 - link2.y1
  }

  function sortLinkTargetYDescending (link1, link2) {
    return link2.y1 - link1.y1
  }

  // return the distance between the link's target and source node, in terms of the nodes' depth
  function linkDepthDistance (link) {
    return link.target.depth - link.source.depth
  }

  // return the distance between the link's target and source node, in terms of the nodes' X coordinate
  function linkXLength (link) {
    return link.target.x0 - link.source.x1
  }

  function linkPerpendicularYToLinkSource (longerLink, shorterLink) {
    // Return the Y coordinate on the longerLink path * which is perpendicular shorterLink's source.
    // * approx, based on a straight line from target to source, when in fact the path is a bezier

    // get the angle for the longer link
    let angle = linkAngle(longerLink)

    // get the adjacent length to the other link's x position
    let heightFromY1ToPependicular = linkXLength(shorterLink) / Math.tan(angle)

    // add or subtract from longer link1's original y1, depending on the slope
    let yPerpendicular = incline(longerLink) == 'up'
      ? longerLink.y1 + heightFromY1ToPependicular
      : longerLink.y1 - heightFromY1ToPependicular

    return yPerpendicular
  }

  function linkPerpendicularYToLinkTarget (longerLink, shorterLink) {
    // Return the Y coordinate on the longerLink path * which is perpendicular shorterLink's source.
    // * approx, based on a straight line from target to source, when in fact the path is a bezier

    // get the angle for the longer link
    let angle = linkAngle(longerLink)

    // get the adjacent length to the other link's x position
    let heightFromY1ToPependicular = linkXLength(shorterLink) / Math.tan(angle)

    // add or subtract from longer link's original y1, depending on the slope
    let yPerpendicular = incline(longerLink) == 'up'
      ? longerLink.y1 - heightFromY1ToPependicular
      : longerLink.y1 + heightFromY1ToPependicular

    return yPerpendicular
  }

  function resolveNodeLinkOverlaps (graph) {
    graph.links.forEach(function (link) {
      if (link.circular) {
        return
      }

      if (link.target.depth - link.source.depth > 1) {
        let depthToTest = link.source.depth + 1
        let maxDepthToTest = link.target.depth - 1

        let i = 1
        let numberOfDepthsToTest = maxDepthToTest - depthToTest + 1

        for (
          depthToTest, (i = 1);
          depthToTest <= maxDepthToTest;
          depthToTest++, i++
        ) {

          graph.nodes.forEach(function (node) {
            if (node.depth == depthToTest) {

              let t = i / (numberOfDepthsToTest + 1)

              // Find all the points of a cubic bezier curve in javascript
              // https://stackoverflow.com/questions/15397596/find-all-the-points-of-a-cubic-bezier-curve-in-javascript

              let B0_t = Math.pow(1 - t, 3)
              let B1_t = 3 * t * Math.pow(1 - t, 2)
              let B2_t = 3 * Math.pow(t, 2) * (1 - t)
              let B3_t = Math.pow(t, 3)

              let py_t =
                B0_t * link.y0 +
                B1_t * link.y0 +
                B2_t * link.y1 +
                B3_t * link.y1

              let linkY0AtDepth = py_t - link.width / 2
              let linkY1AtDepth = py_t + link.width / 2

              // If top of link overlaps node, push node up
              if (linkY0AtDepth > node.y0 && linkY0AtDepth < node.y1) {
                // console.log("OVERLAP!")

                let dy = -(node.y1 - linkY0AtDepth + 10)

                node = adjustNodeHeight(node, dy);

                //check if other nodes need to move up too
                graph.nodes.forEach(function(otherNode) {
                  
                  //don't need to check itself or nodes at different depths
                  if ((otherNode.name == node.name) || (otherNode.depth != node.depth)) { return }
                  if (nodesOverlap(node, otherNode)) {

                    adjustNodeHeight(otherNode, dy)

                  }
                  
                })

              } else if (linkY1AtDepth > node.y0 && linkY1AtDepth < node.y1) {
                // If bottom of link overlaps node, push node down
                let dy = linkY1AtDepth - node.y0 + 10

                node = adjustNodeHeight(node, dy);

                //check if other nodes need to move down too
                graph.nodes.forEach(function(otherNode) {
                  
                  //don't need to check itself or nodes at different depths
                  if ((otherNode.name == node.name) || (otherNode.depth != node.depth)) { return }
                  if (otherNode.y0 < node.y1 && otherNode.y1 > node.y1) {

                    adjustNodeHeight(otherNode, dy)

                  }
                  
                })

              } else if (linkY0AtDepth < node.y0 && linkY1AtDepth > node.y1) {
                // if link completely overlaps node
                let dy = linkY1AtDepth - node.y0 + 10

                node = adjustNodeHeight(node, dy);

                graph.nodes.forEach(function(otherNode) {
                  
                  //don't need to check itself or nodes at different depths
                  if ((otherNode.name == node.name) || (otherNode.depth != node.depth)) { return }
                  if (otherNode.y0 < node.y1 && otherNode.y1 > node.y1) {

                    adjustNodeHeight(otherNode, dy)

                  }
                  
                })

              }

            }
          })
        }
      }
    })
  }

  function nodesOverlap(nodeA, nodeB) {

    //test if nodeA top partially overlaps nodeB
    if (nodeA.y0 > nodeB.y0 && nodeA.y0 < nodeB.y1) {
      return true
    }
    //test if nodeA bottom partially overlaps nodeB
    else if (nodeA.y1 > nodeB.y0 && nodeA.y1 < nodeB.y1) {
      return true
    }
    //test if nodeA covers nodeB
    else if (nodeA.y0 < nodeB.y0 && nodeA.y1 > nodeB.y1) {
      return true
    }
    else {
      return false;
    } 

  }


  function adjustNodeHeight (node, dy) {

    node.y0 = node.y0 + dy
    node.y1 = node.y1 + dy

    node.targetLinks.forEach(function (l) {
      l.y1 = l.y1 + dy
    })

    node.sourceLinks.forEach(function (l) {
      l.y0 = l.y0 + dy
    })

    return node;

  }

  function sortSourceLinks (graph) {

    graph.nodes.forEach(function (node) {
      // move any nodes up which are off the bottom
      if (node.y + (node.y1 - node.y0) > height) {
        node.y = node.y - (node.y + (node.y1 - node.y0) - height)
      }

      let nodesSourceLinks = graph.links.filter(function (l) {
        return l.source.name == node.name
      })

      // if more than 1 link then sort
      if (nodesSourceLinks.length > 1) {
        nodesSourceLinks.sort(function (link1, link2) {
          // if both are not circular...
          if (!link1.circular && !link2.circular) {
            // if the target nodes are the same depth, then sort by the link's target y
            if (link1.target.depth == link2.target.depth) {
              return link1.y1 - link2.y1
            } else if (!sameInclines(link1, link2)) {
              // if the links slope in different directions, then sort by the link's target y
              return link1.y1 - link2.y1

              // if the links slope in same directions, then sort by any overlap
            } else {
              if (link1.target.depth > link2.target.depth) {
                // if (node.name == "process10") {console.log("here")}
                /* let link2Angle = linkAngleFromSource(link2);
                    let link2AdjToLink1Y = linkXLength(link1) / Math.tan(link2Angle);
                    let link2Adj = incline(link2) == "up"
                      ? link2.y0 - link2AdjToLink1Y
                      : link2.y0 + link2AdjToLink1Y; */

                let link2Adj = linkPerpendicularYToLinkTarget(link2, link1)

                return link1.y1 - link2Adj
              }
              if (link2.target.depth > link1.target.depth) {
                /* let link1Angle = linkAngleFromSource(link1);
                    let link1AdjToLink2Y = linkXLength(link2) / Math.tan(link1Angle);
                    let link1Adj = incline(link1) == "up"
                      ? link1.y0 - link1AdjToLink2Y
                      : link1.y0 + link1AdjToLink2Y; */

                let link1Adj = linkPerpendicularYToLinkTarget(link1, link2)

                return link1Adj - link2.y1
              }
            }
          }

          // if only one is circular, the move top links up, or bottom links down
          if (link1.circular && !link2.circular) {
            return link1.circularLinkType == 'top' ? -1 : 1
          } else if (link2.circular && !link1.circular) {
            return link2.circularLinkType == 'top' ? 1 : -1
          }

          // if both links are circular...
          if (link1.circular && link2.circular) {
            // ...and they both loop the same way (both top)
            if (
              link1.circularLinkType === link2.circularLinkType &&
              link1.circularLinkType == 'top'
            ) {
              // ...and they both connect to a target with same depth, then sort by the target's y
              if (link1.target.depth === link2.target.depth) {
                return link1.target.y1 - link2.target.y1
              } else {
                // ...and they connect to different depth targets, then sort by how far back they
                return link2.target.depth - link1.target.depth
              }
            } else if (
              link1.circularLinkType === link2.circularLinkType &&
              link1.circularLinkType == 'bottom'
            ) {
              // ...and they both loop the same way (both bottom)
              // ...and they both connect to a target with same depth, then sort by the target's y
              if (link1.target.depth === link2.target.depth) {
                return link2.target.y1 - link1.target.y1
              } else {
                // ...and they connect to different depth targets, then sort by how far back they
                return link1.target.depth - link2.target.depth
              }
            } else {
              // ...and they loop around different ways, the move top up and bottom down
              return link1.circularLinkType == 'top' ? -1 : 1
            }
          }
        })
      }

      // update y0 for links
      let ySourceOffset = node.y0

      nodesSourceLinks.forEach(function (link) {
        link.y0 = ySourceOffset + link.width / 2
        ySourceOffset = ySourceOffset + link.width
      })
    })
  }

  function sortTargetLinks (graph) {

    graph.nodes.forEach(function (node) {
      let nodesTargetLinks = graph.links.filter(function (l) {
        return l.target.name == node.name
      })

      if (nodesTargetLinks.length > 1) {
        nodesTargetLinks.sort(function (link1, link2) {
          // if both are not circular, the base on the source y position
          if (!link1.circular && !link2.circular) {
            if (link1.source.depth == link2.source.depth) {
              return link1.y0 - link2.y0
            } else if (!sameInclines(link1, link2)) {
              return link1.y0 - link2.y0
            } else {
              // get the angle of the link to the further source node (ie the smaller depth)
              if (link2.source.depth < link1.source.depth) {
                let link2Adj = linkPerpendicularYToLinkSource(link2, link1)

                return link1.y0 - link2Adj
              }
              if (link1.source.depth < link2.source.depth) {
                let link1Adj = linkPerpendicularYToLinkSource(link1, link2)

                return link1Adj - link2.y0
              }
            }
          }

          // if only one is circular, the move top links up, or bottom links down
          if (link1.circular && !link2.circular) {
            return link1.circularLinkType == 'top' ? -1 : 1
          } else if (link2.circular && !link1.circular) {
            return link2.circularLinkType == 'top' ? 1 : -1
          }

          // if both links are circular...
          if (link1.circular && link2.circular) {
            // ...and they both loop the same way (both top)
            if (
              link1.circularLinkType === link2.circularLinkType &&
              link1.circularLinkType == 'top'
            ) {
              // ...and they both connect to a target with same depth, then sort by the target's y
              if (link1.source.depth === link2.source.depth) {
                return link1.source.y1 - link2.source.y1
              } else {
                // ...and they connect to different depth targets, then sort by how far back they
                return link1.source.depth - link2.source.depth
              }
            } else if (
              link1.circularLinkType === link2.circularLinkType &&
              link1.circularLinkType == 'bottom'
            ) {
              // ...and they both loop the same way (both bottom)
              // ...and they both connect to a target with same depth, then sort by the target's y
              if (link1.source.depth === link2.source.depth) {
                return link1.source.y1 - link2.source.y1
              } else {
                // ...and they connect to different depth targets, then sort by how far back they
                return link2.source.depth - link1.source.depth
              }
            } else {
              // ...and they loop around different ways, the move top up and bottom down
              return link1.circularLinkType == 'top' ? -1 : 1
            }
          }
        })
      }

      // update y1 for links
      let yTargetOffset = node.y0

      nodesTargetLinks.forEach(function (link) {
        link.y1 = yTargetOffset + link.width / 2
        yTargetOffset = yTargetOffset + link.width
      })
    })
  }

  function sameInclines (link1, link2) {
    return incline(link1) == incline(link2)
  }

  function incline (link) {
    // positive => slopes up from source to target
    // negative => slopes down from source to target
    return link.y0 - link.y1 > 0 ? 'up' : 'down'
  }

 ///////////////////////////////////////////////////////////////////////////////

  exports.sankey = sankey
  exports.sankeyCenter = center
  exports.sankeyLeft = left
  exports.sankeyRight = right
  exports.sankeyJustify = justify
  //exports.sankeyPath = sankeyPath
  // exports.sankeyLinkHorizontal = sankeyLinkHorizontal
  // exports.curveSankeyForceLink = curveSankeyForceLink

  Object.defineProperty(exports, '__esModule', { value: true })
})

var sankeyPath = function(link) {
  let path = ''
  if (link.circular) {
    path = link.circularPathData.path
  } else {
    var normalPath = d3.linkHorizontal()
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


function appendArrows(selection, arrowLength, gapLength, arrowHeadSize) {
  
        //let arrowLength = 20;
        //let gapLength = 300;

        let totalDashArrayLength = arrowLength + gapLength;
  
        arrows = selection.append("path")
          .attr("d", sankeyPath)
          .style("stroke-width", 1)
          .style("stroke", "black")
          .style("stroke-dasharray", arrowLength + "," + gapLength)
  
        arrows.each(function (arrow) {
  
          let thisPath = d3.select(this).node();
          let parentG = d3.select(this.parentNode)
          let pathLength = thisPath.getTotalLength();
          let numberOfArrows = Math.ceil(pathLength / totalDashArrayLength);
  
          //remove the last arrow head if it will overlap the target node
          //+4 to take into account arrow head size
          if ((((numberOfArrows - 1) * totalDashArrayLength) + (arrowLength + 5)) > pathLength) {
            numberOfArrows = numberOfArrows - 1;
          }
  
          let arrowHeadData = d3.range(numberOfArrows).map(function (d, i) {
            let length = (i * totalDashArrayLength) + arrowLength;
  
            let point = thisPath.getPointAtLength(length);
            let previousPoint = thisPath.getPointAtLength(length - 2);
  
            let rotation = 0;
  
            if (point.y == previousPoint.y) {
              rotation = (point.x < previousPoint.x) ? 180 : 0;
            }
            else if (point.x == previousPoint.x) {
              rotation = (point.y < previousPoint.y) ? -90 : 90;
            }
            else {
              let adj = Math.abs(point.x - previousPoint.x);
              let opp = Math.abs(point.y - previousPoint.y);
              let angle = Math.atan(opp / adj) * (180 / Math.PI);
              if (point.x < previousPoint.x) {
                angle = angle + ((90 - angle) * 2)
              }
              if (point.y < previousPoint.y) {
                rotation = -angle;
              }
              else {
                rotation = angle;
              }
            };
  
            return { x: point.x, y: point.y, rotation: rotation };
  
          });
  
          let arrowHeads = parentG.selectAll(".arrow-heads")
            .data(arrowHeadData)
            .enter()
            .append("path")
            .attr("d", function (d) {
              return "M" + (d.x) + "," + (d.y - (arrowHeadSize/2)) + " "
                + "L" + (d.x + arrowHeadSize) + "," + (d.y) + " "
                + "L" + d.x + "," + (d.y + (arrowHeadSize/2));
            })
            .attr("class", "arrow-head")
            .attr("transform", function (d) {
              return "rotate(" + d.rotation + "," + d.x + "," + d.y + ")";
  
            })
            .style("fill", "black")
  
        });
  
      }
