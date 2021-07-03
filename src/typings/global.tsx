export enum STATUS {
    TODO = "ToDo",
    BLOCKED = "Blocked",
    IN_PROGRESS = "InProgress",
    IN_QA = "InQa",
    DONE = "Done",
    DEPLOYED = "Deployed",
}

export enum TASK_DETAILS_EDITOR_STATE  {
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
    owner: string;
    createdAt: Date;
}

export enum TASK_FORM_FIELDS {
    TITLE  = "title",
    DESCRIPTION  = "description",
    STATUS  = "status",
    OWNER  = "owner",
}