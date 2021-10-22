import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useLoading from '../hook/useLoading';
import useIWC from '../hook/useIWC';
import { ShareBtn, StyledTransprentBtn } from '../components/Btns';
import Input from '../components/Input';
import { Author } from '../components/Profile';
import { IconBtn } from '../components/Btns';
import { StyledList, StyledSubmitBtn } from './Making';
import Container from '../components/Container';
import Comment, { CommentEditor } from '../components/Comment';
import useComment from '../hook/useComment';
import Candidate from '../components/Candidate';
import useCnadidate from '../hook/useCandidate';
import { ImageEnlargeModal } from '../components/Modal';
import ShiningEffect from '../components/Effect';

function Statistic({
  data
}) {
  const INITIAL_STATE = {
    loading: true,
    commentsLoading: true,
    statisticLoading: true,
    data: null,
    error: false,
    page: 1,
    statisticPage: 1,
    search: null,
  };
  const INITIAL_SECTION = {
    comment: false,
    statistic: false,
  }
  const appbarHeight = useRef(0);
  const winnerRef = useRef(null);
  const infoSection = useRef();
  const statisticSection = useRef();
  const navigatorRef = useRef();
  const commentSection = useRef(null);
  const { getCandidates, searchCandidates } = useCnadidate();
  const { insertComment, getComment } = useComment();
  const { getIWC } = useIWC();
  const { setLoading } = useLoading();
  const [state, setState] = useState(INITIAL_STATE);
  const [comments, setComments] = useState([]);
  const [candidates, setCandidates] = useState({
    candidates: [],
  });
  const [section, setSection] = useState(INITIAL_SECTION);
  const resize = () => {
    const height = window.innerHeight;
    appbarHeight.current = document.querySelector('#appbar').clientHeight;
    if (winnerRef.current) {
      winnerRef.current.style.height = (height - appbarHeight.current) + "px";
    }
  }
  const sectionInViewPort = (section, sectionRef, e) => {
    if (!sectionRef) return;
    const curr = e.target.scrollTop + appbarHeight.current;
    const height = window.innerHeight;
    const start = top(sectionRef) - height + appbarHeight.current;
    const end = start + sectionRef.offsetHeight + height - appbarHeight.current;
    if (curr > start && curr < end) {
      setSection(s => ({
        ...s,
        [section]: true,
      }));
    } else {
      setSection(s => ({
        ...s,
        [section]: false,
      }));
    }
  }
  const scroll = (e) => {
    sectionInViewPort('comment', commentSection.current, e);
    sectionInViewPort('statistic', statisticSection.current, e);
  }
  const top = ((el) => {
    let result = 0;
    let flag = true;
    if (!el) {
      return;
    }
    while (flag) {
      result += el?.offsetTop;
      el = el.offsetParent;
      if (el === document.body) {
        flag = false;
      }
    }
    return result;
  });
  useEffect(() => {
    if (state.loading) {
      (async () => {
        const IWCRes = await getIWC({
          id: data.IWC
        });
        setState(s => ({
          ...s,
          data: IWCRes.data,
          loading: false,
        }));
        setLoading(false);
      })();
    }
    if (state.commentsLoading) {
      (async () => {
        const commentRes = await getComment({
          post_id: data.IWC,
          paged: state.page
        });
        setComments(commentRes.data);
        setState(s => ({
          ...s,
          commentsLoading: false,
        }));
      })();
    }
    resize();
    window.onresize = resize;
    document.querySelector('#app').onscroll = scroll;
    return () => {
      window.onresize = null;
      document.querySelector('#app').onscroll = null;
    }
  }, [state.loading, state.commentsLoading]);
  useEffect(() => {
    if (state.statisticLoading) {
      (async () => {
        const candidatesRes = await getCandidates({
          post_id: data.IWC,
          paged: state.statisticPage
        });
        setCandidates(candidatesRes?.data);
        setState(s => ({
          ...s,
          statisticLoading: false,
        }));
      })();
    }
  }, [state.statisticLoading]);
  const toSectionClickHandler = (to, additional = 0) => (e) => {
    document.querySelector('#app').scrollTo({
      top: top(to) + additional - appbarHeight.current,
      behavior: 'smooth',
    });
  }
  const getPageList = useCallback((type) => {
    const pageList = [];
    let curr = type?.current_page * 1;
    let start = -2;
    while (pageList.length < 5 && pageList.slice(-1) < type?.max_page) {
      if (curr + start >= 1 && curr + start <= type?.max_page) {
        pageList.push(curr + start);
      }
      start++;
    }
    return pageList;
  }, []);
  const pageList = getPageList(comments);
  const statisticpageList = getPageList(candidates);
  const getCommentByPage = (page) => () => {
    setState(s => ({
      ...s,
      commentsLoading: true,
      page: page,
    }));
  }
  const getStatisticByPage = (page) => () => {
    setState(s => ({
      ...s,
      statisticLoading: true,
      statisticPage: page,
    }));
  }
  const submitCommentHandler = async (value) => {
    try {
      const res = await insertComment(state.data.IWC.id, value);
      setComments(s => ({
        ...s,
        comments: [
          {
            id: res.data.id,
            date: Date.now(),
            content: value,
            author: {
              name: "익명"
            }
          },
          ...s.comments,
        ]
      }));
    } catch (e) {
      e?.respone?.data?.message && window.alert(e.respone.data.message);
    }
  };
  const searchCandidatesHandler = async (e) => {
    const search = e?.target?.value;
    setState(s => ({
      ...s,
      search: search,
    }));
    const res = await searchCandidates({
      post_id: data.IWC,
      s: search,
    });
    setCandidates(res.data);
  }
  if (state.loading || !state.data) return null;
  return (
    <StyledStatistic>
      <ImageEnlargeModal src={data.winner.src} name={data.winner.name}>
        <ShiningEffect start={false} passive={true} duration={6} intense={0.3}>
          <div className="winner" ref={winnerRef} style={{
            backgroundImage: `url("${data.winner.src}")`
          }}>
            <div className="winner-name">
              <img className="my-pick-icon" src="/images/my_pick_icon.png" alt="" />
              <span>
                <span>{data.winner.name}</span>
              </span>
            </div>
          </div>
        </ShiningEffect>
      </ImageEnlargeModal>
      <div className="statistic" ref={infoSection}>
        <button className="to-bottom-btn" onClick={toSectionClickHandler(infoSection.current)}>
          <img src="/images/bottom-icon.png" alt="" />
        </button>
        <div>

          <div className="title-share">
            <div className="left">
              <div className="iwc-title">
                {state.data.IWC.title}
              </div>
              <div className="iwc-description">
                {state.data.IWC.description}
              </div>
            </div>
            <div className="right">
              <ShareBtn shareContent={window.location.href} />
            </div>
          </div>

          <div className="maker-reaction">
            <Author {...state.data.IWC.author} />
            <div className="reaction">
              <IconBtn iconType="play">{0}</IconBtn>
              <IconBtn iconType="like">{0}</IconBtn>
              <IconBtn iconType="report">신고</IconBtn>
            </div>
          </div>

          <div className="navigator" ref={navigatorRef} style={{
            top: appbarHeight.current + 15
          }}>
            <StyledNavLeftBtn className={(section.comment ? "active" : "")} onClick={toSectionClickHandler(commentSection.current, -navigatorRef.current?.offsetHeight - 24)}>
              <span>댓글 {comments.number}</span>
            </StyledNavLeftBtn>
            <StyledNavRightBtn className={(section.statistic ? "active" : "")} onClick={toSectionClickHandler(statisticSection.current, -navigatorRef.current?.offsetHeight - 24)}>
              <span>통계 {candidates?.number}</span>
            </StyledNavRightBtn>
          </div>
          <div ref={commentSection} style={{ marginBottom: '2rem' }} >
            <Container>

              <div className="head">
                <CommentEditor submitCommentHandler={submitCommentHandler} />
              </div>
              <div>
                {comments?.comments?.map((x, i) => <Comment collapse={false} array_idx={i} key={x.id} content={x.content} id={x.id} liked={x.liked} name={x.author.name} />)}
              </div>
              <div className="page-indicator">
                {pageList.map((x, i) => <StyledIndicator className={x === comments.current_page * 1 ? "current" : ""} key={i} onClick={getCommentByPage(x)}>{x}</StyledIndicator>)}
              </div>
            </Container>
          </div>
          <div ref={statisticSection} >
            <Container>
              <Input theme="search" placeholder="검색" onInput={searchCandidatesHandler} value={state.search} />
              <StyledListStatistic>
                {candidates?.candidates?.map((candidate, idx) =>
                  <Candidate
                    idx={(state.statisticPage - 1) * 10 + idx}
                    highlighted={data?.winner.id === candidate.id}
                    key={candidate.id}
                    theme="ranking"
                    src={candidate.src}
                    name={candidate.name}
                    {...candidate}
                  />)}
              </StyledListStatistic>
              <div className="page-indicator">
                {statisticpageList.map((x, i) => <StyledIndicator className={x === candidates.current_page * 1 ? "current" : ""} key={i} onClick={getStatisticByPage(x)}>{x}</StyledIndicator>)}
              </div>
            </Container>
          </div>

        </div>
      </div>
    </StyledStatistic >
  );
}

