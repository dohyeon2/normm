import React from 'react';
import styled from 'styled-components';
import CustomLink from './CustomLink';

function Logo() {
    return (
        <CustomLink to="/">
            <StyledLogo src="/images/logo.png" alt="normm" />
        </CustomLink>
    );
}

export default Logo;

const StyledLogo = styled.img`
    height:3.6rem;
`;