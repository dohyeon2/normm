import React from 'react';
import styled from 'styled-components';
import KakaoLogin from 'react-kakao-login';
import useUser from '../hook/useUser';

export function ShareBtn({
    shareContent,
}) {
    const shareContentCopy = () => {
        navigator.clipboard.writeText(shareContent);
        window.alert("클립보드에 주소가 복사됐습니다.\n원하는 곳에 붙여넣기 하세요.");
    }
    return (<StyledShareBtn onClick={shareContentCopy}>
        <img src="/images/share_icon.png" />
    </StyledShareBtn>);
}

export function RoundBtn({
    children,
    classList,
    onClick = () => { }
}) {
    const CLASS_LIST = ["btn", "rounded-btn"];
    const className = CLASS_LIST.concat(classList);
    return (
        <StyledRoundBtn onClick={onClick} className={className}>
            {children}
        </StyledRoundBtn>
    );
}

export function IconBtn({
    children,
    iconType,
    color = "foreground",
    onClick
}) {
    const ICON = {
        "like": "/images/heart_icon.png",
        "comment": "/images/comment_icon.png",
        "play": "/images/play_icon.png",
        "report": "/images/report_icon.png"
    };
    if (!ICON[iconType]) return null;
    return (<StyledIconBtn onClick={onClick} color={color}>
        <img className="icon" src={ICON[iconType]} alt="" />
        <div className="content">{children}</div>
    </StyledIconBtn>);
}

const Btns = {
    RoundBtn,
}

export default Btns;

const StyledShareBtn = styled.button`
    padding:0;
    margin:0;
    border:0;
    background-color: transparent;
    cursor: pointer;
`;

const StyledRoundBtn = styled.button`
    color:${props => props.theme.color.foreground};
    border-radius: 9.9rem;
    padding:1.4rem;
    border:0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing:border-box;
    cursor:pointer;
    background-color:${props => props.theme.color.primary};
    font-size:${props => props.theme.font.size.paragraph2};
    font-family:${props => props.theme.font.family};
    &.danger{
        background-color:${props => props.theme.color.danger};
    }
`;

const StyledIconBtn = styled.button`
    cursor:pointer;
    display: flex;
    align-items: center;
    background-color: transparent;
    border:0;
    padding:0.6rem;
    margin:0;
    .icon{
        margin-right: 0.6rem;
        height:18px;
    }
    .content{
        color:${props => props.theme.color[props.color]};
        font-size:${props => props.theme.font.size.paragraph};
        font-family:${props => props.theme.font.family};
        font-weight:${props => props.theme.font.weight.regular};
    }
`;

export const StyledTransprentBtn = styled(StyledRoundBtn)`
    background-color:transparent;
`;


export const StyledSubmitBtn = styled.button`
        display: flex;
        position:sticky;
        bottom:0;
        align-items: center;
        justify-content: center;
        width: 100%;
        height:7rem;
        border:0;
        padding:0;
        background-color:transparent;
        border-radius:0 0 1.6rem 1.6rem;
        font-size:${props => props.theme.font.size.paragraph4};
        font-weight:${props => props.theme.font.weight.bold};
        color:${props => props.theme.color.gray800};
        cursor: not-allowed;
        border-top:1px solid ${props => props.theme.color.gray800};
        background-color:${props => props.theme.color.gray850};
        box-sizing:border-box;
        span{
            position: relative;
        }
        &.can-submit{
            cursor: pointer;
            span{
                color:${props => props.theme.color.foreground};
            }
            &::before{
                content:"";
                position: absolute;
                left:0;
                bottom:0;
                top:0;
                right:0;
                box-sizing:border-box;
                border-image:${props => props.theme.borderImage.bottom} 27 fill / 27px;
            }
        }
`;

export const LoginBtn = () => {
    const { loginToWordpress } = useUser();
    return (
        <StyledLoginBtn
            token={"7e09235127b06fe7f53d2062cb52adbe"}
            onSuccess={(res) => { loginToWordpress(res.profile) }}
            onFail={console.error}
            onLogout={console.info}
            style={{}}
        >
            <img src="/images/kakao_login_medium.png" alt="" />
        </StyledLoginBtn>

    )
}

const StyledLoginBtn = styled(KakaoLogin)`
        cursor: pointer;
        padding:0;
        border:0;
        margin:0;
        display:flex;
        background-color: transparent;
        cursor: pointer;
`;