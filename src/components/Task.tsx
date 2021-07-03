import * as React from "react";
import styled from "styled-components";

import { TaskEditorContext } from "../App";
import { Task as TaskInterface, TASK_DETAILS_EDITOR_STATE } from "../typings/global";

const Task = (props: TaskInterface): React.ReactElement => {
    const { setTaskEditor } = React.useContext(TaskEditorContext);

    const handleTaskClick = () => {
        setTaskEditor({
            state: TASK_DETAILS_EDITOR_STATE.SEE_DETAILS,
            taskId: props.id,
        })
    }

    return (
        <TaskStyled onClick={handleTaskClick}>
            <TaskTitle>{props.title}</TaskTitle>
        </TaskStyled>
    )
}

export default Task;

const TaskTitle = styled.div`
    font-size: 14px;
`;

const TaskStyled = styled.div`
    display: inline-block;
    max-height: 100px;
    padding: ${props => props.theme.spaces.half};
    margin-bottom: ${props => props.theme.spaces.base};
    /* @TODO add to theme */
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    cursor: pointer;
    overflow: hidden;

    &:hover {
        background: ${props => props.theme.colors.grey}
    }
`;
