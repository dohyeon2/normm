import axios from 'axios';
import API from '../vars/api';
import { setUser } from '../redux/user';
import { useSelector, useDispatch } from 'react-redux';

function useUser() {
    const dispatch = useDispatch();
    const { user } = useSelector(s => s);
    const LOGIN_API = API.login;
    const GET_USER_API = API.user;
    const AuthorizationHeader = {
        Authorization: "Bearer " + localStorage.getItem("normm_token"),
    }
    const refreshUser = async () => {
        const userRes = await axios.get(GET_USER_API + "/me", {
            headers: {
                ...AuthorizationHeader
            }
        });
        dispatch(setUser(userRes.data));
    }
    const loginToWordpress = async (data) => {
        const res = await axios.post(LOGIN_API, data);
        localStorage.setItem("normm_token", res.data.JWT.data.token);
        const userRes =  await axios.get(GET_USER_API + "/me", {
            headers: {
                Authorization: "Bearer " + res.data.JWT.data.token,
            }
        });
        dispatch(setUser(userRes.data));
    }
    const getUser = async (id) => {
        const userRes = await axios.get(GET_USER_API + "/" + id);
        return userRes.data;
    }
    return { loginToWordpress, user, getUser, AuthorizationHeader, refreshUser };
}

export default useUser;