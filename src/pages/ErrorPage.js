import React, { useEffect } from 'react';
import styled from 'styled-components';
import { RoundBtn } from '../components/Btns';
import useRedirect from '../hook/useRedirect';
import useLoading from '../hook/useLoading';

export function Error404() {
  const { setPush } = useRedirect();
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <StyledError404>
      <img src="/images/404.png" />
      <h1>요청하신 페이지를 찾을 수 없습니다!</h1>
      <RoundBtn onClick={() => {
        setPush('/');
      }}>홈으로</RoundBtn>
    </StyledError404>
  )
}

const StyledError404 = styled.div`
  display:flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img{
    max-width:404px;
    width:100%;
    margin-bottom:2rem;
  }
  .rounded-btn{
    font-size:${props => props.theme.font.size.paragraph3};
    font-weight: ${props => props.theme.font.weight.bold};
  }
  h1{
    color:${props => props.theme.color.primary};
    font-size:${props => props.theme.font.size.paragraph4};
    margin-bottom:2rem;
  }
`;