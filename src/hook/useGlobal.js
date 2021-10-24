import { setModal as modalHandler } from '../redux/global';
import { useDispatch } from 'react-redux';

function useGlobal() {
    const dispatch = useDispatch();
    const setModal = (on, data, modalType) => {
        dispatch(modalHandler(on, data, modalType));
        console.log(data);
    }
    return { setModal };
}

export default useGlobal;