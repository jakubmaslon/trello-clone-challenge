import { statusTranslation } from '../services/getStatusTranslation';

import { STATUS } from '../typings/global';

describe("getStatusTranslation service tests", () => {
  it("should return correct translation for each STATUS", () => {
    expect(statusTranslation[STATUS.TODO]).toBe("To do");
    expect(statusTranslation[STATUS.BLOCKED]).toBe("Blocked");
    expect(statusTranslation[STATUS.IN_PROGRESS]).toBe("In progress");
    expect(statusTranslation[STATUS.IN_QA]).toBe("In QA");
    expect(statusTranslation[STATUS.DONE]).toBe("Done");
    expect(statusTranslation[STATUS.DEPLOYED]).toBe("Deployed");
  });
})
