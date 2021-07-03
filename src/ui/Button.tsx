import styled from "styled-components";

export const Button = styled.button`
    padding: ${props => props.theme.spaces.base};
    border: none;
    background: ${props => props.theme.colors.turquoise};
    color: ${props => props.theme.colors.white};
    text-transform: uppercase;
    cursor: pointer;
`;