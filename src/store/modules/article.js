import {getArticleById, getArticleList} from '@/api/article';

const state = {
    list: [],
    pageConf: {page: 1, limit: 2, total: 0},
    query: {},
    article: {
        aaa: 123
    }
}

const mutations = {
    set_list: (state, data) => {
        state.list = data.rows;
        state.pageConf = {
            ...state.pageConf,
            total: data.total
        };
    },
    [SET_PAGECONF](state, pageConf) {
        state.pageConf = {
            ...state.pageConf,
        };
    },
    set_article(state, article) {
        state.article = article;
    }
}

const actions = {
    getArticleById({commit, state}, params) {
        return new Promise((resolve, reject) => {
            getArticleById(params.id)
                .then(res => {
                    commit('set_article', res.data);
                    resolve(res.data);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    },
    getArticleList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            getArticleList(params.payload.query, params.payload.pageConf)
                .then(res => {
                    commit('set_list', res.data.data);
                    resolve(res.data.data);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    }
}

export const SET_PAGECONF = "set_pageConf";

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
