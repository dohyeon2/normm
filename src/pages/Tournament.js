import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useTournament from '../hook/useTournament';
import useLoading from '../hook/useLoading';
import styled from 'styled-components';
import Competitor from '../components/Competitor';
import { CompetitorModal } from '../components/Modal';
import Statistic from '../components/Statistic';

function Tournament() {
    const { id } = useParams();
    const { getTournament, updateTournament } = useTournament();
    const { setLoading } = useLoading();
    const timedout = useRef(false);
    const timeoutHandler = useRef(null);
    const intervalHandler = useRef(null);
    const INITIAL_STATE = {
        loading: true,
        data: null,
        error: false,
    }
    const INITIAL_POPUP = {
        on: false,
        data: null,
    }
    const INITIAL_MATCH = {
        winnerSide: null,
    };
    const [state, setState] = useState(INITIAL_STATE);
    const [popup, setPopupState] = useState(INITIAL_POPUP);
    const [match, setMatch] = useState(INITIAL_MATCH);
    const [imageLoaded, setimageLoaded] = useState(false);
    useEffect(() => {
        (async () => {
            const tournament = await getTournament(id);
            if (tournament instanceof Error) {
                setState(s => ({
                    ...s,
                    loading: false,
                    error: tournament,
                }));
            } else {
                setState(s => ({
                    ...s,
                    loading: false,
                    data: tournament.data,
                }));
            }
        })();
        if (state.data?.tournament?.is_done) {
            setLoading(true);
        }
        return () => {
            clearInterval(intervalHandler.current);
            clearInterval(timeoutHandler.current);
        }
    }, [state.loading]);
    if (state.loading || !state.data) return null;
    if (state.data.tournament.is_done) return (
        <Statistic data={state.data.tournament} />
    );
    const competitors = state.data.tournament.current_match;
    const leftSideCompetitor = competitors[0];
    const rightSideCompetitor = competitors[1];
    const setPopup = (on, data) => {
        setPopupState(s => ({
            ...s,
            on: on,
            data: data,
        }));
    }
    const closePopup = () => {
        setPopup(false, null);
    }
    const initialize = () => {
        setMatch(INITIAL_MATCH);
        timedout.current = false;
    }
    const setPick = async (side) => {
        const sideIdx = side === "right" ? 1 : 0;
        // const winner = competitors[sideIdx];
        setMatch(s => ({
            ...s,
            winnerSide: side,
        }));
        updateTournament(id, sideIdx);
        timeoutHandler.current = setTimeout(() => {
            setimageLoaded(false);
            clearTimeout(timeoutHandler.current);
            timeoutHandler.current = setTimeout(() => {
                timedout.current = true;
                clearTimeout(timeoutHandler.current);
            }, 250);
        }, 2000);
        intervalHandler.current = setInterval(() => {
            if (timedout.current) {
                initialize();
                setState(s => ({
                    ...s,
                    loading: true,
                }));
                clearInterval(intervalHandler.current);
                clearTimeout(timeoutHandler.current);
            }
        }, 500);
    }
    const imageReadyHandler = () => {
        setLoading(false);
        setimageLoaded(true);
    }
    const competitiorAttrs = {
        setPick,
        setPopup,
        winnerSide: match.winnerSide,
        imageReadyHandler
    }
    return (
        <>
            <StyledTournament className={(!imageLoaded ? "loading" : "")}>
                <Competitor side={"left"} {...leftSideCompetitor} {...competitiorAttrs} />
                <Competitor side={"right"} {...rightSideCompetitor} {...competitiorAttrs} />
            </StyledTournament>
            {popup.on && <CompetitorModal {...popup.data} closeModal={closePopup} />}
        </>
    );
}

export default Tournament;

const StyledTournament = styled.div`
    display:flex;
    padding:2rem;
    flex-grow: 1;
    transform:scale(1);
    transition: opacity .5s ease-in-out, transform .5s ease-in-out;
    opacity: 1;
    .competitor{
        width: 50%;
        height:100%;
    }
    &.loading{
        transition: opacity .5s ease-in-out, transform .5s ease-in-out;
        opacity: 0;
        transform: scale(0.7);
    }
`;