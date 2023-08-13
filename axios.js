import axios from "axios";

const instance = axios.create({
    baseURL: 'https://xxsimple.onrender.com/',
})

export default instance;