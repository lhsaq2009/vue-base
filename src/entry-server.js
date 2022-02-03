import {createApp} from './main';

export default context => {
    return new Promise((resolve, reject) => {
        const {app, router, store} = createApp();
        // 更改路由
        router.push(context.url);

        router.onReady(() => {
            // 获取相应路由下的组件
            const matchedComponents = router.getMatchedComponents()
            // 如果没有组件，说明该路由不存在，报错404
            if (!matchedComponents.length) {
                return reject({code: 404})
            }

            // 对所有匹配的路由组件调用 `asyncData()`
            Promise.all(matchedComponents.map(component => {
                if (component.asyncData) {
                    return component.asyncData({
                        store,
                        route: router.currentRoute
                    });
                }
            })).then(() => {
                // 在所有预取钩子(preFetch hook) resolve 后，
                // 我们的 store 现在已经填充入渲染应用程序所需的状态。
                // 当我们将状态附加到上下文，
                // 并且 `template` 选项用于 renderer 时，
                // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
                context.state = store.state;

                resolve(app);
            }).catch(reject);
        }, reject);
    });
};
