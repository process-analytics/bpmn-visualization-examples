import { createPoolFilterOnLoad } from "./PoolFilterOnLoad";

export default  {
  title: 'Example/DisplayBpmnDiagram',
  tags: ['autodocs'],
};

export const PoolFilterOnLoad = {
  render: () =>  createPoolFilterOnLoad(),
};

