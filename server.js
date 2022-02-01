// express 搭建简单服务

// const Vue = require('vue')
const express = require('express');
const app = express()
const fs = require('fs')
const path = require('path')

// 创建渲染器
const {createBundleRenderer} = require('vue-server-renderer');

const serverBundle = require('./dist/server/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/client/vue-ssr-client-manifest.json');
// const chalk = require("chalk");

const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template: fs.readFileSync('./index.template.html', 'utf-8'), // 宿主模板文件
    clientManifest
});

// 中间件处理静态文件请求
app.use(express.static(path.resolve(__dirname, './dist/client'), {index: false}))

function renderToString(context) {
    return new Promise((resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
            err ? reject(err) : resolve(html);
        });
    });
}

// 路由处理交给 vue
app.get('*', async (req, res) => {
    try {
        const context = {
            url: req.url,
            title: 'ssr test'
        };

        // 将 vue 实例转为 html
        const html = await renderToString(context);

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(html);
    } catch (e) {
        res.send('服务端异常：' + e);
    }
});

app.listen(3000, () => {
    console.log('App running at: 3000');
});
