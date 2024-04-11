import { Status } from "./../../createTaskForm/enums/Status";

export type TaskCounterStatusType =
  | Status.todo
  | Status.inProgress
  | Status.completed;

export interface ITaskCOunter {
  count?: number;
  status?: TaskCounterStatusType;
}
