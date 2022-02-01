import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
    path: '/', hidden: true, component: () => import('../components/BaseLayout.vue'), redirect: 'noRedirect', children: [
        {path: '', name: 'siteIndex', component: () => import('@/views/blog/index/index')}
    ]
}, {
    path: '/article/:id(\\d+)', hidden: true, component: () => import('../components/BaseLayout.vue'), redirect: 'noRedirect', children: [
        {path: '', name: 'sitePosts', component: () => import('@/views/blog/posts/index')}
    ]
}];

export function createRouter() {
    return new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    });
}

const indexRouter = createRouter();

export default indexRouter;
