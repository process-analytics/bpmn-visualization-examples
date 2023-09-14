import { createLoadLocalBpmnDiagram } from "./LoadLocalBpmnDiagram";

export default  {
  title: 'Example/DisplayBpmnDiagram',
  tags: ['autodocs'],
};

export const LoadLocal = {
  render: () =>  createLoadLocalBpmnDiagram(),
};

