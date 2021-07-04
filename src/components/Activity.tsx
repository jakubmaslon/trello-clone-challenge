import * as React from "react";
import styled from "styled-components";

import { Task } from "../typings/global";

interface Props {
    task: Task;
}

/**
 * Activity is a component that lists the log of the task.
 */
const Activity = (props: Props): React.ReactElement | null => (
    <ActivityStyled>
        <h5>Activity</h5>
        {props.task.log.map((logItem, index) =>
            <LogEntry withAnotherBackgroundColor={!(index % 2)} key={logItem}>{logItem}</LogEntry>
        )}
    </ActivityStyled>
)

export default Activity;

const ActivityStyled = styled.div`
    margin-top: ${props => props.theme.spaces.base};
`;

const LogEntry = styled.div<{ withAnotherBackgroundColor: boolean }>`
    white-space: pre-wrap;
    font-size: 0.75rem;
    padding: ${props => props.theme.spaces.half};
    background: ${props => props.withAnotherBackgroundColor ? props.theme.colors.lightGrey : "none"};
`;