export default Statistic;

const StyledListStatistic = styled(StyledList)`
    label{
      font-size:${props => props.theme.font.size.paragraph2};
    }
    .value{
      font-size:${props => props.theme.font.size.paragraph4};
    }
`;

const StyledNavBtn = styled(StyledSubmitBtn)`
  height:70px;
`;
const StyledNavLeftBtn = styled(StyledNavBtn)`
  &.active{
    border-image:${props => props.theme.borderImage.left} 50 50 50 50 fill / 50px 50px 54.5px 54.5px;
  }
  background-color:${props => props.theme.color.gray600};
  border-radius:50px 0 0 50px;
  border-right:1px solid ${props => props.theme.color.gray800};
  color:${props => props.theme.color.foreground};
  cursor: pointer;
`;
const StyledNavRightBtn = styled(StyledNavBtn)`
  &.active{
    border-image:${props => props.theme.borderImage.right} 50 50 50 50 fill / 54.5px 54.5px 50px 50px ;
  }
  border-left:1px solid ${props => props.theme.color.gray100};
  background-color:${props => props.theme.color.gray600};
  color:${props => props.theme.color.foreground};
  border-radius:0 50px 50px 0;
  cursor: pointer;
`;

const StyledIndicator = styled(StyledTransprentBtn)`
    padding:1rem 1.3rem;
    &.current{
      background-color:${props => props.theme.color.primary};
    }
`;

