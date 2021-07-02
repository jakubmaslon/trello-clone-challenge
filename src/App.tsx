import * as React from "react";
import { ThemeProvider } from "styled-components";
import { Reboot } from 'styled-reboot';
import { v4 as uuidv4 } from 'uuid';

import { Task, STATUS } from "./typings/global";
import { theme } from "./ui/theme/default";
import Board from "./components/Board";
import TaskDetails from "./components/TaskDetails";

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

export const StateContext = React.createContext({
  tasks: [] as Task[],
  setTasks: (tasks: Task[]) => { },
});

const App = (): React.ReactElement => {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasksData);

  return (
    <ThemeProvider theme={theme}>
      <StateContext.Provider value={{ tasks, setTasks }}>
        <Reboot />
        <Board />
        <TaskDetails />
      </StateContext.Provider>
    </ThemeProvider>
  )
}

export default App;
