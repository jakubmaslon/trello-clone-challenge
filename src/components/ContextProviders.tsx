import * as React from "react";
import { ThemeProvider } from "styled-components";
import { Reboot } from 'styled-reboot';

import { theme } from "../ui/theme/default";

import { Task, TASK_DETAILS_EDITOR_STATE } from "../typings/global";

// TASKS CONTEXT
export const TasksContext = React.createContext({
    tasks: [] as Task[],
    setTasks: (tasks: Task[]) => { },
});

// TASK EDITOR CONTEXT
const initialTaskEditor = {
    state: TASK_DETAILS_EDITOR_STATE.HIDDEN,
    taskId: "",
}

export const TaskEditorContext = React.createContext({
    taskEditor: initialTaskEditor,
    setTaskEditor: (x?: any) => { },
});

// USER CONTEXT
const users = [
    "Spongebob SquarePants",
    "Squidward Tentacles",
    "Patrick Star",
];

export const UserContext = React.createContext({
    user: users[0],
    setUser: (user: string) => { },
    users,
});

interface Props {
    children: React.ReactElement;
}

const ContextProviders = (props: Props): React.ReactElement => {
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
                        {props.children}
                    </UserContext.Provider>
                </TaskEditorContext.Provider>
            </TasksContext.Provider>
        </ThemeProvider>
    )
}

export default ContextProviders;
