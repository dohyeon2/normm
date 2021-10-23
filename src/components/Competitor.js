import React from 'react';
import ShiningEffect from '../components/Effect';
import { ImageEnlargeModal } from './Modal';
import styled from 'styled-components';
import { StyledSubmitBtn } from '../pages/Making';

function Competitor({
    name,
    src,
    side,
    winnerSide,
    imageReadyHandler,
    style,
    setPick = () => { }
}) {
    const pickBtnClickHandler = () => {
        !winnerSide && setPick(side);
    }

    const competitorClass = ["competitor", (side ? `side-${side}` : "")];
    const pickBtnClass = ["can-submit", (side ? `side-${side}` : "")];
    let winner = false;
    if (winnerSide !== null) {
        if (winnerSide === side) {
            winner = true;
            competitorClass.push("winner");
        } else {
            winner = false;
            competitorClass.push("loser");
        }
    }
    return (
        <ShiningEffect start={winner} passive={false}>
            <StyledCompetitor className={competitorClass.join(" ")} style={style}>
                <ImageEnlargeModal src={src} name={name}>
                    <div className='image'
                        style={{
                            backgroundImage: `url(${src})`
                        }}
                    >
                        <img className="img-handler" src={src} alt="" onLoad={imageReadyHandler} />
                        <div className="name">{name}</div>
                    </div>
                </ImageEnlargeModal>
                <StyledPickBtn className={pickBtnClass.join(" ")} onClick={pickBtnClickHandler}>
                    <span>
                        <img src={winner ? "/images/winner_btn.png" : "/images/pick-btn.png"} />
                    </span>
                </StyledPickBtn>
            </StyledCompetitor>
        </ShiningEffect>
    );
}

export default Competitor;

const StyledCompetitor = styled.div`
    display:flex;
    flex-direction:column;
    overflow:hidden;
    transition:filter .4s ease-in-out, width .4s ease-in-out;
    justify-content: space-between;
    box-sizing:border-box;
    position:absolute;
    top:0;
    bottom:0;
    width: 50%;
    &.side-right{
        right:0;
        .image{
            border-radius:0 2.2rem 0 0;
        }
        border-left:2px solid ${props => props.theme.color.primary};
    }
    &.side-left{
        left:0;
        border-radius:2.2rem 0 0 2.2rem;
        .image{
            border-radius:2.2rem 0 0 0;
        }
        border-right:2px solid ${props => props.theme.color.primary};
    }
    .side-right{
        border-radius: 0 0 2.2rem  0;
    }
    .side-left{
        border-radius: 0 0 0 2.2rem;
    }
    .image{
        transition: filter .2s ease-in-out, border .2s ease-in-out;
        position:relative;
        background-size: cover;
        background-position:center;
        flex-grow:1;
        height:100%;
        cursor:zoom-in;
        box-sizing:border-box;
        overflow:hidden;
        &.loser{
            filter:brightness(40%);
        }
        .img-handler{
            opacity:0;
            position:absolute;
            width:100%;
            height:100%;
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
        overflow:hidden;
        display:block;
        span{
            display:block;
        }
    }
    &.winner{
        border:0;
        border-radius:2.2rem;
        z-index:2;
        width:100%;
        .image{
            border-radius:2.2rem 2.2rem 0 0;
            border:4px solid ${props => props.theme.color.primary};
        }
        .side-right,
        .side-left{
            border-radius: 0 0 2.2rem 2.2rem;
            &::before{
                border-image:${props => props.theme.borderImage.bottom} 27 fill / 27px;
            }
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