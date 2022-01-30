import Vue from 'vue';
import App from './App.vue';
import store from './store';
import adminRouter from "@/router/admin";

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router: adminRouter,
    store,
    render: h => h(App)
})
