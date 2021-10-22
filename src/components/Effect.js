import React from 'react';
import styled from 'styled-components';

function ShiningEffect({ children, start, passive = true, width = 20, duration = 2, intense = 0.8, onClick }) {
    const childernOfChildren = children.props.children;
    const style = {
        ...children?.props?.style,
        overflow: 'hidden',
    };
    const classList = [];
    if (start) classList.push("start");
    if (!start && passive) classList.push("passive");
    return (
        (() => {
            return React.cloneElement(children, {
                onClick: children?.props?.onClick || onClick,
                style: {
                    ...style,
                },
            }, [
                (() => { return childernOfChildren })(),
                <StyledShiningEffect className={classList.join(' ')} duration={duration} intense={intense} width={width}>
                    <div className="shining"></div>
                </StyledShiningEffect>
            ]
            )
        })()
    );
}

export default ShiningEffect;

const StyledShiningEffect = styled.div`
    pointer-events: none;
    position:absolute;
    left:-100%;
    top:-1%;
    z-index:2;
    width:100%;
    display:flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    clip-path: polygon(80% 0%, 100% 0%, 20% 100%, 0% 100%);
    mix-blend-mode:overlay;
    &::after{
        content:"";
        display: block;
        padding-top:101%;
    }
    &.passive{
        animation:${props => props.duration}s shine infinite running ease-in-out;
        @keyframes shine{
            0%{
                left:-100%;
                opacity:0.05;
            }
            50%{
                opacity:${props => props.intense};
            }
            100%{
                left:100%;
                opacity:0.05;
            }
        }
    }
    &:not(.passive){
        transition:left ${props => props.duration}s ease-in-out;
        &.start{
            left:100%;
        }
    }
`;