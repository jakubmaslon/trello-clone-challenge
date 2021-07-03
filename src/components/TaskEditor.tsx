import * as React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

import { TaskEditorContext, TasksContext, UserContext } from "../App";
import { Button } from "../ui/Button";
import { TASK_DETAILS_EDITOR_STATE, STATUS, Task } from "../typings/global";
import { getStatusTranslation } from "../services/getStatusTranslation";
import { getStatusFlow } from "../services/getStatusFlow";
import { setLogEntry } from "../services/setLogEntry";

const formInitialState = {
    title: "",
    description: "",
    status: STATUS.TODO,
    assignee: "",
}

export interface Form {
    title: string;
    description: string;
    status: STATUS;
    assignee: string;
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
    }, [taskEditor.taskId, tasks])

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

    // const handleAssigneeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const assignee = event.target.value;
    //     setForm({ ...form, assignee })
    // };

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
                {/* @TODO implement close button */}
                <CloseButton onClick={closeTaskDetails}>x</CloseButton>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title: <br />
                        <input type="text" value={form.title} onChange={handleTitleChange} autoFocus />
                    </label><br />
                    <label>
                        Description: <br />
                        <textarea value={form.description} onChange={handleDescriptionChange} />
                    </label><br />
                    <label>
                        Assignee: <br />
                        <select value={form.assignee} onChange={handleAssigneeChange}>
                            {users.map(user => (
                                <option value={user}>{user}</option>
                            ))}
                        </select>
                    </label><br />

                    {editedTask && (
                        <label>
                            Status: <br />
                            <select value={form.status} onChange={handleStatusChange}>
                                {getStatusFlow(editedTask.status).map(status =>
                                    <option key={status} value={status}>{getStatusTranslation(status)}</option>
                                )}
                            </select>
                        </label>
                    )}
                    {editedTask && (
                        <div>
                            Task owner: {editedTask?.owner}
                        </div>
                    )}
                </form>
                <Button disabled={!isFormValidated} onClick={handleSubmit}>Save</Button>

                {editedTask && (
                    <>
                        <h3>Activity:</h3>
                        <ul>
                            {editedTask.log.map(logItem =>
                                <LogEntry>{logItem}</LogEntry>
                            )}
                        </ul>
                    </>
                )}
            </TaskEditorStyled>
        </ModalWrapper>
    )
}

export default TaskDetails;

const LogEntry = styled.li`
    white-space: pre-wrap;
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
    max-height: 480px;
    max-width: 480px;
    padding: ${props => props.theme.spaces.base};
    background: ${props => props.theme.colors.white};
    /* @TODO move to theme */
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    overflow: scroll;

    z-index: 2;
`;

const CloseButton = styled.div`
    position: absolute;
    top: ${props => props.theme.spaces.base};
    right: ${props => props.theme.spaces.base};
    padding: ${props => props.theme.spaces.base};
    margin: -${props => props.theme.spaces.base};
    cursor: pointer;
`;
