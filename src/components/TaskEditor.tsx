import * as React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

import { TaskEditorContext, TasksContext, UserContext } from "./ContextProviders";
import Activity from "./Activity";
import TaskForm from "./TaskForm";

import { TASK_DETAILS_EDITOR_STATE, Task, Form } from "../typings/global";

import { Close } from "../ui/Close";

import { getLogEntry } from "../services/getLogEntry";

/**
 * TaskEditor is a component where all the task management operations are performed.
 * It implements a form for creating/editing a task.
 * It includes the activity log.
 * It works like a modal.
 */
const TaskEditor = (): React.ReactElement | null => {
    const { taskEditor, setTaskEditor } = React.useContext(TaskEditorContext);
    const { tasks, setTasks } = React.useContext(TasksContext);
    const { user, users } = React.useContext(UserContext);

    const [editedTask, setEditedTask] = React.useState<Task | null>(null);

    React.useEffect(() => {
        if (taskEditor.taskId && tasks) {
            const editedTask = tasks.find(task => task.id === taskEditor.taskId);

            if (editedTask) {
                setEditedTask({ ...editedTask });
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
        setEditedTask(null);
    }

    const handleSubmit = (form: Form) => {
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

    return (
        <ModalWrapper>
            <Overlay onClick={closeTaskEditor} />
            <TaskEditorStyled>
                <Close onClick={closeTaskEditor} />
                <TaskForm
                    onSubmit={handleSubmit}
                    editedTask={editedTask}
                    users={users}
                />
                {editedTask && <Activity task={editedTask} />}
            </TaskEditorStyled>
        </ModalWrapper>
    )
}

export default TaskEditor;

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
