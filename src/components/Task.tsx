import * as React from "react";
import styled from "styled-components";

import { TaskEditorContext } from "./ContextProviders";

import { Task as TaskInterface, TASK_DETAILS_EDITOR_STATE } from "../typings/global";

/**
 * Task is displaying a task title and handles clicks on it.
 */
const Task = (props: TaskInterface): React.ReactElement => {
    const { setTaskEditor } = React.useContext(TaskEditorContext);

    const handleTaskClick = () =>
        setTaskEditor({
            state: TASK_DETAILS_EDITOR_STATE.EDIT,
            taskId: props.id,
        })

    return (
        <TaskStyled onClick={handleTaskClick}>
            <TaskTitle>{props.title}</TaskTitle>
        </TaskStyled>
    )
}

export default Task;

const TaskTitle = styled.div`
    font-size: 1rem;
    font-weight: bold;
`;

const TaskStyled = styled.div`
    display: inline-block;
    max-height: 100px;
    padding: ${props => props.theme.spaces.half};
    margin-bottom: ${props => props.theme.spaces.base};
    box-shadow: ${props => props.theme.boxShadows.light};
    cursor: pointer;
    overflow: hidden;

    &:hover {
        background: ${props => props.theme.colors.grey}
    }
`;
