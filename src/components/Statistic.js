import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useLoading from '../hook/useLoading';

function Statistic({
  data
}) {
  const { setLoading } = useLoading();
  const statisticSection = useRef();
  useEffect(() => {
    setLoading(false);
  }, []);
  const toSectionClickHandler = (to) => (e) => {
    console.log(to.offsetTop);
    window.scrollTo({
      top: to.offsetTop,
      behavior: 'smooth',
    });
  }
  return (
    <StyledStatistic>
      <div className="winner" style={{
        backgroundImage: `url("${data.winner.src}")`
      }}>
        <div className="winner-name"></div>
      </div>
      <div className="statistic" ref={statisticSection}>
        <button className="to-bottom-btn" onClick={toSectionClickHandler(statisticSection.current)}>
          <img src="/images/bottom-icon.png" alt="" />
        </button>
        <div>
          
        </div>
      </div>
    </StyledStatistic>
  );
}

export default Statistic;

const StyledStatistic = styled.div`
  border-radius: 1.8rem 1.8rem 0 0;
  display:flex;
  flex-grow: 1;
  flex-direction: column;
  width:100%;
  & > * {
    flex-shrink: 0;
  }
  .winner{
    width: 100%;
    border-radius: 1.8rem 1.8rem 0 0;
    position: relative;
    height: 100%;
    background-size: cover;
    background-position: center;
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
    }
  }
`;