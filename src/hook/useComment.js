import API from "../vars/api";
import axios from "axios";

const COMMENT_API = API.comment;

function useComment() {
    const insertComment = async (post_id, content) => {
        const res = await axios.post(COMMENT_API, {
            post_id: post_id,
            content: content
        });
        return res;
    };
    const reactionComment = async (comment_id, type) => {
        const res = await axios.put(COMMENT_API, {
            comment_id: comment_id,
            action: 'reaction',
            type: type
        });
        return res;
    };
    const getComment = async (query) => {
        const queryArr = Object.keys(query).map(key => `${key}=${query[key]}`);
        const queryExist = queryArr.length !== 0;
        const API_URI = COMMENT_API + (queryExist ? `?` + queryArr.join("&") : "");
        const res = await axios.get(API_URI);
        return res;
    };
    return { insertComment, getComment, reactionComment };
}

export default useComment;