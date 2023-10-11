import { createCustomDefaultFontColor } from "./CustomDefaultFontColor";
import { createDefaultColor} from "./DefaultColor";
import { createCustomDefaultStrokeAndFillColor } from "./CustomDefaultStrokeAndFillColor";
import {createCustomColorForUserTask} from "./CustomColorForUserTask";
import {createCustomColorForBPMNEvents} from "./CustomColorForBPMNEvents";
import {createCustomColorForBPMNKind} from "./CustomColorForBPMNKind";
import {createCustomColorForBPMNKindAndSpecificElement} from "./CustomColorForBPMNKindAndSpecificElement";

export default  {
  title: 'Example/Custom BPMN Theme/Custom Color',
  tags: ['autodocs'],
};

export const DefaultColor = {
  render: () =>  createDefaultColor(),
};

export const CustomDefaultFontColor = {
  render: () =>  createCustomDefaultFontColor(),
};

export const CustomDefaultStrokeAndFillColor = {
  render: () =>  createCustomDefaultStrokeAndFillColor(),
};
export const CustomColorForUserTask = {
  render: () =>  createCustomColorForUserTask(),

  /* Only define a custom style for User Task.*/
};
export const CustomColorForBPMNEvents = {
  render: () =>  createCustomColorForBPMNEvents(),

  /* Define custom style depending on the kind of the Events.*/
};
export const CustomColorForBPMNKind = {
  render: () =>  createCustomColorForBPMNKind(),

  /*  Define custom style for Events, Gateways, Pools and Tasks.<br>
      It applies to all types, for instance all kinds of Events have a custom style (start, catch, throw, boundary or end).*/
};
export const CustomColorForBPMNKindAndSpecificElement = {
  render: () =>  createCustomColorForBPMNKindAndSpecificElement(),

  /*  Define general style Gateways, Pools and Tasks.<br>
      Define a specific styles depending on the kind of the Event.*/
};