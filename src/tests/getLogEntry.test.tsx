import { getLogEntry } from '../services/getLogEntry';

import { STATUS } from '../typings/global';

describe("getLogEntry service tests", () => {
  beforeEach(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2018, 7, 24, 10, 7, 30, 0)); // 24.08.2018, 10:07:30
  });

  it("should return a proper log entry for creating a task event", () => {
    const logEntryData = {
      updatedAt: new Date(),
      updatedBy: "Elvis Presley",
    };

    const expectedResult = "24.08 at 10:07 - Elvis Presley created the task."

    expect(getLogEntry(logEntryData)).toBe(expectedResult);
  });

  it("should return a proper log entry for edit a task event", () => {
    const logEntryData = {
      updatedAt: new Date(),
      updatedBy: "Elvis Presley",
      editedTask: {
        id: "666",
        title: "Write a song",
        description: "It might be something like this: Love me honey, love me sweet",
        status: STATUS.TODO,
        assignee: "Krzysztof Krawczyk",
        owner: "Krzysztof Krawczyk",
        createdAt: new Date(),
        log: ["23.08 at 10:07 - Krzysztof Krawczyk created the task."],
      },
      form: {
        title: "Write a hit",
        description: "It might be something like this: Love me tender, love me sweet",
        assignee: "Elvis Presley",
        status: STATUS.TODO,
      }
    };

    const expectedResult =
      "24.08 at 10:07 - Elvis Presley edited this task as follows:\n" +
      "Title: Write a song ➡️ Write a hit\n" +
      "Description: It might be something like this: Love me honey, love me sweet ➡️ It might be something like this: Love me tender, love me sweet\n" +
      "Assignee: Krzysztof Krawczyk ➡️ Elvis Presley";

    expect(getLogEntry(logEntryData)).toBe(expectedResult);
  });

  it("should return a proper log entry for edit a task event 2", () => {
    const logEntryData = {
      updatedAt: new Date(),
      updatedBy: "Elvis Presley",
      editedTask: {
        id: "666",
        title: "Write a hit",
        description: "It might be something like this: Love me tender, love me sweet",
        status: STATUS.TODO,
        assignee: "Elvis Presley",
        owner: "Krzysztof Krawczyk",
        createdAt: new Date(),
        log: ["23.08 at 10:07 - Krzysztof Krawczyk created the task."],
      },
      form: {
        title: "Write a hit",
        description: "It might be something like this: Love me tender, love me sweet",
        assignee: "Elvis Presley",
        status: STATUS.IN_PROGRESS,
      }
    };

    const expectedResult =
      "24.08 at 10:07 - Elvis Presley edited this task as follows:\n" +
      "Status: To do ➡️ In progress";

    expect(getLogEntry(logEntryData)).toBe(expectedResult);
  });

  afterAll(() => {
    jest.useRealTimers();
  });
})
