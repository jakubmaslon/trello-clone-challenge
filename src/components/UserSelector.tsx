import * as React from "react";
import styled from "styled-components";

import { UserContext } from "../App";

const UserSelector = (): React.ReactElement => {
    const { user, setUser, users } = React.useContext(UserContext);

    const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUser = event.target.value;
        setUser(selectedUser);
    }

    return (
        <UserSelectorStyled>
            You're logged as{" "}
            <select value={user} onChange={handleUserChange}>
                {users.map(user => (
                    <option value={user}>{user}</option>
                ))}
            </select>
        </UserSelectorStyled>
    )
}

export default UserSelector;

const UserSelectorStyled = styled.div`
    color: ${props => props.theme.colors.white};
`;
