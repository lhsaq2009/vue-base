import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/modules/user";
import getters from "@/store/getters";

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        state: {
            path: "src/store/index.js"
        },
        mutations: {},
        actions: {},

        modules: {
            user
        },
        getters
    });
}
