import * as React from "react";
import { ThemeProvider } from "styled-components";
import { Reboot } from 'styled-reboot';
import { v4 as uuidv4 } from 'uuid';

import { Task, STATUS, TASK_DETAILS_EDITOR_STATE } from "./typings/global";
import { theme } from "./ui/theme/default";
import Board from "./components/Board";
import TaskDetails from "./components/TaskEditor";

// @TODO this is mock, remove when done
const initialTasksData = [
  {
    id: uuidv4(),
    title: "Task #1 Title",
    description: "Task #1 Description",
    status: STATUS.TODO,
    owner: "Task #1 owner",
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: "Task #2 Title",
    description: "Task #2 Description",
    status: STATUS.TODO,
    owner: "Task #2 owner",
    createdAt: new Date(),
  },
];

export const TasksContext = React.createContext({
  tasks: [] as Task[],
  setTasks: (tasks: Task[]) => { },
});

const initialTaskEditor = {
  state: TASK_DETAILS_EDITOR_STATE.HIDDEN,
  taskId: "",
}

export const TaskEditorContext = React.createContext({
  taskEditor: initialTaskEditor,
  setTaskEditor: (x?: any) => { }, // @TODO edit type
});

const App = (): React.ReactElement => {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasksData);
  const [taskEditor, setTaskEditor] =
    React.useState<{ state: TASK_DETAILS_EDITOR_STATE, taskId: string }>(initialTaskEditor);

  return (
    <ThemeProvider theme={theme}>
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <TaskEditorContext.Provider value={{ taskEditor, setTaskEditor }}>
          <Reboot />
          <Board />
          <TaskDetails />
        </TaskEditorContext.Provider>
      </TasksContext.Provider>
    </ThemeProvider>
  )
}

export default App;
