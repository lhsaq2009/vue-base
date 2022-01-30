import {getInfo} from '@/api/user';

const state = {
    name: 'None'
}

const mutations = {
    set_name: (state, name) => {
        state.name = name;
    }
}

const actions = {
    // https://cec2179e-cc35-4034-b1c0-8b84615b2702.mock.pstmn.io/api/user/info
    getInfo({commit, state}) {
        console.log("src/store/modules/user.js -- dispatch actions.getInfo()");

        return new Promise((resolve, reject) => {
            getInfo()
                .then(response => {
                    console.log("返回结果：" + JSON.stringify(response.data));
                    
                    let data = response.data;
                    commit('set_name', data['name']);
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

