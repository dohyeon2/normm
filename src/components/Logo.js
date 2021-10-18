import React from 'react';
import styled from 'styled-components';

function Logo() {
    return (
        <StyledLogo src="/images/logo.png" alt="normm" />
    );
}

export default Logo;

const StyledLogo = styled.img`

    height:36px;

    @media screen and (min-width:${props => props.theme.mobileBreakPoint}px){
        height: 60px;
    }
`;