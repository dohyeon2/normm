import React from 'react';
import styled from 'styled-components';

function Container({ children }) {
    const classList = ["container"];
    return (
        <StyledContainer className={classList}>
            {children}
        </StyledContainer>
    );
}

export default Container;

const StyledContainer = styled.div`
    padding:1.4rem;
    border-radius: 1.6rem;
    background-color: ${props => props.theme.color.gray850};
`;