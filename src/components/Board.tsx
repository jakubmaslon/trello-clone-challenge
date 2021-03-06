import * as React from "react";
import styled from "styled-components";

import { TaskEditorContext, TasksContext } from "./ContextProviders";
import Task from "./Task";

import { Button } from "../ui/Button";

import { STATUS, TASK_DETAILS_EDITOR_STATE, TEST_IDS } from "../typings/global";

import { statusTranslation } from "../services/getStatusTranslation";

/**
 * Board is the main feature of the app. 
 * It includes all tasks categorized in columns by their statuses.
 */
const Board = (): React.ReactElement => {
    const { tasks } = React.useContext(TasksContext);
    const { setTaskEditor } = React.useContext(TaskEditorContext);

    const handleCreateTaskClick = () =>
        setTaskEditor({
            state: TASK_DETAILS_EDITOR_STATE.EDIT,
            taskId: "",
        });

    return (
        <BoardWrapper>
            {Object.values(STATUS).map(status =>
                <Column key={status} data-testid={TEST_IDS.BOARD_COLUMN}>
                    <ColumnLabel>{statusTranslation[status]}</ColumnLabel>
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

const ColumnLabel = styled.h6`
    text-transform: uppercase;
`;

const BoardWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    min-height: 100vh;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 200px;
    width: 100%;
    padding: ${props => props.theme.spaces.base};
    border: 1px solid ${props => props.theme.colors.lightGrey};
;`
