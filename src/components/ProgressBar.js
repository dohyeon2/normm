import React from 'react';
import styled from 'styled-components';

function ProgressBar({ children, percent }) {
    return (
        <StyledProgressBarContainer>
            <div className="caption-2">{children}</div>
            <div className="caption">{`${percent}%`}</div>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{
                    width: `${percent}%`
                }}></div>
            </div>
        </StyledProgressBarContainer>
    );
}

export default ProgressBar;

const StyledProgressBarContainer = styled.div`
    display:flex;
    align-items:center;
    position:relative;
    .caption{
        font-size:${props => props.theme.font.size.paragraph2};
        position:absolute;
        right:1rem;
    }
    .caption-2{
        font-size:${props => props.theme.font.size.paragraph2};
        position:absolute;
        right:1rem;
        bottom:calc(100% + 0.8rem);
        color: ${props => props.theme.color.primary};
    }
    .progress-bar-container{
        position:relative;
        width:100%;
        height:2rem;
        background-color: ${props => props.theme.color.gray800};
        border-radius:99px;
        .progress-bar{
            height:100%;
            background-color: ${props => props.theme.color.primary};
            border-radius:inherit;
            overflow:hidden;
            position:relative;
        }
    }
`;