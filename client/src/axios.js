import axios from "axios";

const instance = axios.create({
    baseURL: "/",
    // withCredentials: true,
});
//instance.defaults.withCredentials = true;

export default instance;
