import { statusTranslation } from "./getStatusTranslation";

import { Task, Form } from "../typings/global";

const getEditedAction = (editedTask: Task, form: Form): string => {
    const editedTaskLabel = "edited this task as follows:";

    const titleEdited = editedTask.title !== form.title
        ? `\nTitle: ${editedTask.title} ➡️ ${form.title}`
        : "";

    const descriptionEdited = editedTask.description !== form.description
        ? `\nDescription: ${editedTask.description} ➡️ ${form.description}`
        : "";

    const statusEdited = editedTask.status !== form.status
        ? `\nStatus: ${statusTranslation[editedTask.status]} ➡️ ${statusTranslation[form.status]}`
        : "";

    const assigneeEdited = editedTask.assignee !== form.assignee
        ? `\nAssignee: ${editedTask.assignee} ➡️ ${form.assignee}`
        : "";

    return `${editedTaskLabel}${titleEdited}${descriptionEdited}${assigneeEdited}${statusEdited}`;
}

const parseDate = (date: Date): string => {
    const day = date.getDate();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const hours = date.getHours();
    const minutes = ("0" + (date.getMinutes())).slice(-2);

    return `${day}.${month} at ${hours}:${minutes}`;
}

interface LogEntry {
    updatedAt: Date;
    updatedBy: string;
    editedTask?: Task;
    form?: Form;
}

export const getLogEntry = (logEntry: LogEntry): string => {
    const updatedAt = parseDate(logEntry.updatedAt);

    const action = (logEntry.editedTask && logEntry.form)
        ? getEditedAction(logEntry.editedTask, logEntry.form)
        : "created the task.";

    const logEntryString = `${updatedAt} - ${logEntry.updatedBy} ${action}`;

    return logEntryString;
}