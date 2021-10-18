import React from 'react';
import styled from 'styled-components';

function Tag({ label, checked, onClick = () => { } }) {
    const classList = ["tag"];
    if (checked) {
        classList.push("checked");
    }
    return (
        <StyledTag className={classList} onClick={onClick}>
            {label}
        </StyledTag>
    );
}

export default Tag;

const StyledTag = styled.button`
    padding:0.5rem 1rem;
    font-size:1.2rem;
    font-weight:${props => props.theme.font.weight.bold};
    font-family:${props => props.theme.font.family};
    border:1px solid ${props => props.theme.color.primary};
    color:${props => props.theme.color.primary};
    box-sizing: border-box;
    background-color: transparent;
    border-radius:9.9rem;
    cursor: pointer;
    transition: 
    background-color .2s ease-in-out,
    color .2s ease-in-out;
    &.checked,
    &:hover{
        background-color: ${props => props.theme.color.primary};
        color:${props => props.theme.color.foreground};
    }
`;