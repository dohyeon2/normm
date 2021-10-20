import React, { useState } from 'react';
import styled from 'styled-components';
import Input from './Input';
import { RoundBtn } from './Btns';

function Candidate({
    theme = "making",
    src = "",
    name = "",
    state = "normal",
    nameChangeHandler = () => { },
    imageChangeHandler = () => { },
    deleteHandler = () => { },
}) {
    const STATE_CAPTIONS = {
        uploading: "업로드 중..."
    };
    const classList = ["candidate"];
    if (state === "uploading") classList.push("uploading");
    switch (theme) {
        case "making":
        default:
            return (
                <StyledCandidate className={classList} >
                    <div className={"image"} style={{
                        backgroundImage: `url(${src})`,
                    }}>
                        <div className="state">{STATE_CAPTIONS[state]}</div>
                    </div>
                    <div className="info">
                        <Input label="이름" value={name} onInput={nameChangeHandler} />
                        <div className="controls">
                            <RoundBtn className={["change-btn"]} onClick={imageChangeHandler}>
                                <img className="icon" src="/images/change_icon.png" alt="" />
                                이미지 변경
                            </RoundBtn>
                            <RoundBtn classList={["delete-btn", "danger"]} onClick={deleteHandler}>
                                <img className="icon" src="/images/delete_icon.png" alt="" />
                                삭제
                            </RoundBtn>
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
        .state{
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
    .controls{
        display: flex;
        align-items: center;
        margin:0 -0.6rem;
        .btn{
            .icon{
                margin-right:0.7rem;
            }
            display: flex;
            flex-grow: 1;
            flex-basis: 0;
            margin:0 1.2rem;
        }
    }
`;