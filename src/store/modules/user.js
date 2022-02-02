import {getInfo} from '@/api/user';

const state = {
    username: 'None'
}

const mutations = {
    set_username: (state, username) => {
        state.username = username;
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

                    let data = response.data.data;
                    commit('set_username', data['username']);
                    resolve();
                })
                .catch(error => {
                    console.log(error);
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
