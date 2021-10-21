import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

function Loading({ loading = true }) {
    const lottieContainer = useRef();
    const animation = useRef();
    const classList = [];
    if (loading) classList.push("loading");
    useEffect(() => {
        animation.current = window.lottie.loadAnimation({
            container: lottieContainer.current, // Required
            path: '/lottie/normm_loading.json', // Required
            renderer: 'svg', // Required
            loop: true, // Optional
            autoplay: true, // Optional
            name: "Hello World", // Name for future reference. Optional.
        });
        return () => {
            animation.current.destroy();
        }
    }, []);
    return (
        <StyledLoadingContainer className={classList}>
            <div className="lottie-container" ref={lottieContainer}></div>
        </StyledLoadingContainer>
    );
}

export default Loading;

const StyledLoadingContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top:0;
    left:0;
    bottom:0;
    right:0;
    transition: opacity .5s ease-in-out;
    opacity: 0;
    pointer-events: none;
    background-color: ${props => props.theme.color.primary};
    z-index:999;
    .lottie-container{
        max-width: 300px;
        width: 100%;
        max-height: 300px;
    }
    &.loading{
        opacity: 1;
    }
`;