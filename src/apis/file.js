import axios from 'axios';
import API from '../vars/api';
export const uploadFile = async (file) => {
    const UPLOAD_API = API.file;
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(UPLOAD_API, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return res;
}