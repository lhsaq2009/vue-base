import Vue from 'vue'
import VueRouter from 'vue-router'
import BaseLayout from "@/components/BaseLayout";

Vue.use(VueRouter);

const routes = [
    /**
     * hidden：是否需要展示该路由是否渲染该路由入口
     */
    {
        path: '/', hidden: true, component: BaseLayout, redirect: 'noRedirect', children: [
            {path: '', name: 'siteIndex', component: () => import('@/views/blog/index/index')}
        ]
    },
    {
        path: '/article', hidden: true, component: BaseLayout, redirect: 'noRedirect', children: [
            {path: '', name: 'sitePosts', component: () => import('@/views/blog/posts/index')}
        ]
    }
]

const indexRouter = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default indexRouter;
