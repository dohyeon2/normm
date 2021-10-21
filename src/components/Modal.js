import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Thumbnail, StyledTitle } from './IWC';
import { StyledSubmitBtn } from '../pages/Making';
import Select from './Select';
import axios from 'axios';

function IWCmodal({
    thumbnail_left,
    thumbnail_right,
    title,
    description,
    available_rounds,
    closeModal = () => { },
}) {
    const INITIAL_STATE = {
        roundIdx: 0,
    };
    const [state, setState] = useState(INITIAL_STATE);
    const container = useRef();
    const selectCallback = (idx) => {
        setState(s => ({
            ...s,
            roundIdx: idx,
        }));
        
    };
    return (
        <StyledIWCModalConatiner ref={container} onClick={(e) => {
            if (e.target === container.current) {
                closeModal();
            }
        }}>
            <div className="modal">
                <Thumbnail thumbnail_left={thumbnail_left} thumbnail_right={thumbnail_right} />
                <StyledTitle className="title">{title}</StyledTitle>
                <p className="description">{description}</p>
                <Select options={available_rounds.map(x => x + '강')} value={state.roundIdx} selectCallback={selectCallback} />
                <StyledSubmitBtnIWCModal className="can-submit"><span>시작하기</span></StyledSubmitBtnIWCModal>
            </div>
        </StyledIWCModalConatiner>
    );
}

export default IWCmodal;

const StyledSubmitBtnIWCModal = styled(StyledSubmitBtn)`
    margin:0;
    width:100%;
`;

const StyledIWCModalConatiner = styled.div`
    position: fixed;
    left:0;
    bottom:0;
    right:0;
    top:0;
    z-index:99;
    background-color: rgba(0,0,0,.7);
    display: flex;
    justify-content: center;
    align-items: center;
    .modal{
        max-width:600px;
        width:100%;
        margin:0 1.5rem;
        background-color: ${props => props.theme.color.background};
        border-radius:20px;
        .thumbnail{
            margin-bottom:0;
        }
        .title{
            padding:1rem;

        }
        .description{
            font-size:${props => props.theme.font.size.paragraph2};
            font-weight:${props => props.theme.font.weight.light};
            color:${props => props.theme.color.gray100};
            margin:0;
            padding:1rem;
            padding-top:0;
        }
    }
`;