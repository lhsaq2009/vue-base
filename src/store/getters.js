const getters = {
    username: state => state.user.username,
    pageConf: state => state.article.pageConf,
    list: state => state.article.list,
    query: state => state.article.query,
    article: state => state.article.article,
}
export default getters;
