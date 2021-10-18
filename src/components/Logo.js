import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Logo() {
    return (
        <Link to={"/"}>
            <StyledLogo src="/images/logo.png" alt="normm" />
        </Link>
    );
}

export default Logo;

const StyledLogo = styled.img`

    height:3.6rem;

    @media screen and (min-width:${props => props.theme.mobileBreakPoint}px){
        height: 6rem;
    }
`;