import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import TaskForm from '../components/TaskForm';
import ContextProviders from "../components/ContextProviders";
import { STATUS, TEST_IDS, Form } from "../typings/global";

const editedTask = {
  id: "666",
  title: "Write a song",
  description: "It might be something like this: Love me honey, love me sweet",
  status: STATUS.TODO,
  assignee: "Krzysztof Krawczyk",
  owner: "Krzysztof Krawczyk",
  createdAt: new Date(),
  log: ["FIRST LOG ENTRY", "SECOND LOG ENTRY"],
};

const usersMock = ["Sponge", "Patrick", "Squid"];

const taskFormPropsMock = {
  onSubmit: (form: Form) => null,
  editedTask: editedTask,
  users: usersMock,
}

describe("TaskForm component tests", () => {
  it("should render proper value in title field", () => {
    const TaskFormRendered = render(
      <ContextProviders>
        <TaskForm {...taskFormPropsMock} />
      </ContextProviders>
    );

    const { getAllByTestId } = TaskFormRendered;
    const formField = getAllByTestId(TEST_IDS.TASK_FORM_TITLE)[0];
    const formValue = formField.getAttribute("value");
    expect(formValue).toBe(editedTask.title);
  });
})
