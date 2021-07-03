import * as React from "react";
import styled from "styled-components";

import { TaskEditorContext, TasksContext } from "../App";
import { Button } from "../ui/Button";
import { TASK_DETAILS_EDITOR_STATE } from "../typings/global";

import Task from "./Task";

const Board = (): React.ReactElement => {
    const { tasks } = React.useContext(TasksContext);
    const { setTaskEditor } = React.useContext(TaskEditorContext);

    const handleCreateTaskClick = () =>
        setTaskEditor({
            state: TASK_DETAILS_EDITOR_STATE.CREATE,
            task: "",
        });

    return (
        <BoardWrapper>
            <Column>
                {tasks.map((task, index) => (
                    <Task key={task.title + index} {...task} />
                ))}
                <Button onClick={handleCreateTaskClick}>Create a task</Button>
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
    margin: ${props => props.theme.spaces.base};
;`
