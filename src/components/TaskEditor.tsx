import * as React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

import { TASK_DETAILS_EDITOR_STATE, STATUS, Task, Form } from "../typings/global";
import { TaskEditorContext, TasksContext, UserContext } from "../App";
import { Button } from "../ui/Button";
import { Close } from "../ui/Close";
import { getStatusTranslation } from "../services/getStatusTranslation";
import { getStatusFlow } from "../services/getStatusFlow";
import { setLogEntry } from "../services/setLogEntry";

const formInitialState = {
    title: "",
    description: "",
    status: STATUS.TODO,
    assignee: "",
}

const TaskDetails = (): React.ReactElement | null => {
    const { taskEditor, setTaskEditor } = React.useContext(TaskEditorContext);
    const { tasks, setTasks } = React.useContext(TasksContext);
    const { user, users } = React.useContext(UserContext);

    const [form, setForm] = React.useState<Form>(formInitialState);
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

    const closeTaskDetails = () => {
        setTaskEditor({
            state: TASK_DETAILS_EDITOR_STATE.HIDDEN,
            taskId: "",
        });

        setForm(formInitialState);
        setEditedTask(undefined);
    }

    /*
        FORM CHANGE HANDLERS
    */
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        setForm({ ...form, title })
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const description = event.target.value;
        setForm({ ...form, description })
    };

    const handleAssigneeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const assignee = event.target.value;
        setForm({ ...form, assignee });
    }

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const status = event.target.value as STATUS;
        setForm({ ...form, status })
    }

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
                            setLogEntry({ updatedAt, updatedBy, editedTask, form })
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
                    log: [setLogEntry({ updatedAt, updatedBy })],
                },
            ]);
        }

        closeTaskDetails();
    };

    /*
        FORM VALIDATION
    */
    const requiredFieldsValidated = form.title;

    const isFormValidated = editedTask
        ? requiredFieldsValidated && (
            editedTask.title !== form.title ||
            editedTask.description !== form.description ||
            editedTask.assignee !== form.assignee ||
            editedTask.status !== form.status)
        : requiredFieldsValidated;

    return (
        <ModalWrapper>
            <Overlay onClick={closeTaskDetails} />
            <TaskEditorStyled>
                <Close onClick={closeTaskDetails} />
                <FormStyled onSubmit={handleSubmit}>
                    <Label>
                        <h5>Title</h5>
                        <Input type="text" value={form.title} onChange={handleTitleChange} autoFocus />
                    </Label>
                    <Label>
                        <h5>Description</h5>
                        <Textarea value={form.description} onChange={handleDescriptionChange} />
                    </Label>
                    <Label>
                        <h5>Assignee</h5>
                        {/* @TODO fix bug: assign a user on create */}
                        <Select value={form.assignee} onChange={handleAssigneeChange}>
                            {users.map(user => (
                                <option value={user}>{user}</option>
                            ))}
                        </Select>
                    </Label>

                    {editedTask && (
                        <Label>
                            <h5>Status</h5>
                            <Select value={form.status} onChange={handleStatusChange}>
                                {getStatusFlow(editedTask.status).map(status =>
                                    <option key={status} value={status}>{getStatusTranslation(status)}</option>
                                )}
                            </Select>
                        </Label>
                    )}
                </FormStyled>
                <Button disabled={!isFormValidated} onClick={handleSubmit}>Save</Button>

                {editedTask && (
                    <Activity>
                        <h5>Activity</h5>
                        {editedTask.log.map((logItem, index) =>
                            <LogEntry withAnotherBackgroundColor={!(index % 2)}>{logItem}</LogEntry>
                        )}
                    </Activity>
                )}
            </TaskEditorStyled>
        </ModalWrapper>
    )
}

export default TaskDetails;

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
    font-size: 12px;
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
    
    /* @TODO use color from theme */
    backdrop-filter: blur(8px);
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
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    overflow: scroll;
    z-index: 2;
`;

const Activity = styled.div`
    margin-top: ${props => props.theme.spaces.base};
`;
