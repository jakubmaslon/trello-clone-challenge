import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import Task from '../components/Task';
import ContextProviders from "../components/ContextProviders";
import { STATUS, TEST_IDS } from "../typings/global";

const titleMock = "Write a song";
const task = {
  id: "666",
  title: titleMock,
  description: "It might be something like this: Love me honey, love me sweet",
  status: STATUS.TODO,
  assignee: "Krzysztof Krawczyk",
  owner: "Krzysztof Krawczyk",
  createdAt: new Date(),
  log: ["FIRST LOG ENTRY"],
};

describe("Task component tests", () => {
  const TaskRendered = render(
    <ContextProviders>
      <Task {...task} />
    </ContextProviders>
  );
  it("should render task component with correct title", () => {
    const { getAllByTestId } = TaskRendered;
    const taskTitle = getAllByTestId(TEST_IDS.TASK_TITLE)[0];
    expect(taskTitle.textContent).toBe(titleMock);
  });

})
