import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.npocto.cloud',
    // baseURL: 'http://127.0.0.1:8000/',
})

export default instance;