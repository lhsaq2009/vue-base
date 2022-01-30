import request from '@/utils/request'

export function getArticleById(id) {
    return request({
        url: `/article/${id}`,
        method: 'get'
    })
}
