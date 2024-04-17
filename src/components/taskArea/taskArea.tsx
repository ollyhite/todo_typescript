import { Box, Grid, Alert, LinearProgress } from "@mui/material";
import React, { FC, ReactElement } from "react";
import { format } from "date-fns";
import { TaskCounter } from "../taskCounter/taskCounter";
import { Task } from "../task/task";
import { useQuery, useMutation } from "@tanstack/react-query";
import { sendApiRequest } from "../../helpers/sendApiRequest";
import { ITaskApi } from "./interfaces/ITaskApi";
import { Status } from "../createTaskForm/enums/Status";
import { IUpdateTask } from "../createTaskForm/interfaces/IUpdateTask";
import { countTask } from "./helpers/countTasks";

export const TaskArea: FC = (): ReactElement => {
  const { error, isLoading, data, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      return await sendApiRequest<ITaskApi[]>(
        "http://localhost:3200/tasks",
        "GET"
      );
    },
  });

  //update task useMutation
  const updateTaskMutation = useMutation((data: IUpdateTask) =>
    sendApiRequest("http://localhost:3200/tasks", "PUT", data)
  );

  function onStatusChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    updateTaskMutation.mutate({
      id,
      status: e.target.checked ? Status.inProgress : Status.todo,
    });
  }

  function markCompleteHandler(
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) {
    updateTaskMutation.mutate({
      id,
      status: Status.completed,
    });
  }
  //   console.log("data", data);

  return (
    <Grid item md={8} px={4}>
      <Box mb={8} px={4}>
        <h2>Status Of Your Tasks As On {format(new Date(), "PPPP")}</h2>
      </Box>
      <Grid container display="flex" justifyContent="center">
        <Grid
          item
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          md={10}
          xs={12}
          mb={8}
        >
          <TaskCounter
            status={Status.todo}
            count={data ? countTask(data, Status.todo) : undefined}
          />
          <TaskCounter
            status={Status.inProgress}
            count={data ? countTask(data, Status.inProgress) : undefined}
          />
          <TaskCounter
            status={Status.completed}
            count={data ? countTask(data, Status.completed) : undefined}
          />
        </Grid>
        <Grid item display="flex" flexDirection="column" xs={10} md={8}>
          <>
            {error && (
              <Alert severity="error">
                There was an error fetching your tasks
              </Alert>
            )}

            {!error && data && data.length === 0 && (
              <Alert severity="warning">
                You don't have any tasks created yet. Start by creating some
                tasks
              </Alert>
            )}

            {isLoading ? (
              <LinearProgress />
            ) : (
              Array.isArray(data) &&
              data.length > 0 &&
              data.map((task) => {
                return task.status === Status.todo ||
                  task.status === Status.inProgress ? (
                  <Task
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    date={new Date(task.date)}
                    priority={task.priority}
                    status={task.status}
                    onStatusChange={onStatusChangeHandler}
                    onClick={markCompleteHandler}
                  />
                ) : (
                  false
                );
              })
            )}
          </>
        </Grid>
      </Grid>
    </Grid>
  );
};
