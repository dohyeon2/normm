import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useTournament from '../hook/useTournament';
import useLoading from '../hook/useLoading';
import styled from 'styled-components';
import Competitor from '../components/Competitor';
import Statistic from '../components/StatisticComponent';

function Tournament() {
    const { id } = useParams();
    const { getTournament, updateTournament, setTournamentData, tournamentData } = useTournament();
    const { setLoading } = useLoading();
    const timedout = useRef(false);
    const timeoutHandler = useRef(null);
    const intervalHandler = useRef(null);
    const INITIAL_STATE = {
        loading: true,
        data: null,
        error: false,
    }
    const INITIAL_MATCH = {
        winnerSide: null,
    };
    const [state, setState] = useState(INITIAL_STATE);
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
                setTournamentData(tournament.data);
            }
        })();
        return () => {
            clearInterval(intervalHandler.current);
            clearInterval(timeoutHandler.current);
        }
    }, [state.loading]);
    useEffect(() => {
        window.onresize = () => {
            
        };
        return () => {
            window.onresize = null;
        }
    }, []);
    if (state.loading || !state.data) return null;
    if (state.data.tournament.is_done) return (
        <Statistic data={state.data.tournament} />
    );
    const competitors = state.data.tournament.current_match;
    const leftSideCompetitor = competitors[0];
    const rightSideCompetitor = competitors[1];
    const initialize = () => {
        setMatch(INITIAL_MATCH);
        timedout.current = false;
    }
    const setPick = async (side) => {
        const sideIdx = side === "right" ? 1 : 0;
        setMatch(s => ({
            ...s,
            winnerSide: side,
        }));
        updateTournament(id, sideIdx);
        timeoutHandler.current = setTimeout(() => {
            if (state.data.tournament.is_final_match) {
                setLoading(true);
            }
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
        winnerSide: match.winnerSide,
        imageReadyHandler
    }
    return (
        <>
            <StyledTournament className={(!imageLoaded ? "loading" : "")}>
                <Competitor side={"left"} {...leftSideCompetitor} {...competitiorAttrs} />
                <Competitor side={"right"} {...rightSideCompetitor} {...competitiorAttrs} />
            </StyledTournament>
        </>
    );
}

export default Tournament;

const StyledTournament = styled.div`
    display:flex;
    margin:2rem;
    margin-top:0;
    flex-grow: 1;
    transform:scale(1);
    transition: opacity .5s ease-in-out, transform .5s ease-in-out;
    opacity: 1;
    height:100%;
    position:relative;
    /* .competitor{
        position:absolute;
        width: 50%;
        height:100%;
    } */
    &.loading{
        transition: opacity .5s ease-in-out, transform .5s ease-in-out;
        opacity: 0;
        transform: scale(0.7);
    }
`;