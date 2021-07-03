import styled from "styled-components";

export const Button = styled.button<{ disabled?: boolean }>`
    width: 100%;
    padding: ${props => props.theme.spaces.base};
    border: none;
    background: ${props => props.theme.colors.turquoise};
    color: ${props => props.theme.colors.white};
    text-transform: uppercase;
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    opacity: ${props => props.disabled ? 0.5 : 1};
`;
