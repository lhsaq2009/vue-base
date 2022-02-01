import Vue from 'vue';
import App from './App.vue';

import {createStore} from './store'
import {sync} from 'vuex-router-sync';
import {createRouter} from "@/router";

Vue.config.productionTip = false

export function createApp() {
    const router = createRouter();
    const store = createStore();

    // 同步路由状态(route state)到 store
    sync(store, router);

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })

    return {app, router, store};
}
