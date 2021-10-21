import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Thumbnail, StyledTitle } from './IWC';
import { StyledSubmitBtn } from '../pages/Making';
import Select from './Select';

export function CompetitorModal({
    src,
    name,
    closeModal
}) {
    const container = useRef();
    return (
        <StyledCompetitorModal ref={container} onClick={(e) => {
            if (e.target === container.current) {
                closeModal();
            }
        }}>
            <button className="close-btn" onClick={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                    <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                </svg>
            </button>
            <img src={src} />
            <div className="name">{name}</div>
        </StyledCompetitorModal>
    )
}

function IWCmodal({
    thumbnail_left,
    thumbnail_right,
    title,
    description,
    available_rounds,
    id,
    startTournament,
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
    const startBtnOnClick = () => {
        startTournament(id, available_rounds[state.roundIdx]);
    }
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
                <StyledSubmitBtnIWCModal className="can-submit" onClick={startBtnOnClick}><span>시작하기</span></StyledSubmitBtnIWCModal>
            </div>
        </StyledIWCModalConatiner>
    );
}

export default IWCmodal;

const StyledCompetitorModal = styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:99;
    overflow-y:auto;
    background-color:rgba(0,0,0,.7);
    .close-btn{
        padding:0;
        margin:0;
        background-color:transparent;
        border:0;
        position:fixed;
        right:2rem;
        top:2rem;
        cursor:pointer;
        filter:drop-shadow(3px 3px 4px rgba(0,0,0,));
        path{
            fill:#fff;
        }
    }
    img{
        display:block;
        width:calc(100% - 4rem);
        margin:4rem auto;
        max-width:1280px;
    }
    .name{
        z-index:2;
        position:fixed;
        bottom:2rem;
        width:100%;
        display:block;
        text-align:center;
        font-size:${props => props.theme.font.size.paragraph4};
        font-weight:${props => props.theme.font.weight.extraBold};
        color:${props => props.theme.color.foreground};
        filter:drop-shadow(3px 3px 4px rgb(0,0,0));
    }
`;

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