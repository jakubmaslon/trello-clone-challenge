export enum STATUS {
    TODO = "ToDo",
    BLOCKED = "Blocked",
    IN_PROGRESS = "InProgress",
    IN_QA = "InQa",
    DONE = "Done",
    DEPLOYED = "Deployed",
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: STATUS;
    owner: string;
    createdAt: Date;
}