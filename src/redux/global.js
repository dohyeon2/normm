const INITIAL_STATE = {
    loading: true,
    modal: {
        on: false,
        src: null,
        name: null,
    },
    tournamentData: null,
};

const SET_LOADING = 'global/SET_LOADING';
const SET_TOURNAMNET_DATA = 'global/SET_TOURNAMENT_DATA';
const SET_MODAL = 'global/SET_MODAL';

export const setLoading = (loading) => ({ type: SET_LOADING, payload: loading });
export const setTournamentData = (data) => ({ type: SET_TOURNAMNET_DATA, payload: data });
export const setModal = (on, src, name) => ({ type: SET_MODAL, payload: { on: on, src: src, name: name } })

export default function globalReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case SET_TOURNAMNET_DATA:
            return {
                ...state,
                tournamentData: action.payload
            };
        case SET_MODAL:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...action.payload,
                }
            };
        default:
            return state;
    }
}