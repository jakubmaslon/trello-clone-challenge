export enum STATUS {
    TODO = "ToDo",
    IN_PROGRESS = "InProgress",
    BLOCKED = "Blocked",
    IN_QA = "InQa",
    DONE = "Done",
    DEPLOYED = "Deployed",
}

export enum TASK_DETAILS_EDITOR_STATE {
    HIDDEN,
    EDIT,
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: STATUS;
    assignee: string;
    owner: string;
    createdAt: Date;
    log: string[];
}

export enum TASK_FORM_FIELDS {
    TITLE = "title",
    DESCRIPTION = "description",
    STATUS = "status",
    ASSIGNEE = "assignee",
}

export interface Form {
    [TASK_FORM_FIELDS.TITLE]: string;
    [TASK_FORM_FIELDS.DESCRIPTION]: string;
    [TASK_FORM_FIELDS.STATUS]: STATUS;
    [TASK_FORM_FIELDS.ASSIGNEE]: string;
}

export enum TEST_IDS {
    BOARD_COLUMN = "boardColumn",
    LOG_ENTRY = "logEntry",
    TASK_TITLE = "taskTitle",
    TASK_FORM_TITLE = "taskFormTitle",
}

export interface TaskEditor {
    state: TASK_DETAILS_EDITOR_STATE;
    taskId: string;
}
