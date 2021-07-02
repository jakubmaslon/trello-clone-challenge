import * as React from "react";
import styled from "styled-components";

import { StateContext } from "../App";

import Task from "./Task";

const Board = (): React.ReactElement => {
    const { tasks } = React.useContext(StateContext);

    const handleCreateTaskClick = () => {
        console.log("handleAddTaskClick");
    }

    return (
        <BoardWrapper>
            <Column>
                {tasks.map((task, index) => (
                    <Task key={task.title + index} {...task} />
                ))}
                <button onClick={handleCreateTaskClick}>Create a task</button>
            </Column>
        </BoardWrapper>
    )
}

export default Board;

const BoardWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
;`
