import React from 'react';
import styled from 'styled-components';
import { IconBtn, RoundBtn } from './Btns';
import { Author } from './Profile';
import useRedirect from '../hook/useRedirect';

export function Thumbnail({
    onClick,
    thumbnail_left,
    thumbnail_right,
    children = <></>
}) {
    const childrenModifying = () => {
        return React.cloneElement(children, {
            style: {
                ...children?.props?.style,
                position: 'absolute',
                zIndex: 2,
            }
        });
    }
    return (
        <StyledThumbnail className="thumbnail">
            <div className="thumbnail-wrap" onClick={onClick}>
                <div className="thumbnail-img thumbnail-left"
                    style={{ backgroundImage: `url("${thumbnail_left}")` }} />
                <div className="thumbnail-img thumbnail-right"
                    style={{ backgroundImage: `url("${thumbnail_right}")` }} />
                <img className="versus-icon" src="/images/versus_icon.png" alt="" />
            </div>
            {childrenModifying()}
        </StyledThumbnail>
    );
}

function IWC({
    title,
    author,
    onClick,
    id,
    comment_count = 0,
    liked_count = 0,
    play_count = 0,
    thumbnail_left,
    thumbnail_right,
}) {
    const { setPush } = useRedirect();
    const classList = ["IWC-item"];
    return (
        <StyledIWCItem className={classList}>
            <Thumbnail thumbnail_left={thumbnail_left} thumbnail_right={thumbnail_right} onClick={onClick} >
                <StyledIWCControl>
                    <RoundBtn onClick={() => {
                        setPush(`/making/${id}`)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                        </svg>
                    </RoundBtn>
                </StyledIWCControl>
            </Thumbnail>
            <StyledTitle>{title}</StyledTitle>
            <div className="info">
                <div className="left">
                    <Author {...author} />
                </div>
                <div className="right">
                    <div className="data">
                        <IconBtn iconType="play">{play_count}</IconBtn>
                        <IconBtn iconType="like">{liked_count}</IconBtn>
                        <IconBtn iconType="comment">{comment_count}</IconBtn>
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
            background-size:cover;
            background-position: center;
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
        .right .data{
            display: flex;
            align-items: center;
        }
    }
`;

const StyledIWCControl = styled.div`
    padding:1rem;
    right:0;
    bottom:0;
    button{
        padding:1rem;
    }
`;