import { statusTranslation } from "./getStatusTranslation";

import { Task, Form } from "../typings/global";

const getEditedAction = (editedTask: Task, form: Form) => {
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

interface LogEntry {
    updatedAt: Date;
    updatedBy: string;
    editedTask?: Task;
    form?: Form;
}

export const getLogEntry = (logEntry: LogEntry): string => {
    const updatedAt = logEntry.updatedAt.toLocaleString();

    const action = (logEntry.editedTask && logEntry.form)
        ? getEditedAction(logEntry.editedTask, logEntry.form)
        : "created a task.";

    const logEntryString = `${updatedAt} - ${logEntry.updatedBy} ${action}`;

    return logEntryString;
}