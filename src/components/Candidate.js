import React, { useState } from 'react';
import styled from 'styled-components';
import Input from './Input';

function Candidate({
    theme = "making",
    src = "",
    name = "",
    status = "normal"
}) {
    const STATUS_CAPTIONS = {
        uploading: "업로드 중..."
    };
    const classList = ["candidate"];
    if (status === "uploading") classList.push("uploading");
    switch (theme) {
        case "making":
        default:
            return (
                <StyledCandidate className={classList} >
                    <div className={"image"} style={{
                        backgroundImage: `url(${src})`,
                    }}>
                        <div className="status">{STATUS_CAPTIONS[status]}</div>
                    </div>
                    <div className="info">
                        <Input label="이름" value={name} />
                        <div className="controls">

                        </div>
                    </div>
                </StyledCandidate>
            );
    }
}

export default Candidate;

const StyledCandidate = styled.div`
    display: flex;
    width:100%;
    margin:0 2rem 2rem;
    border-radius: 1.6rem;
    overflow: hidden;
    box-sizing:border-box;
    border:1px solid ${props => props.theme.color.gray800};
    &.uploading{
        .image{
            opacity: 0.5;
        }
    }
    .image{
        display: flex;
        width:35%;
        flex-shrink:0;
        background-size: cover;
        background-repeat:no-repeat;
        border-radius: 1.6rem;
        justify-content: center;
        align-items: center;
        .status{
            font-size:${props => props.theme.font.size.paragraph2};
            font-weight:${props => props.theme.font.weight.bold};
            color:${props => props.theme.color.gray800};
            user-select:none;
        }
        &::before{
            content:"";
            display: block;
            padding-top:100%;
        }
    }
    .info{
        display:flex;
        flex-grow:1;
        box-sizing:border-box;
        flex-direction:column;
        justify-content: space-between;
        padding:1.4rem;
    }
`;