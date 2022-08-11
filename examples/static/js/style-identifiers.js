// Define substitutes for mxGraph mxConstants as they are not available here.
// Use the same property names as in mxConstants for easy substitution: see https://jgraph.github.io/mxgraph/docs/js-api/files/util/mxConstants-js.html#mxConstants

const StyleIdentifiers = {
  STYLE_FILLCOLOR: 'fillColor',
  STYLE_STROKECOLOR: 'strokeColor',

  STYLE_GRADIENT_DIRECTION: 'gradientDirection',
  STYLE_GRADIENTCOLOR: 'gradientColor',

  STYLE_FONTCOLOR: 'fontColor',
  STYLE_FONTFAMILY: 'fontFamily',
  STYLE_FONTSIZE: 'fontSize',
  STYLE_FONTSTYLE: 'fontStyle',

  STYLE_SWIMLANE_FILLCOLOR: 'swimlaneFillColor',
}

const Directions = {
  DIRECTION_EAST: 'east',
  DIRECTION_SOUTH: 'south',
  DIRECTION_WEST: 'west',
}

const FontStyle = {
  FONT_BOLD: 1,
  FONT_ITALIC: 2,
}
