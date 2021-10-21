import { useHistory } from 'react-router';
import useLoading from '../hook/useLoading';

function useRedirect() {
    const history = useHistory();
    const { setLoading } = useLoading();
    const setPush = (to) => {
        if (to !== history.location.pathname) {
            setLoading(true);
            setTimeout(() => {
                history.push(to);
            }, 400);
        }
    }
    return { setPush };
}

export default useRedirect;