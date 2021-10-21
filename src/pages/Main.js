import React, { useEffect, useState } from 'react';
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
    };
    const [state, setState] = useState(INITIAL_STATE);
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
                const IWCs = await readIWC({});
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
    return (
        <StyledMain>
            <div className="tag-container">
                {state.tagList?.map((tag, idx) => <Tag key={idx} label={tag.label} />)}
            </div>
            <div className="iwc-list">
                {state.data?.posts?.map(x => <IWC key={x.id} {...x} onClick={(e) => { onPopup(e, x) }} />)}
            </div>
            {state.popup && <IWCmodal {...state.popup} closeModal={closePopup} startTournament={startTournament} />}
        </StyledMain>
    );
}

export default Main;

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