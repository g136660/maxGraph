/**
 * Copyright (c) 2006-2013, JGraph Ltd
 * Converted to ES9 syntax/React by David Morrissey 2021
 */

import React from 'react';
import mxGraph from '../../mxgraph/view/graph/mxGraph';
import mxConstants from '../../mxgraph/util/mxConstants';
import mxEdgeStyle from '../../mxgraph/util/datatypes/style/mxEdgeStyle';
import mxLayoutManager from '../../mxgraph/view/graph/mxLayoutManager';
import mxStackLayout from '../../mxgraph/layout/mxStackLayout';

class Folding extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // A container for the graph
    return (
      <>
        <h1>Folding</h1>
        This example demonstrates using a layout to implement a nested group
        structure.
        <div
          ref={el => {
            this.el = el;
          }}
          style={{
            position: 'relative',
            overflow: 'hidden',
            height: '241px',
            background: "url('editors/images/grid.gif')",
            cursor: 'default',
          }}
        />
      </>
    );
  };

  componentDidMount() {
    // Enables crisp rendering of rectangles in SVG
    mxConstants.ENTITY_SEGMENT = 20;

    // Creates the graph inside the given container
    const graph = new mxGraph(this.el);
    graph.setDropEnabled(true);

    // Disables global features
    graph.collapseToPreferredSize = false;
    graph.constrainChildren = false;
    graph.cellsSelectable = false;
    graph.extendParentsOnAdd = false;
    graph.extendParents = false;
    graph.border = 10;

    // Sets global styles
    let style = graph.getStylesheet().getDefaultEdgeStyle();
    style[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
    style[mxConstants.STYLE_ROUNDED] = true;

    style = graph.getStylesheet().getDefaultVertexStyle();
    style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
    style[mxConstants.STYLE_SHAPE] = 'swimlane';
    style[mxConstants.STYLE_STARTSIZE] = 30;

    style = [];
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
    style[mxConstants.STYLE_STROKECOLOR] = 'none';
    style[mxConstants.STYLE_FILLCOLOR] = 'none';
    style[mxConstants.STYLE_FOLDABLE] = false;
    graph.getStylesheet().putCellStyle('column', style);

    // Installs auto layout for all levels
    const layout = new mxStackLayout(graph, true);
    layout.border = graph.border;
    const layoutMgr = new mxLayoutManager(graph);
    layoutMgr.getLayout = function(cell) {
      if (!cell.collapsed) {
        if (cell.parent !== graph.model.root) {
          layout.resizeParent = true;
          layout.horizontal = false;
          layout.spacing = 10;
        } else {
          layout.resizeParent = true;
          layout.horizontal = true;
          layout.spacing = 40;
        }

        return layout;
      }

      return null;
    };

    // Resizes the container
    graph.setResizeContainer(true);

    // Gets the default parent for inserting new cells. This
    // is normally the first child of the root (ie. layer 0).
    const parent = graph.getDefaultParent();

    // Adds cells to the model in a single step
    graph.getModel().beginUpdate();
    try {
      const col1 = graph.insertVertex(parent, null, '', 0, 0, 120, 0, 'column');

      const v1 = graph.insertVertex(col1, null, '1', 0, 0, 100, 30);
      v1.collapsed = true;

      const v11 = graph.insertVertex(v1, null, '1.1', 0, 0, 80, 30);
      v11.collapsed = true;

      const v111 = graph.insertVertex(v11, null, '1.1.1', 0, 0, 60, 30);
      const v112 = graph.insertVertex(v11, null, '1.1.2', 0, 0, 60, 30);

      const v12 = graph.insertVertex(v1, null, '1.2', 0, 0, 80, 30);

      const col2 = graph.insertVertex(parent, null, '', 0, 0, 120, 0, 'column');

      const v2 = graph.insertVertex(col2, null, '2', 0, 0, 100, 30);
      v2.collapsed = true;

      const v21 = graph.insertVertex(v2, null, '2.1', 0, 0, 80, 30);
      v21.collapsed = true;

      const v211 = graph.insertVertex(v21, null, '2.1.1', 0, 0, 60, 30);
      const v212 = graph.insertVertex(v21, null, '2.1.2', 0, 0, 60, 30);

      const v22 = graph.insertVertex(v2, null, '2.2', 0, 0, 80, 30);

      const v3 = graph.insertVertex(col2, null, '3', 0, 0, 100, 30);
      v3.collapsed = true;

      const v31 = graph.insertVertex(v3, null, '3.1', 0, 0, 80, 30);
      v31.collapsed = true;

      const v311 = graph.insertVertex(v31, null, '3.1.1', 0, 0, 60, 30);
      const v312 = graph.insertVertex(v31, null, '3.1.2', 0, 0, 60, 30);

      const v32 = graph.insertVertex(v3, null, '3.2', 0, 0, 80, 30);

      graph.insertEdge(parent, null, '', v111, v211);
      graph.insertEdge(parent, null, '', v112, v212);
      graph.insertEdge(parent, null, '', v112, v22);

      graph.insertEdge(parent, null, '', v12, v311);
      graph.insertEdge(parent, null, '', v12, v312);
      graph.insertEdge(parent, null, '', v12, v32);
    } finally {
      // Updates the display
      graph.getModel().endUpdate();
    }
  };
}

export default Folding;
