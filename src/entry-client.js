import {createApp} from './main'
import Vue from 'vue';

const {app, router, store} = createApp()

// 客户端预取数据
// 注释掉：解决客户端也发起 asyncData 里的异步请求
/*Vue.mixin({
    beforeMount() {
        const {asyncData} = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: this.$route
            })
        }
    }
})*/

// 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
    // 添加路由钩子函数，用于处理 asyncData.
    // 在初始路由 resolve 后执行，
    // 以便我们不会二次预取(double-fetch)已有的数据。
    // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)

        // 我们只关心非预渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c));
        })

        if (!activated.length) {
            return next();
        }

        // 这里如果有加载指示器 (loading indicator)，就触发

        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({store, route: to})
            }
        })).then(() => {
            // 停止加载指示器(loading indicator)
            next()
        }).catch(next)
    });

    app.$mount('#app');
})
