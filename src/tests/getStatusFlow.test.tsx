import { statusFlow } from '../services/getStatusFlow';

import { STATUS } from '../typings/global';

describe("getStatusFlow service tests", () => {
  it("should return correct flow for each STATUS TODO", () => {
    expect(statusFlow[STATUS.TODO]).toContain(STATUS.TODO);
    expect(statusFlow[STATUS.TODO]).toContain(STATUS.IN_PROGRESS);

    expect(statusFlow[STATUS.TODO]).not.toContain(STATUS.BLOCKED);
    expect(statusFlow[STATUS.TODO]).not.toContain(STATUS.IN_QA);
    expect(statusFlow[STATUS.TODO]).not.toContain(STATUS.DONE);
    expect(statusFlow[STATUS.TODO]).not.toContain(STATUS.DEPLOYED);
  });

  it("should return correct flow for each STATUS IN_PROGRESS", () => {
    expect(statusFlow[STATUS.IN_PROGRESS]).toContain(STATUS.IN_PROGRESS);
    expect(statusFlow[STATUS.IN_PROGRESS]).toContain(STATUS.IN_QA);
    expect(statusFlow[STATUS.IN_PROGRESS]).toContain(STATUS.BLOCKED);

    expect(statusFlow[STATUS.IN_PROGRESS]).not.toContain(STATUS.TODO);
    expect(statusFlow[STATUS.IN_PROGRESS]).not.toContain(STATUS.DONE);
    expect(statusFlow[STATUS.IN_PROGRESS]).not.toContain(STATUS.DEPLOYED);
  });

  it("should return correct flow for each STATUS BLOCKED", () => {
    expect(statusFlow[STATUS.BLOCKED]).toContain(STATUS.BLOCKED);
    expect(statusFlow[STATUS.BLOCKED]).toContain(STATUS.TODO);

    expect(statusFlow[STATUS.BLOCKED]).not.toContain(STATUS.IN_PROGRESS);
    expect(statusFlow[STATUS.BLOCKED]).not.toContain(STATUS.IN_QA);
    expect(statusFlow[STATUS.BLOCKED]).not.toContain(STATUS.DONE);
    expect(statusFlow[STATUS.BLOCKED]).not.toContain(STATUS.DEPLOYED);
  });

  it("should return correct flow for each STATUS IN_QA", () => {
    expect(statusFlow[STATUS.IN_QA]).toContain(STATUS.IN_QA);
    expect(statusFlow[STATUS.IN_QA]).toContain(STATUS.TODO);
    expect(statusFlow[STATUS.IN_QA]).toContain(STATUS.DONE);

    expect(statusFlow[STATUS.IN_QA]).not.toContain(STATUS.BLOCKED);
    expect(statusFlow[STATUS.IN_QA]).not.toContain(STATUS.IN_PROGRESS);
    expect(statusFlow[STATUS.IN_QA]).not.toContain(STATUS.DEPLOYED);
  });

  it("should return correct flow for each STATUS DONE", () => {
    expect(statusFlow[STATUS.DONE]).toContain(STATUS.DONE);
    expect(statusFlow[STATUS.DONE]).toContain(STATUS.DEPLOYED);

    expect(statusFlow[STATUS.DONE]).not.toContain(STATUS.TODO);
    expect(statusFlow[STATUS.DONE]).not.toContain(STATUS.IN_PROGRESS);
    expect(statusFlow[STATUS.DONE]).not.toContain(STATUS.IN_QA);
    expect(statusFlow[STATUS.DONE]).not.toContain(STATUS.BLOCKED);
  });

  it("should return correct flow for each STATUS DEPLOYED", () => {
    expect(statusFlow[STATUS.DEPLOYED]).toContain(STATUS.DEPLOYED);

    expect(statusFlow[STATUS.DEPLOYED]).not.toContain(STATUS.TODO);
    expect(statusFlow[STATUS.DEPLOYED]).not.toContain(STATUS.IN_PROGRESS);
    expect(statusFlow[STATUS.DEPLOYED]).not.toContain(STATUS.BLOCKED);
    expect(statusFlow[STATUS.DEPLOYED]).not.toContain(STATUS.IN_QA);
    expect(statusFlow[STATUS.DEPLOYED]).not.toContain(STATUS.DONE);
  });
})
