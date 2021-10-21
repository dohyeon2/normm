import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useLoading from '../hook/useLoading';
import useIWC from '../hook/useIWC';
import { ShareBtn } from './Btns';
import { Author } from './Profile';
import { IconBtn } from './Btns';
import { StyledSubmitBtn } from '../pages/Making';
import Container from './Container';

function Statistic({
  data
}) {
  const INITIAL_STATE = {
    loading: true,
    data: null,
    error: false,
  };
  const { getIWC } = useIWC();
  const { setLoading } = useLoading();
  const statisticSection = useRef();
  const [state, setState] = useState(INITIAL_STATE);
  useEffect(() => {
    if (state.loading) {
      (async () => {
        const IWC = await getIWC({
          id: data.IWC
        });
        setState(s => ({
          ...s,
          data: IWC.data,
          loading: false,
        }));
        setLoading(false);
      })();
    }
  }, [state.loading]);
  const toSectionClickHandler = (to) => (e) => {
    document.querySelector('#app').scrollTo({
      top: to.offsetTop,
      behavior: 'smooth',
    });
  }
  if (state.loading || !state.data) return null;
  return (
    <StyledStatistic>
      <div className="winner" style={{
        backgroundImage: `url("${data.winner.src}")`
      }}>
        <div className="winner-name">
          <img className="my-pick-icon" src="/images/my_pick_icon.png" alt="" />
          <img className="icon" src="/images/heart_icon.png" alt="" />
          <span>{data.winner.name}</span>
          <img className="icon" src="/images/heart_icon.png" alt="" />
        </div>
      </div>
      <div className="statistic" ref={statisticSection}>
        <button className="to-bottom-btn" onClick={toSectionClickHandler(statisticSection.current)}>
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
              <IconBtn iconType="comment">{0}</IconBtn>
              <IconBtn iconType="report">신고</IconBtn>
            </div>
          </div>

          <div className="navigator">
            <StyledNavLeftBtn>
              <span>댓글 {0}</span>
            </StyledNavLeftBtn>
            <StyledNavRightBtn>
              <span>통계</span>
            </StyledNavRightBtn>
          </div>

          <Container>
          </Container>

        </div>
      </div>
    </StyledStatistic >
  );
}

export default Statistic;

const StyledNavLeftBtn = styled(StyledSubmitBtn)`
  &.active{
    border-image:${props => props.theme.borderImage.left} 50 50 50 50 fill / 50px 50px 54.5px 54.5px;
  }
  background-color:${props => props.theme.color.gray600};
  border-radius:50px 0 0 50px;
  border-right:1px solid ${props => props.theme.color.gray800};
  color:${props => props.theme.color.foreground};
  cursor: pointer;
`;
const StyledNavRightBtn = styled(StyledSubmitBtn)`
  &.active{
    border-image:${props => props.theme.borderImage.right} 50 50 50 50 fill / 54.5px 54.5px 50px 50px ;
  }
  border-left:1px solid ${props => props.theme.color.gray100};
  background-color:${props => props.theme.color.gray600};
  color:${props => props.theme.color.foreground};
  border-radius:0 50px 50px 0;
  cursor: pointer;
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
    .winner-name{
      .my-pick-icon{
        position:absolute;
        bottom:calc(100% + 1rem);
        left:50%;
        transform:translate(-50%,0);
      }
      .icon{
        height:1.8rem;
      }
      align-items:center;
      display:flex;
      justify-content: space-between;
      width:100%;
      max-width:700px;
      z-index:2;
      position:absolute;
      bottom:8.7rem;
      border-radius:99px;
      margin:0 1rem;
      padding:2rem;
      text-align: center;
      font-size:${props => props.theme.font.size.paragraph4};
      font-weight:${props => props.theme.font.weight.extraBold};
      background-color:${props => props.theme.color.foreground};
    }
  }
  .statistic{
    z-index:2;
    position:relative;
    margin-top:-5.7rem;
    background-color: ${props => props.theme.color.background};
    border-radius: 1.8rem 1.8rem 0 0;
    padding:2rem;
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