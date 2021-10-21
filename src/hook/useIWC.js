import axios from 'axios';
import useLoading from './useLoading';
import API from '../vars/api';

const IWC_API = API.IWC;

function useIWC() {
    const { setLoading } = useLoading();
    const getIWC = async ({ id = false, query = {} }) => {
        const queryArr = Object.keys(query).map(key => `${key}=${query[key]}`);
        const queryExist = queryArr.length !== 0;
        const API_URI = IWC_API + (id ? `/${id}` : '') + (queryExist ? `?` + queryArr.join("&") : "");
        try {
            const res = await axios.get(API_URI);
            return res;
        } catch (e) {
            e.response.message && window.alert(e.response.message);
        }
    }
    return { getIWC };
}

export default useIWC;