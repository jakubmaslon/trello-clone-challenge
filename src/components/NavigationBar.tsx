import * as React from "react";
import styled from "styled-components";

import UserSelector from "./UserSelector";

/**
 * NavigationBar implements a navigation bar with a user selector inside.
 */
const NavigationBar = (): React.ReactElement => (
    <NavigationBarWrapper>
        <UserSelector />
    </NavigationBarWrapper>
)

export default NavigationBar;

const NavigationBarWrapper = styled.div`
   background: ${props => props.theme.colors.darkGrey};
   padding: ${props => props.theme.spaces.base};
`;
