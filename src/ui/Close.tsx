import styled from "styled-components";

export const Close = styled.div`
    position: absolute;
    top: ${props => props.theme.spaces.base};
    right: ${props => props.theme.spaces.base};
    padding: ${props => props.theme.spaces.base};
    margin: -${props => props.theme.spaces.base};
    cursor: pointer;

    &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 4px;
        background: ${props => props.theme.colors.grey};
        transform: rotate(45deg) scale(0.5);
    }

    &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 4px;
        background: ${props => props.theme.colors.grey};
        transform: rotate(-45deg) scale(0.5);
    }

    &:hover {
        &:before {
        background: ${props => props.theme.colors.darkGrey};
    }

    &:after {
        background: ${props => props.theme.colors.darkGrey};
    }
    }
`;
