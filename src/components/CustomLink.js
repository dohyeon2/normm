import React from 'react';
import styled from 'styled-components';
import useRedirect from '../hook/useRedirect';

function CustomLink({ to, children }) {
    const { setPush } = useRedirect();
    return (
        <StyledCustomLink onClick={() => {
                setPush(to);
        }}>
            {children}
        </StyledCustomLink>
    );
}

export default CustomLink;

const StyledCustomLink = styled.span`
    cursor:pointer;
    display:inline-block;
`;