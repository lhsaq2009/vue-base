import request from '@/utils/request';

export function getInfo() {
    console.log("src/api/user.js -- 发起 axios 请求：/user/info");

    return request({
        url: '/user/info',
        method: 'get'
    });
}
