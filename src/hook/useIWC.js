import API from "../vars/api";
import axios from "axios";
import useUser from "./useUser";

const IWC_API = API.IWC;

function useIWC() {
    const { AuthorizationHeader, user } = useUser();
    const getIWC = async ({ id = false, query = {} }) => {
        const queryArr = Object.keys(query).map(key => `${key}=${query[key]}`);
        const queryExist = queryArr.length !== 0;
        const API_URI = IWC_API + (id ? `/${id}` : '') + (queryExist ? `?` + queryArr.join("&") : "");
        try {
            const res = await axios.get(API_URI, {
                headers: user && {
                    ...AuthorizationHeader,
                }
            });
            return res;
        } catch (e) {
            e.response.message && window.alert(e.response.message);
            return false;
        }
    }
    const reactionIWC = async (IWC_id, type) => {
        const res = await axios.put(IWC_API, {
            IWC_id: IWC_id,
            action: 'reaction',
            type: type
        }, {
            headers: user && {
                ...AuthorizationHeader,
            }
        });
        return res;
    };
    return { getIWC, reactionIWC };
}

export default useIWC;