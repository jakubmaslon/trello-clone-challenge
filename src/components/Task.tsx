import * as React from "react";
import styled from "styled-components";

import { TaskEditorContext } from "../App";
import { getStatusTranslation } from "../services/getStatusTranslation";
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
            <p>{props.title}</p>
            <p>{props.description}</p>
            <p>{getStatusTranslation(props.status)}</p>
            <p>{props.owner}</p>
            <p>{props.createdAt.toLocaleString()}</p>
        </TaskStyled>
    )
}

export default Task;

const TaskStyled = styled.div`
    display: inline-block;
    padding: ${props => props.theme.spaces.base};
    margin-bottom: ${props => props.theme.spaces.base};
    /* @TODO add to theme */
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    cursor: pointer;

    /* @TODO refactor */
    p {
        margin: 0;
    }

    &:hover {
        background: ${props => props.theme.colors.grey}
    }
`;
