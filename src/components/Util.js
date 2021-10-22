import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

function Collapse({ children, className, collapse }) {
    const ref = useRef(null);
    const INITIAL_STATE = {
        height: 0,
        marginBottom: 0,
    };
    const [state, setState] = useState(INITIAL_STATE);
    useEffect(() => {
        if (ref.current) {
            const mb = parseInt(window.getComputedStyle(ref.current.firstChild).getPropertyValue('margin-bottom'));
            setState(s => ({
                ...s,
                height: ref.current.firstChild.clientHeight,
                marginBottom: mb,
            }));
        }
    }, [children]);
    return (
        <StyledCollapse className={className} ref={ref} style={{
            height: (collapse ? 0 : state.height),
            marginBottom: state.marginBottom,
            boxSizing: 'border-box'
        }}>
            {children}
        </StyledCollapse>
    );
}

export default Collapse;

const StyledCollapse = styled.div`
    position:relative;
    overflow:hidden;
    transition:height .2s ease-in-out;
    &>*{
        position:relative;
    }
`;