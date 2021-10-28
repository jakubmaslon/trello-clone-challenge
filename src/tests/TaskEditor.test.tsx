import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { ThemeProvider } from 'styled-components';

import TaskEditor from "../components/TaskEditor";
import { TaskEditorContext } from "../components/ContextProviders";
import { TaskEditor as TaskEditorType, TASK_DETAILS_EDITOR_STATE } from "../typings/global";
import { theme } from "../ui/theme/default";

const taskEditorHiddenMock = {
  state: TASK_DETAILS_EDITOR_STATE.HIDDEN,
  taskId: "",
}

const taskEditorCreateMock = {
  state: TASK_DETAILS_EDITOR_STATE.EDIT,
  taskId: "",
}

const taskEditorEditMock = {
  state: TASK_DETAILS_EDITOR_STATE.EDIT,
  taskId: "666",
}

const setTaskEditorMock = (taskEditor: TaskEditorType) => null;

describe("TaskEditor component tests", () => {
  it("should render null when state is hidden", () => {
    const TaskEditorRendered = render(
      <TaskEditorContext.Provider value={{ taskEditor: taskEditorHiddenMock, setTaskEditor: setTaskEditorMock }}>
        <TaskEditor />
      </TaskEditorContext.Provider>
    );

    const { childNodes } = TaskEditorRendered.container;

    expect(childNodes).toHaveLength(0);
  });

  it("should render content when state is not hidden and it doesn't have a task id", () => {
    const TaskEditorRendered = render(
      <ThemeProvider theme={theme}>
        <TaskEditorContext.Provider value={{ taskEditor: taskEditorCreateMock, setTaskEditor: setTaskEditorMock }}>
          <TaskEditor />
        </TaskEditorContext.Provider>
      </ThemeProvider>
    );

    const { childNodes } = TaskEditorRendered.container;

    expect(childNodes).not.toHaveLength(0);
  });

  it("should render content when state is not hidden and it does have a task id", () => {
    const TaskEditorRendered = render(
      <ThemeProvider theme={theme}>
        <TaskEditorContext.Provider value={{ taskEditor: taskEditorEditMock, setTaskEditor: setTaskEditorMock }}>
          <TaskEditor />
        </TaskEditorContext.Provider>
      </ThemeProvider>
    );

    const { childNodes } = TaskEditorRendered.container;

    expect(childNodes).not.toHaveLength(0);
  });
})
