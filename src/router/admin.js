import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const constantRoutes = [
    {path: '/admin/login', component: () => import('@/views/admin/login/index')},
];

const createRouter = () => new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constantRoutes
});

const adminRouter = createRouter();

export default adminRouter;
