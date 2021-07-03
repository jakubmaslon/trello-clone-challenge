import * as React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

import { TaskEditorContext, TasksContext } from "../App";
import { Button } from "../ui/Button";
import { TASK_DETAILS_EDITOR_STATE, STATUS } from "../typings/global";

const formInitialState = {
    title: "",
    description: "",
}

interface Form {
    title: string;
    description: string;
}

const TaskDetails = (): React.ReactElement | null => {
    const { taskEditor, setTaskEditor } = React.useContext(TaskEditorContext);
    const { tasks, setTasks } = React.useContext(TasksContext);

    const [form, setForm] = React.useState<Form>(formInitialState);

    if (taskEditor.state === TASK_DETAILS_EDITOR_STATE.HIDDEN) {
        return null;
    }

    const closeTaskDetails = () => {
        setTaskEditor({
            state: TASK_DETAILS_EDITOR_STATE.HIDDEN,
            taskId: "",
        });

        setForm(formInitialState);
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        setForm({ ...form, title })
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const description = event.target.value;
        setForm({ ...form, description })
    };

    const handleSubmit = () => {
        if (taskEditor.taskId) {
            // @TODO edit task
            console.log('edit task:', taskEditor.taskId);
        } else {
            setTasks([
                ...tasks,
                {
                    ...form,
                    id: uuidv4(),
                    status: STATUS.TODO,
                    owner: "Task #1 owner",
                    createdAt: new Date(),
                },
            ]);
        }

        closeTaskDetails();
    };

    return (
        <ModalWrapper>
            <Overlay onClick={closeTaskDetails} />
            <TaskEditorStyled>
                {/* @TODO implement close button */}
                <CloseButton onClick={closeTaskDetails}>x</CloseButton>
                <form>
                    <label>
                        Title: <br />
                        <input type="text" value={form.title} onChange={handleTitleChange} />
                    </label><br />
                    <label>
                        Description: <br />
                        <textarea value={form.description} onChange={handleDescriptionChange} />
                    </label><br />
                </form>
                <Button onClick={handleSubmit}>Save</Button>
            </TaskEditorStyled>
        </ModalWrapper>
    )
}

export default TaskDetails;

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
