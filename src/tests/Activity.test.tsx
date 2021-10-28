import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import Activity from '../components/Activity';
import ContextProviders from "../components/ContextProviders";
import { STATUS, TEST_IDS } from "../typings/global";

const editedTaskWithTwoEntriesMock = {
  id: "666",
  title: "Write a song",
  description: "It might be something like this: Love me honey, love me sweet",
  status: STATUS.TODO,
  assignee: "Krzysztof Krawczyk",
  owner: "Krzysztof Krawczyk",
  createdAt: new Date(),
  log: ["FIRST LOG ENTRY", "SECOND LOG ENTRY"],
};

const editedTaskWithThreeEntriesMock = {
  id: "666",
  title: "Write a song",
  description: "It might be something like this: Love me honey, love me sweet",
  status: STATUS.TODO,
  assignee: "Krzysztof Krawczyk",
  owner: "Krzysztof Krawczyk",
  createdAt: new Date(),
  log: ["FIRST LOG ENTRY", "SECOND LOG ENTRY", "THIRD LOG ENTRY"],
};

describe("Activity component tests", () => {
  it("should render two log entry", () => {
    const ActivityRendered = render(
      <ContextProviders>
        <Activity task={editedTaskWithTwoEntriesMock} />
      </ContextProviders>
    );

    const { getAllByTestId } = ActivityRendered;
    const logEntries = getAllByTestId(TEST_IDS.LOG_ENTRY);
    expect(logEntries).toHaveLength(2);
  });

  it("should render three log entry", () => {
    const ActivityRendered = render(
      <ContextProviders>
        <Activity task={editedTaskWithThreeEntriesMock} />
      </ContextProviders>
    );

    const { getAllByTestId } = ActivityRendered;
    const logEntries = getAllByTestId(TEST_IDS.LOG_ENTRY);
    expect(logEntries).toHaveLength(3);
  });
})
