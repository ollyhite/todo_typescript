import { Priority } from "../../createTaskForm/enums/Priority";

// export const renderPriorityBorderColor = (priority: string): string => {
export const renderPriorityBorderColor = (priority: string) => {
  switch (priority) {
    case Priority.low:
      return "grey.400";
    case Priority.normal:
      return "info.light";
    case Priority.high:
      return "error.light";
    default:
      return "grey.400";
  }
};
