import axios from 'axios';
import API from '../vars/api';
import useLoading from './useLoading';
import { useDispatch, useSelector } from 'react-redux';
import { setTournamentData as setTournament } from '../redux/global';

function useTournament() {
    const { globalReducer } = useSelector(s => s);
    const tournamentData = globalReducer.tournamentData;
    const dispatch = useDispatch();
    const { setLoading } = useLoading();
    const setTournamentData = (data) => {
        dispatch(setTournament(data));
    }
    const generateIWCTournament = async (id, round) => {
        setLoading(true);
        try {
            const IWCTournament = await axios.post(API.IWCTournament, {
                IWCId: id,
                round: round
            });
            return IWCTournament;
        } catch (e) {
            window.alert(e?.response?.data?.message);
            setLoading(false);
            return false;
        }
    }
    const getTournament = async (hash_id) => {
        try {
            const IWCTournament = await axios.get(API.IWCTournament + `/${hash_id}`);
            return IWCTournament;
        } catch (e) {
            window.alert(e?.response?.data?.message);
            setLoading(false);
            return e;
        }
    }
    const updateTournament = async (hash_id, winnerSide) => {
        try {
            const IWCTournament = await axios.put(API.IWCTournament + `/${hash_id}`, {
                winnerSideIdx: winnerSide,
            });
            return IWCTournament;
        } catch (e) {
            window.alert(e?.response?.data?.message);
            setLoading(false);
            return e;
        }
    }
    return { generateIWCTournament, getTournament, updateTournament, setTournamentData, tournamentData };
}

export default useTournament;