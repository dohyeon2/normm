import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Profile from './Profile';

function Appbar() {
    return (
        <StyledAppbar>
            <div className="left">
                <Logo />
            </div>
            <div className="right">
                <Profile />
            </div>
        </StyledAppbar>
    );
}

export default Appbar;

const StyledAppbar = styled.div`
    font-family: 'NanumSquare';
    padding: 2rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position:sticky;
    border-radius:0 0 1.2rem 1.2rem;
    background-color: ${props => props.theme.color.background};
    z-index:99;
    top:0;

    /* //min-width 800px
    @media screen and (min-width:${props => props.theme.mobileBreakPoint}px){
        padding: 40px 50px;
    } */
`;