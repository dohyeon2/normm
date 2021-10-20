import React from 'react';
import styled from 'styled-components';

export function RoundBtn({
    children,
    classList,
    onClick = () => { }
}) {
    const CLASS_LIST = ["btn", "rounded-btn"];
    const className = CLASS_LIST.concat(classList);
    return (
        <StyledRoundBtn onClick={onClick} className={className}>
            {children}
        </StyledRoundBtn>
    );
}

const Btns = {
    RoundBtn,
}

export default Btns;

const StyledRoundBtn = styled.button`
    color:${props => props.theme.color.foreground};
    border-radius: 9.9rem;
    padding:1.4rem;
    border:0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing:border-box;
    cursor:pointer;
    background-color:${props => props.theme.color.primary};
    font-size:${props => props.theme.font.size.paragraph2};
    font-family:${props => props.theme.font.family};
    &.danger{
        background-color:${props => props.theme.color.danger};
    }
`;