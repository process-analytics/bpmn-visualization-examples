import { SetRequired } from "type-fest";
import { FitType } from "bpmn-visualization";

export type ActionType = 'fetch' | 'fit' | 'load';

interface GenericActionStatus<Type extends ActionType, SubType> {
  type: Type;
  subType?: SubType;
  status: 'in-progress' | 'done';
  id: number;
  duration?: number;
}

type ActionStatusWithRequiredSubType<Type extends ActionType, SubType> = SetRequired<GenericActionStatus<Type, SubType>, 'subType'>;

type FitActionStatus = ActionStatusWithRequiredSubType<'fit', FitType>;

type LoadActionStatus = GenericActionStatus<'load', undefined>;

type FetchActionStatus = ActionStatusWithRequiredSubType<'fetch', 'diagram'>;

export type ActionStatus =
  | FetchActionStatus
  | FitActionStatus
  | LoadActionStatus;
