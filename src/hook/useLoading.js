import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading as loading } from '../redux/global';

function useLoading() {
    const timeoutHandler = useRef();
    const dispatch = useDispatch();
    const setLoading = (value) => {
        if (value === false) {
            timeoutHandler.current = setTimeout(() => {
                dispatch(loading(value));
                clearTimeout(timeoutHandler.current);
            }, 400);
        } else {
            clearTimeout(timeoutHandler.current);
            dispatch(loading(value));
        }
    }
    return { setLoading };
}

export default useLoading;