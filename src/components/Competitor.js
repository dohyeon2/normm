import React from 'react';
import styled from 'styled-components';
import { StyledSubmitBtn } from '../pages/Making';

function Competitor({
    name,
    src,
    side,
    winnerSide,
    imageReadyHandler,
    setPopup = () => { },
    setPick = () => { }
}) {
    const pickBtnClickHandler = () => {
        !winnerSide && setPick(side);
    }
    const imageClickHandler = () => {
        !winnerSide && setPopup(true, { src: src, name: name })
    }
    const competitorClass = ["competitor", (side ? `side-${side}` : "")];
    const pickBtnClass = ["can-submit", (side ? `side-${side}` : "")];
    if (winnerSide !== null) {
        if (winnerSide === side) {
            competitorClass.push("winner");
        } else {
            competitorClass.push("loser");
        }
    }
    return (
        <StyledCompetitor className={competitorClass.join(" ")}>
            <div className='image'
                style={{
                    backgroundImage: `url(${src})`
                }}
                onClick={imageClickHandler}
            >
                <img className="img-handler" src={src} alt="" onLoad={imageReadyHandler}/>
                <div className="name">{name}</div>
            </div>
            <StyledPickBtn className={pickBtnClass.join(" ")} onClick={pickBtnClickHandler}>
                <span><img src="/images/pick-btn.png" /></span>
            </StyledPickBtn>
        </StyledCompetitor>
    );
}

export default Competitor;

const StyledCompetitor = styled.div`
    display:flex;
    flex-direction:column;
    overflow:hidden;
    transition:filter .2s ease-in-out;
    box-sizing:border-box;
    &.side-right{
        .image{
            border-radius:0 2.2rem 0 0;
        }
        border-left:2px solid ${props => props.theme.color.primary};
    }
    &.side-left{
        border-radius:2.2rem 0 0 2.2rem;
        .image{
            border-radius:2.2rem 0 0 0;
        }
        border-right:2px solid ${props => props.theme.color.primary};
    }
    .image{
        transition: filter .2s ease-in-out, border .2s ease-in-out;
        position:relative;
        background-size: cover;
        flex-grow:1;
        cursor:zoom-in;
        box-sizing:border-box;
        &.loser{
            filter:brightness(40%);
        }
        .img-handler{
            opacity:0;
            position:absolute;
            width:100%;
            bottom:0;
            top:0;
        }
        .name{
            position:absolute;
            bottom:2rem;
            left:0;
            right:0;
            text-align:center;
            font-size:${props => props.theme.font.size.paragraph4};
            font-weight:${props => props.theme.font.weight.extraBold};
            color:${props => props.theme.color.foreground};
            filter:drop-shadow(3px 3px 4px rgb(0,0,0));
        }
    }
    .can-submit{
        transition: filter .2s ease-in-out;
    }
    &.winner{
        .image{
            border:4px solid ${props => props.theme.color.primary};
        }
    }
    &.loser{
        filter:brightness(40%);
        .can-submit{
            pointer-events:none;
            filter:grayscale(100%);
        }
    }
`;
const StyledPickBtn = styled(StyledSubmitBtn)`
    flex-shrink:0;
    span{
        padding:1.3rem;
        height:100%;
        box-sizing:border-box;
        img{
            position:relative;
            top:0rem;
            transition:transform .2s ease-in-out, top .2s ease-in-out;
            height:100%;
        }
    }
    &:active{
        img{
            top:0.5rem;
            transform:scale(1.1);
        }
    }
    &:hover{
        img{
            transform:scale(1.2);
        }
    }
    &.side-left{
        &::before{
            border-image:${props => props.theme.borderImage.bottomLeft} 27 fill / 27px;
        }
    }
    &.side-right{
        &::before{
            border-image:${props => props.theme.borderImage.bottomRight} 27 fill / 27px;
        }
    }
`;