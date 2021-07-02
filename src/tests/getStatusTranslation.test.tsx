import { getStatusTranslation } from '../services/getStatusTranslation';
import { STATUS } from '../typings/global';

describe("getStatusTranslation service tests", () => {
  it("should return correct translation for each STATUS", () => {
    expect(getStatusTranslation(STATUS.TODO)).toBe("To do");
    expect(getStatusTranslation(STATUS.BLOCKED)).toBe("Blocked");
    expect(getStatusTranslation(STATUS.IN_PROGRESS)).toBe("In progress");
    expect(getStatusTranslation(STATUS.IN_QA)).toBe("In QA");
    expect(getStatusTranslation(STATUS.DONE)).toBe("Done");
    expect(getStatusTranslation(STATUS.DEPLOYED)).toBe("Deployed");
  });
})
