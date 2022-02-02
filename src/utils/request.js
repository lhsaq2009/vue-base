import axios from 'axios';

const service = axios.create({
    baseURL: '/api',
    timeout: 30 * 1000,
    proxy: {
        host: '127.0.0.1',
        port: 8081
    },
    // headers: window ? window.ssr_cookie || {} : {}
});

export default service;
