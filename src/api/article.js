import request from '@/utils/request'

export function getArticleById(id) {
    console.log("src/api/article.js -- 发起 axios 请求：/article/getArticleById");

    return request({
        url: `/article/${id}`,
        method: 'get'
    })
}

export function getArticleList(data, query) {
    console.log("src/api/article.js -- 发起 axios 请求：/article/articleList");

    return request({
        url: `/article/articleList?page=${query.page}&limit=${query.limit}`,
        method: 'post',
        data
    })
}
