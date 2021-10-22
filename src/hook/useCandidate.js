import axios from 'axios';
import API from '../vars/api';

const CANDIDATE_API = API.candidate;

function useCnadidate() {
    const getCandidates = async (query = {}) => {
        const queryArr = Object.keys(query).map(key => `${key}=${query[key]}`);
        const queryExist = queryArr.length !== 0;
        const API_URI = CANDIDATE_API + (queryExist ? `?` + queryArr.join("&") : "");
        try {
            const res = await axios.get(API_URI);
            return res;
        } catch (e) {
            e.response.message && window.alert(e.response.message);
        }
    }
    const searchCandidates = async (query = {}) => {
        const queryArr = Object.keys(query).map(key => `${key}=${query[key]}`);
        queryArr.push("search=1");
        const queryExist = queryArr.length !== 0;
        const API_URI = CANDIDATE_API + (queryExist ? `?` + queryArr.join("&") : "");
        const res = await axios.get(API_URI);
        return res;
    }
    return { getCandidates, searchCandidates };
}

export default useCnadidate;