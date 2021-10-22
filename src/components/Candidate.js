import React from 'react';
import styled from 'styled-components';
import Input from './Input';
import { RoundBtn } from './Btns';
import ProgressBar from './ProgressBar';
import ShiningEffect from '../components/Effect';

function Candidate({
    theme = "making",
    src = "",
    name = "",
    state = "normal",
    participate_count,
    mypick_count,
    win_count,
    highlighted,
    idx,
    match_count,
    nameChangeHandler = () => { },
    imageChangeHandler = () => { },
    deleteHandler = () => { },
}) {
    const STATE_CAPTIONS = {
        uploading: "업로드 중..."
    };
    const classList = ["candidate"];
    const mypickRate = participate_count === 0 ? 0 : (mypick_count * 100 / participate_count);
    const winRate = match_count === 0 ? 0 : (win_count * 100 / match_count);
    if (state === "uploading") classList.push("uploading");
    switch (theme) {
        case "ranking":
            return (<StyledCandidate className={classList} >
                <div className="ranking">{idx + 1}</div>
                <ShiningEffect start={!highlighted} passive={highlighted}>
                    <div className={["image", (highlighted ? "highlighted" : "")].join(" ")} style={{
                        backgroundImage: `url(${src})`,
                    }}>
                        {highlighted && <img className="my-pick-icon" src="/images/my_pick_icon.png" />}
                    </div>
                </ShiningEffect>
                <div className="info">
                    <Input label="이름" value={name} onInput={nameChangeHandler} theme={"readonly"} />

                    <Input label="매치 승률" value={
                        <ProgressBar percent={winRate.toFixed(1)} >{`${win_count}/${match_count}`}</ProgressBar>
                    } onInput={nameChangeHandler} theme={"readonly"} />

                    <Input label="토너먼트 승률" value={<ProgressBar percent={mypickRate.toFixed(1)} >{`${mypick_count}/${participate_count}`}</ProgressBar>} onInput={nameChangeHandler} theme={"readonly"} />
                </div>
            </StyledCandidate >);
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
    position:relative;
    .ranking{
        position:absolute;
        left:1rem;
        top:1rem;
        z-index:3;
        font-size:${props => props.theme.font.size.paragraph3};
        font-weight:${props => props.theme.font.weight.bold};
        color:${props => props.theme.color.foreground};
        background-color:${props => props.theme.color.primary};
        padding:0.6rem 1rem 0.3rem;
        border-radius:1rem;
    }
    &.uploading{
        .image{
            opacity: 0.5;
        }
    }
    .image{
        background-position: center;
        /* display: flex; */
        width:35%;
        min-width:200px;
        flex-shrink:0;
        background-size: cover;
        background-repeat:no-repeat;
        border-radius: 1.6rem;
        /* justify-content: center;
        align-items: center; */
        position:relative;
        .my-pick-icon{
            position:absolute;
            max-width:80%;
            bottom:3rem;
            width:80%;
            left:50%;
            transform: translate(-50%);
        }
        &.highlighted{
            box-sizing:border-box;
            border:4px solid ${props => props.theme.color.primary};
            position:relative;
            overflow:hidden;
        }
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