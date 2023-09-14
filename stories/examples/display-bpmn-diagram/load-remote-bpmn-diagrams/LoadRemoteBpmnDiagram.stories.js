import { createLoadRemoteBpmnDiagram } from "./LoadRemoteBpmnDiagram";

export default  {
  title: 'Example/DisplayBpmnDiagram',
  tags: ['autodocs'],
};

export const LoadRemote = {
  render: () =>  createLoadRemoteBpmnDiagram(),
};

