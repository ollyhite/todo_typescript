import { TaskCounterStatusType } from "../interfaces/ITaskCounter";
import { Status } from "../../createTaskForm/enums/Status";

// export const emitCorrectLabel = (status: TaskCounterStatusType): string => {
export const emitCorrectLabel = (status: TaskCounterStatusType) => {
  switch (status) {
    case Status.todo:
      return "Todo's";
    case Status.inProgress:
      return "In Progress";
    case Status.completed:
      return "Completed";
    default:
      break;
  }
};
