import Vue from 'vue'
import VueRouter from 'vue-router'
import Base from "@/components/Base";

Vue.use(VueRouter);

const routes = [
    {
        path: '/', hidden: true, component: Base, redirect: 'noRedirect', children: [
            {path: '', name: 'siteIndex', component: () => import('@/views/blog/index/index')}
        ]
    },
    {
        path: '/article', hidden: true, component: Base, redirect: 'noRedirect', children: [
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
