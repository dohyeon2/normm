import { setModal as modalHandler } from '../redux/global';
import { useDispatch } from 'react-redux';

function useGlobal() {
    const dispatch = useDispatch();
    const setModal = (on, src, name) => {
        dispatch(modalHandler(on, src, name));
    }
    return { setModal };
}

export default useGlobal;