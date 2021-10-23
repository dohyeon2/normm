import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Tag from '../components/Tag';
import { readIWC } from '../apis/iwc';
import IWC from '../components/IWC';
import { useHistory } from 'react-router';
import IWCmodal from '../components/Modal';
import useLoading from '../hook/useLoading';
import useTournament from '../hook/useTournament';
import useRedirect from '../hook/useRedirect';

function makeTagObject(label, checked = false) {
    return {
        label: label,
        checked: checked,
    }
}

function Main() {
    const { setLoading } = useLoading();
    const { setPush } = useRedirect();
    const { generateIWCTournament } = useTournament();
    const TAG_LIST = [
        makeTagObject("#랜덤"),
        makeTagObject("#인기순"),
        makeTagObject("#최신순"),
        makeTagObject("#좋아요_누른_월드컵"),
        makeTagObject("#댓글_단_월드컵"),
        makeTagObject("#내가_만든_월드컵"),
        makeTagObject("#내_친구가_만든_월드컵"),
    ];
    const INITIAL_STATE = {
        tagList: TAG_LIST,
        loading: false,
        data: null,
        error: false,
        popup: false,
        paged: 1,
        posts_per_page: 10,
    };
    const INITIAL_SEARCH_STATE = {
        width: 40,
        on: false,
        data: null,
    };
    const inputRef = useRef();
    const inputSearchTimeout = useRef(0);
    const [state, setState] = useState(INITIAL_STATE);
    const [search, setSearchState] = useState(INITIAL_SEARCH_STATE);
    const history = useHistory();
    const onPopup = (e, IWC) => {
        setState(s => ({
            ...s,
            popup: IWC,
        }));
    }
    const closePopup = () => {
        setState(s => ({
            ...s,
            popup: false,
        }))
    }
    const startTournament = async (idx, round) => {
        const res = await generateIWCTournament(idx, round);
        setPush('/tournament/' + res.data.tournament_id);
    }
    useEffect(() => {
        if (state.data === null) {
            setState(s => ({
                ...s,
                loading: true,
            }));
            setLoading(true);
        }
        if (state.loading) {
            (async () => {
                const IWCs = await readIWC({
                    paged: state.paged,
                    offset: state.posts_per_page * (state.paged - 1),
                    posts_per_page: state.posts_per_page
                });
                setState(s => ({
                    ...s,
                    loading: false,
                    data: IWCs.data,
                }));
                setLoading(false);
            })();
        } else {
            setLoading(false);
        }
    }, [state.loading, history.location.key]);
    const searchIconClickHandler = (e) => {
        const isBtn = e.target.classList.contains("btn") || e.target.classList.contains("btn-img");
        if (isBtn) {
            let width = 40;
            if (search.on === false) {
                width += inputRef.current.getBoundingClientRect().width;
            }
            setSearchState(s => ({
                ...s,
                on: !s.on,
                width: width,
            }));
        }
    }
    const searchInput = async (e) => {
        const value = e.target.value;
        clearTimeout(inputSearchTimeout.current);
        inputSearchTimeout.current = await (new Promise((resolve) => {
            inputSearchTimeout.current = setTimeout(() => {
                resolve(true);
            }, 500);
        }));
        if (value === "") {
            setSearchState(s => ({
                ...s,
                data: null,
            }));
            return;
        }
        const data = await readIWC({
            query: {
                s: value,
            }
        });
        setSearchState(s => ({
            ...s,
            data: data.data,
        }));
    }
    const searchIconAttr = {
        onClick: searchIconClickHandler,
        className: [].join(" "),
        style: {
            width: search.width,
        }
    };
    const isSearched = (search.on && search.data);
    return (
        <StyledMain>
            <div className="tag-container">
                {state.tagList?.map((tag, idx) => <Tag key={idx} label={tag.label} />)}
            </div>
            <div className="iwc-list">
                {!isSearched && state.data?.posts?.map(x => <IWC key={x.id} {...x} onClick={(e) => { onPopup(e, x) }} />)}
                {isSearched && search.data?.posts?.map(x => <IWC key={x.id} {...x} onClick={(e) => { onPopup(e, x) }} />)}
            </div>
            {state.popup && <IWCmodal {...state.popup} closeModal={closePopup} startTournament={startTournament} />}
            <StyledFloatBtns>
                <StyledSearchBtn {...searchIconAttr}>
                    <div className="input" ref={inputRef} >
                        <input type="text" disabled={!search.on} onChange={searchInput} />
                    </div>
                    <div className="btn">
                        <img className="btn-img" src="/images/search_circle_icon.png" />
                    </div>
                </StyledSearchBtn>
                <StyledCircleBtn onClick={() => {
                    setPush('/making')
                }}><img src="/images/plus_circle_icon.png" /></StyledCircleBtn>
            </StyledFloatBtns>
        </StyledMain>
    );
}

export default Main;

const StyledFloatBtns = styled.div`
    position:fixed;
    right: 2rem;
    bottom:2rem;
    margin:0 -0.5rem;
    display:flex;
    z-index:3;
`;

const StyledSearchBtn = styled.button`
    display:flex;
    cursor:auto;
    align-items: center;
    justify-content:flex-end;
    padding:0;
    background-color: transparent;
    border:0;
    border-radius: 9.9rem;
    margin:0 0.5rem;
    width:auto;
    overflow: hidden;
    height:40px;
    width:40px;
    transition: width 1s ease-in-out;
    position:relative;
    .input{
        position:absolute;
        display:flex;
        margin:0;
        max-width:400px;
        width:calc(100vw - 80px - 4.5rem);
        height:100%;
        right:40px;
        input{
            padding:1rem;
            box-sizing:border-box;
            margin:0;
            width:100%;
            height:100%;
            border:0;
            border-radius: 9.9rem 0 0 9.9rem ;
            font-size:${props => props.theme.font.size.paragraph2};
            color: ${props => props.theme.color.primary};
            font-weight: ${props => props.theme.font.weight.extraBold};
            &:active{
                border:0;
            }
            &:focus{
                border:2px solid ${props => props.theme.color.primary};
                outline:0;
            }
        }
    }
    .btn{
        position: relative;
        cursor:pointer;
        display:flex;
        background-color: ${props => props.theme.color.primary};
    }
`;

const StyledCircleBtn = styled.button`
    cursor:pointer;
    padding:0;
    background-color: transparent;
    border:0;
    margin:0 0.5rem;
`;

const StyledMain = styled.div`
    padding:1.5rem;
    margin-top: -1.5rem;
    .tag-container{
        display: flex;
        margin: 0 -0.65rem;
        .tag{
            white-space: nowrap;
            margin:0 0.5rem;
        }
    }
    .iwc-list{
        padding:2.4rem 0;
        margin:0 -1rem;
        display: flex;
        flex-wrap:wrap;
        .IWC-item{
            flex-shrink: 0;
            margin: 0 1rem;
            width: calc(100% - 2rem);
            max-width: unset;
            margin-bottom:2rem;
            @media screen and (min-width:${props => props.theme.mobileBreakPoint * 0.8}px){
                width:calc(50% - 2rem);
                max-width:calc(50% - 2rem);
            }
            @media screen and (min-width:${props => props.theme.mobileBreakPoint * 1.2}px){
                width:calc(33.3% - 2rem);
                max-width:calc(33.3% - 2rem);
            }
            @media screen and (min-width:${props => props.theme.mobileBreakPoint * 2}px){
                width:calc(25% - 2rem);
                max-width:calc(25% - 2rem);
            }
        }
    }
`;