const StyledStatistic = styled.div`
  border-radius: 1.8rem 1.8rem 0 0;
  display:flex;
  flex-grow: 1;
  flex-direction: column;
  width:100%;
  & > * {
    flex-shrink: 0;
  }
  .container{
    overflow:hidden;
  }
  .head{
    background-color:${props => props.theme.color.gray800};
    padding:2rem;
    box-sizing:border-box;
    margin:-1.3rem;
    margin-bottom:2rem;
  }
  .maker-reaction,
  .title-share{
    margin-bottom:2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .navigator{
    display: flex;
    position: sticky;
    top:0;
    z-index:4;
    margin-bottom:2rem;
  }
  .reaction{
    display:flex;
    .icon{
      height:18px;
    }
  }
  .iwc-title{
    color: ${props => props.theme.color.secondary};
    font-size:${props => props.theme.font.size.paragraph4};
  }
  .iwc-description{
    color: ${props => props.theme.color.gray100};
    font-size:${props => props.theme.font.size.paragraph2};
  }
  .winner{
    width: 100%;
    border-radius: 1.8rem 1.8rem 0 0;
    position: relative;
    height: 100%;
    background-size: cover;
    background-position: center;
    display:flex;
    justify-content:center;
    border:4px solid ${props => props.theme.color.primary};
    box-sizing:border-box;
    .winner-name{
      &::before{
        content:"";
        display:block;
        position:absolute;
        left:0;
        right:0;
        top:0;
        bottom:0;
        border-image:${props => props.theme.borderImage.round} 50 fill / 50px;
      }
      .my-pick-icon{
        display:block;
        position:absolute;
        bottom:calc(100% + 3rem);
        margin:0 auto;
        transform-origin: center;
        transform:scale(0.8);
        animation:3s ease-in-out infinite alternate heartBeat;
        @keyframes heartBeat{
            0%{
              transform:scale(0.8);
            }
            25%{
              transform:scale(1);
            }
            50%{
              transform:scale(0.8);
            }
            75%{
              transform:scale(1);
            }
            100%{
              transform:scale(0.8);
            }
        }
      }
      align-items:center;
      display:flex;
      justify-content: center;
      width:calc(100% - 2rem);
      max-width:700px;
      box-sizing:border-box;
      z-index:2;
      position:absolute;
      bottom:8.7rem;
      border-radius:50px;
      margin:0 auto;
      text-align: center;
      & > span{
        padding:2rem;
        overflow:hidden;
        position:relative;
        top:2;
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        border-radius:50px;
        font-size:${props => props.theme.font.size.paragraph4};
        font-weight:${props => props.theme.font.weight.extraBold};
        color ${props => props.theme.color.foreground};
      }
    }
  }
  .statistic{
    z-index:2;
    position:relative;
    margin-top:-5.7rem;
    background-color: ${props => props.theme.color.background};
    border-radius: 1.8rem 1.8rem 0 0;
    padding:2rem;
    .candidate .info{
      padding:3rem 2rem;
    }
    .input-text{
      margin-bottom:1.5rem;
    }
    .to-bottom-btn{
      display:block;
      margin:0 auto;
      background-color:transparent;
      border:0;
      padding: 0;
      cursor: pointer;
      margin-bottom:2rem;
    }
  }
`;