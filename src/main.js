import Vue from 'vue';
import App from './App.vue';

import store from './store';
import indexRouter from "@/router/index";

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router: indexRouter,
    store,
    render: h => h(App)
})
