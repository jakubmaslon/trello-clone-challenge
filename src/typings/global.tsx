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
    CREATE,
    EDIT,
    SEE_DETAILS,
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

export interface Form {
    title: string;
    description: string;
    status: STATUS;
    assignee: string;
}

export enum TASK_FORM_FIELDS {
    TITLE = "title",
    DESCRIPTION = "description",
    STATUS = "status",
    OWNER = "owner",
}