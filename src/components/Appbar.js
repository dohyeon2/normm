import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

function Appbar() {
    return (
        <StyledAppbar>
            <div className="left">
                <Logo />
            </div>
            <div className="right"></div>
        </StyledAppbar>
    );
}

export default Appbar;

const StyledAppbar = styled.div`

    padding: 20px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    //min-width 800px
    @media screen and (min-width:${props => props.theme.mobileBreakPoint}px){
        padding: 40px 50px;
    }
`;