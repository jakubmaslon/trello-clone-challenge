import * as React from "react";
import styled from "styled-components";

import { getStatusTranslation } from "../services/getStatusTranslation";
import { Task as TaskInterface } from "../typings/global";

const Task = (props: TaskInterface): React.ReactElement => {
    return (
        <TaskStyled>
            <p>{props.id}</p>
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
    border: 1px solid ${props => props.theme.colors.brown};
`;
