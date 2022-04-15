import store from "@/store";
import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css"


const requests = axios.create({
    baseURL: '/api',
    timeout: 5000,
});

requests.interceptors.request.use((config) => {
    if (store.state.shopcart.userTempId) {
        config.headers.userTempId = store.state.shopcart.userTempId;
    }

    if (store.state.user.token){
        config.headers.token = store.state.user.token;
    }
    nprogress.start();
    return config;
})

requests.interceptors.response.use((res) => {
    nprogress.done();
    return res.data;
}, (error) => {
    return Promise.reject(new Error('faile'));
}
);

export default requests;