import { STATUS } from "../typings/global";

const statusTranslation = {
    [STATUS.TODO]: "To do",
    [STATUS.BLOCKED]: "Blocked",
    [STATUS.IN_PROGRESS]: "In progress",
    [STATUS.IN_QA]: "In QA",
    [STATUS.DONE]: "Done",
    [STATUS.DEPLOYED]: "Deployed",
}

export const getStatusTranslation = (status: STATUS): string => statusTranslation[status];