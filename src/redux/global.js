const INITIAL_STATE = {
    loading: false,
};

const SET_LOADING = 'global/SET_LOADING';

export const setLoading = (loading) => ({ type: SET_LOADING, payload: loading });

export default function globalReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
}