import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Profile from './Profile';
import Input, { StyledLabel } from './Input';
import Collapse from './Util';
import { IconBtn } from './Btns';
import useComment from '../hook/useComment';
import useUser from '../hook/useUser';

export function CommentEditor({
  submitCommentHandler,
}) {
  const INITIAL_STATE = {
    canSubmit: false,
    value: "",
  };
  const { user } = useUser();
  const [state, setState] = useState(INITIAL_STATE);
  const submitBtnOnHandler = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setState(s => ({
        ...s,
        canSubmit: true,
        value: value
      }));
    } else {
      setState(s => ({
        ...s,
        canSubmit: false,
        value: value
      }));
    }
  }
  const commentSubmit = () => {
    submitCommentHandler(state.value);
    setState(s => ({
      ...s,
      canSubmit: false,
      value: "",
    }));
  }
  return (
    <>
      <StyledComment style={{
        marginBottom: !state.canSubmit ? '0rem' : '2rem'
      }} onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commentSubmit();
        }
      }}>
        <Profile id={user?.id} image={user?.profile_image} onlyImage={true} size={'5rem'} />
        <Input theme="textarea" label={user?.name || "익명"} placeholder="댓글 입력" onInput={submitBtnOnHandler} value={state.value} />
      </StyledComment>
      <Collapse collapse={!state.canSubmit} className="comment-btn-container">
        <StyledSubmitBtn onClick={commentSubmit}>등록</StyledSubmitBtn>
      </Collapse>
    </>
  )
};

function Comment({
  image,
  name = "name",
  content = "content",
  id,
  array_idx,
  isUserLiked,
  liked,
  collapse: collapseOn,
  inViewPort = true
}) {
  const { reactionComment } = useComment();
  const { user } = useUser();
  const [state, setState] = useState({
    isUserLiked: isUserLiked,
    liked: liked,
  });
  const [collapse, setCollapse] = useState(true);
  useEffect(() => {
    inViewPort && setTimeout(() => {
      setCollapse(false);
    }, (200 * array_idx));
  }, []);
  const reacttionHandler = (type) => async () => {
    if (type === "liked") {
      if (!user) return;
      setState(s => ({
        isUserLiked: !s.isUserLiked,
        liked: s.liked + (s.isUserLiked ? -1 : 1)
      }));
    }
    await reactionComment(id, type);
  }
  return (
    <Collapse collapse={collapseOn ? collapse : false}>
      <StyledComment>
        <Profile image={image} onlyImage={true} size={'5rem'} />
        <div className="content-container">
          <StyledLabel className="name">{name}</StyledLabel>
          <div className="content">{content}</div>
          <div className="reaction">
            <IconBtn iconType="like" onClick={reacttionHandler('liked')}>{state.liked}</IconBtn>
            <IconBtn iconType="report" onClick={reacttionHandler('report')}>신고</IconBtn>
          </div>
        </div>
      </StyledComment>
    </Collapse>
  );
}

export default Comment;

const StyledSubmitBtn = styled.button`
    position:absolute;
    color: ${props => props.theme.color.secondary};
    font-size:${props => props.theme.font.size.paragraph2};
    background-color: ${props => props.theme.color.primary};
    font-weight:${props => props.theme.font.weight.extraBold};
    padding:0.8rem;
    border:0;
    border-radius:1rem;
    max-width:200px;
    width:100%;
    cursor:pointer;
    transition: filter .2s ease-in-out;
    &:hover{
      filter:brightness(70%);
    }
`;

const StyledComment = styled.div`
  display:flex; 
  align-items: flex-start;
  margin-bottom:2rem;
  transition: margin-bottom .3s ease-in-out;
  &+.comment-btn-container{
    display:flex;
    justify-content:flex-end;
  }
  .input{
    flex-grow:1;
    width:100%;
    max-width:unset;
    label{
      color: ${props => props.theme.color.secondary};
      font-size:${props => props.theme.font.size.paragraph2};
    }
    textarea{
      height:1rem;
      overflow-y:hidden;
      resize:none;
    }
    textarea,
    input{
      width:100%;
      border-bottom-color:${props => props.theme.color.gray850};
    }
  }
  .content-container{
    margin-top:0.3rem;
    .name{
      color: ${props => props.theme.color.secondary};
      font-size:${props => props.theme.font.size.paragraph2};
      font-weight:${props => props.theme.font.weight.extraBold};
    }
    .content{
      margin-top:0.8rem;
      word-break:break-all;
      font-size:${props => props.theme.font.size.paragraph2};
      color:${props => props.theme.color.foreground};
    }
  }
  .profile{
    flex-shrink: 0;
    flex-grow:0;
    margin-right: 2rem;
  }
`;