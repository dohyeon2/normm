const INITIAL_STATE = null;

const SET_USER = 'user/SET_USER';

export const setUser = (data) => ({ type: SET_USER, payload: data });

export default function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...action.payload
            };
        default:
            return state;
    }
}