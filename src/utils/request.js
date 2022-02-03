import axios from 'axios';

//
const service = axios.create({
    // 服务器 & 客户端，异步请求都 OK
    baseURL: 'http://127.0.0.1:8081/api',
    timeout: 30 * 1000,
    // 配置 proxy，服务器异步请求 OK，但是客户端异步请求 404
    /*proxy: {
        host: '127.0.0.1',
        port: 8081
    },*/
    // headers: window ? window.ssr_cookie || {} : {}
});

export default service;
