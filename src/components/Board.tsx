import * as React from "react";
import styled from "styled-components";

import { TaskEditorContext, TasksContext } from "../App";
import { Button } from "../ui/Button";
import { STATUS, TASK_DETAILS_EDITOR_STATE } from "../typings/global";

import Task from "./Task";
import { getStatusTranslation } from "../services/getStatusTranslation";

const Board = (): React.ReactElement => {
    const { tasks } = React.useContext(TasksContext);
    const { setTaskEditor } = React.useContext(TaskEditorContext);

    const handleCreateTaskClick = () =>
        setTaskEditor({
            state: TASK_DETAILS_EDITOR_STATE.CREATE,
            task: "",
        });

    console.log(Object.keys(STATUS));
    return (
        <BoardWrapper>
            {Object.values(STATUS).map(status =>
                <Column>
                    <h6>{getStatusTranslation(status)}</h6>
                    {tasks
                        .filter(task => task.status === status)
                        .map((task, index) => (
                            <Task key={task.title + index} {...task} />
                        ))}
                    {status === STATUS.TODO &&
                        <Button onClick={handleCreateTaskClick}>Create a task</Button>
                    }
                </Column>
            )}
        </BoardWrapper>
    )
}

export default Board;

const BoardWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    min-height: 100vh;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin: ${props => props.theme.spaces.base};
    min-width: 200px;
    max-width: 200px;
;`
