import * as React from "react";
import { ThemeProvider } from "styled-components";
import { Reboot } from 'styled-reboot';

import { Task, TASK_DETAILS_EDITOR_STATE } from "./typings/global";
import { theme } from "./ui/theme/default";
import Board from "./components/Board";
import TaskEditor from "./components/TaskEditor";
import NavigationBar from "./components/NavigationBar";

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

const users = [
  "Spongebob",
  "Squidward",
  "Patrick",
];

export const UserContext = React.createContext({
  user: "",
  setUser: (x?: any) => { }, // @TODO edit type
  users,
});

const App = (): React.ReactElement => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [taskEditor, setTaskEditor] =
    React.useState<{ state: TASK_DETAILS_EDITOR_STATE, taskId: string }>(initialTaskEditor);
  const [user, setUser] =
    React.useState<string>(users[0]);

  return (
    <ThemeProvider theme={theme}>
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <TaskEditorContext.Provider value={{ taskEditor, setTaskEditor }}>
          <UserContext.Provider value={{ user, setUser, users }}>
            <Reboot />
            <NavigationBar />
            <Board />
            <TaskEditor />
          </UserContext.Provider>
        </TaskEditorContext.Provider>
      </TasksContext.Provider>
    </ThemeProvider>
  )
}

export default App;
