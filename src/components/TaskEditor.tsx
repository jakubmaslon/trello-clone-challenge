import * as React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

import { TaskEditorContext, TasksContext, UserContext } from "./ContextProviders";

import { TASK_DETAILS_EDITOR_STATE, STATUS, Task, Form, TASK_FORM_FIELDS } from "../typings/global";

import { Button } from "../ui/Button";
import { Close } from "../ui/Close";

import { statusTranslation } from "../services/getStatusTranslation";
import { statusFlow } from "../services/getStatusFlow";
import { getLogEntry } from "../services/getLogEntry";

const getFormInitialState = (users: string[]) => ({
    [TASK_FORM_FIELDS.TITLE]: "",
    [TASK_FORM_FIELDS.DESCRIPTION]: "",
    [TASK_FORM_FIELDS.STATUS]: STATUS.TODO,
    [TASK_FORM_FIELDS.ASSIGNEE]: users[0],
})

const TaskEditor = (): React.ReactElement | null => {
    const { taskEditor, setTaskEditor } = React.useContext(TaskEditorContext);
    const { tasks, setTasks } = React.useContext(TasksContext);
    const { user, users } = React.useContext(UserContext);

    const [form, setForm] = React.useState<Form>(() => getFormInitialState(users));
    const [editedTask, setEditedTask] = React.useState<Task | undefined>(undefined);

    React.useEffect(() => {
        if (taskEditor.taskId && tasks) {
            const editedTask = tasks.find(task => task.id === taskEditor.taskId);

            if (editedTask) {
                setEditedTask({ ...editedTask });
                setForm({ ...editedTask });
            }
        }
    }, [taskEditor.taskId, tasks]);

    if (taskEditor.state === TASK_DETAILS_EDITOR_STATE.HIDDEN) {
        return null;
    }

    const closeTaskEditor = () => {
        setTaskEditor({
            state: TASK_DETAILS_EDITOR_STATE.HIDDEN,
            taskId: "",
        });
        setForm(getFormInitialState(users));
        setEditedTask(undefined);
    }

    /*
        FORM HANDLERS
    */
    const handleFormChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        field: TASK_FORM_FIELDS) =>
        setForm({ ...form, [field]: event.target.value })

    const handleSubmit = () => {
        const updatedAt = new Date();
        const updatedBy = user;

        if (editedTask) {
            const updatedTasks = tasks.map(task => {
                if (task.id === editedTask.id) {
                    return {
                        ...task,
                        ...form,
                        log: [
                            ...task.log,
                            getLogEntry({ updatedAt, updatedBy, editedTask, form })
                        ]
                    }
                }

                return task;
            });
            setTasks([...updatedTasks]);
        } else {
            setTasks([
                ...tasks,
                {
                    ...form,
                    id: uuidv4(),
                    owner: updatedBy,
                    createdAt: updatedAt,
                    log: [getLogEntry({ updatedAt, updatedBy })],
                },
            ]);
        }

        closeTaskEditor();
    };

    /*
        FORM VALIDATION
    */
    const requiredFieldsValidated = form[TASK_FORM_FIELDS.TITLE];

    const isFormValidated = editedTask
        ? requiredFieldsValidated && (
            editedTask.title !== form[TASK_FORM_FIELDS.TITLE] ||
            editedTask.description !== form[TASK_FORM_FIELDS.DESCRIPTION] ||
            editedTask.assignee !== form[TASK_FORM_FIELDS.ASSIGNEE] ||
            editedTask.status !== form[TASK_FORM_FIELDS.STATUS])
        : requiredFieldsValidated;

    return (
        <ModalWrapper>
            <Overlay onClick={closeTaskEditor} />
            <TaskEditorStyled>
                <Close onClick={closeTaskEditor} />
                <FormStyled onSubmit={handleSubmit}>
                    <Label>
                        <h5>Title</h5>
                        <Input
                            type="text"
                            value={form[TASK_FORM_FIELDS.TITLE]}
                            onChange={(event) => handleFormChange(event, TASK_FORM_FIELDS.TITLE)}
                            autoFocus
                        />
                    </Label>
                    <Label>
                        <h5>Description</h5>
                        <Textarea
                            value={form[TASK_FORM_FIELDS.DESCRIPTION]}
                            onChange={(event) => handleFormChange(event, TASK_FORM_FIELDS.DESCRIPTION)}
                        />
                    </Label>
                    <Label>
                        <h5>Assignee</h5>
                        <Select
                            value={form[TASK_FORM_FIELDS.ASSIGNEE]}
                            onChange={(event) => handleFormChange(event, TASK_FORM_FIELDS.ASSIGNEE)}
                        >
                            {users.map(user => (
                                <option key={user} value={user}>{user}</option>
                            ))}
                        </Select>
                    </Label>

                    {editedTask && (
                        <Label>
                            <h5>Status</h5>
                            <Select
                                value={form[TASK_FORM_FIELDS.STATUS]}
                                onChange={(event) => handleFormChange(event, TASK_FORM_FIELDS.STATUS)}
                            >
                                {statusFlow[editedTask.status].map(status =>
                                    <option key={status} value={status}>{statusTranslation[status]}</option>
                                )}
                            </Select>
                        </Label>
                    )}
                </FormStyled>
                <Button disabled={!isFormValidated} onClick={handleSubmit}>Save</Button>

                {editedTask && (
                    <Activity >
                        <h5>Activity</h5>
                        {editedTask.log.map((logItem, index) =>
                            <LogEntry withAnotherBackgroundColor={!(index % 2)} key={logItem}>{logItem}</LogEntry>
                        )}
                    </Activity>
                )}
            </TaskEditorStyled>
        </ModalWrapper>
    )
}

export default TaskEditor;

const FormStyled = styled.form`
    margin-bottom: ${props => props.theme.spaces.base};
`;

const Label = styled.label`
    width: 100%;
    margin-bottom: ${props => props.theme.spaces.base};

    &:last-child {
        margin-bottom: 0;
    }
`;

const Select = styled.select`
    width: 100%;
    padding: ${props => props.theme.spaces.half};
`;

const Input = styled.input`
    width: 100%;
    padding: ${props => props.theme.spaces.half};
`;

const Textarea = styled.textarea`
    width: 100%;
    min-height: 100px;
    max-height: 100px;
    padding: ${props => props.theme.spaces.half};
`;

const LogEntry = styled.div<{ withAnotherBackgroundColor: boolean }>`
    white-space: pre-wrap;
    font-size: 0.75rem;
    padding: ${props => props.theme.spaces.half};
    background: ${props => props.withAnotherBackgroundColor ? props.theme.colors.lightGrey : "none"};
`;

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(0.5rem);
    z-index: 1;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const TaskEditorStyled = styled.div`
    position: relative;
    display: block;
    height: 100%;
    width: 100%;
    max-height: 576px;
    max-width: 576px;
    padding: ${props => props.theme.spaces.base};
    background: ${props => props.theme.colors.white};
    box-shadow: ${props => props.theme.boxShadows.heavy};
    overflow: scroll;
    z-index: 2;
`;

const Activity = styled.div`
    margin-top: ${props => props.theme.spaces.base};
`;
