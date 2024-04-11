import { TaskCounterStatusType } from "../interfaces/ITaskCounter";
import { Status } from "../../createTaskForm/enums/Status";

// export const emitCorrectBorderColor = (status: TaskCounterStatusType):string=> {
export const emitCorrectBorderColor = (status: TaskCounterStatusType) => {
  switch (status) {
    case Status.todo:
      return "error.light";
    case Status.inProgress:
      return "warning.light";
    case Status.completed:
      return "success.light";

    default:
      break;
  }
};
