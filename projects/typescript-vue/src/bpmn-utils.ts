import { ShapeBpmnElementKind } from 'bpmn-visualization';

export const isBpmnArtifact = (kind: ShapeBpmnElementKind): boolean => {
  // may be directly available in bpmn-visualization in the future
  return kind === ShapeBpmnElementKind.GROUP || kind === ShapeBpmnElementKind.TEXT_ANNOTATION ;
};
