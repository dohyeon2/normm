import React from 'react';
import styled from 'styled-components';
import { IconBtn } from './Btns';

export function Thumbnail({
    onClick,
    thumbnail_left,
    thumbnail_right,
}) {
    return (
        <StyledThumbnail className="thumbnail" onClick={onClick}>
            <div className="thumbnail-wrap">
                <div className="thumbnail-img thumbnail-left"
                    style={{ backgroundImage: `url("${thumbnail_left}")` }} />
                <div className="thumbnail-img thumbnail-right"
                    style={{ backgroundImage: `url("${thumbnail_right}")` }} />
            </div>
            <img className="versus-icon" src="/images/versus_icon.png" alt="" />
        </StyledThumbnail>
    );
}

function IWC({
    title,
    author,
    onClick,
    thumbnail_left,
    thumbnail_right,
}) {
    const classList = ["IWC-item"];
    return (
        <StyledIWCItem className={classList}>
            <Thumbnail thumbnail_left={thumbnail_left} thumbnail_right={thumbnail_right} onClick={onClick} />
            <StyledTitle>{title}</StyledTitle>
            <div className="info">
                <div className="left">
                    <div className="author">
                        <div className="author-img" style={{
                            backgroundImage: `url("${author.image}")`
                        }} />
                        <div className="author-name">{author.name}</div>
                    </div>
                </div>
                <div className="right">
                    <div className="data">
                        <IconBtn iconType="like" color="danger">0</IconBtn>
                        <IconBtn iconType="comment">0</IconBtn>
                    </div>
                </div>
            </div>
        </StyledIWCItem>
    );
}

export default IWC;

const StyledThumbnail = styled.div`
        cursor: pointer;
        width:100%;
        display: flex;
        border-radius:20px;
        overflow: hidden;
        position: relative;
        margin-bottom:0.8rem;
        &::before{
            content:"";
            padding-top:56.81%;
        }
        .thumbnail-wrap{
            z-index:2;
            position:absolute;
            top:0;
            left:0;
            bottom:0;
            right:0;
            display: flex;
        }
        .thumbnail-img{
            width: 50%;
            height:100%;
        }
        .versus-icon{
            display: block;
            width:100px;
            position: absolute;
            top:50%;
            left:50%;
            z-index:3;
            transform: translate(-50%,-50%);
        }
`;
export const StyledTitle = styled.div`
        font-size:${props => props.theme.font.size.paragraph3};
        font-weight:${props => props.theme.font.weight.bold};
        color:${props => props.theme.color.secondary};
        margin-bottom:0.5rem;
`;
const StyledIWCItem = styled.div`
    max-width:355px;
    width: 100%;
    .info{
        padding:0.25rem;
        display: flex;
        justify-content: space-between;
        .author{
            display: flex;
            align-items: center;
        }
        .author-img{
            width:32px;
            height:32px;
            border-radius: 99px;
            background-color: ${props => props.theme.color.gray100};
            margin-right:0.65rem;
        }
        .author-name{
            font-size:${props => props.theme.font.size.paragraph2};
            font-weight:${props => props.theme.font.weight.bold};
            color:${props => props.theme.color.gray100};
        }
        .right .data{
            display: flex;
            align-items: center;
        }
    }
`;