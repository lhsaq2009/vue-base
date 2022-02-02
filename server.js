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

// TODO：haisen 没生效，2022-02-02
const LRU = require('lru-cache');               // 删除最近最少使用条目的缓存对象
// 实例化配置缓存对象
const microCache = new LRU({
    max: 1000,                                  // 最大存储 100 条
    maxAge: 1000                                // 存储在 1 秒后过期
});

// 路由处理交给 vue
app.get('*', async (req, res) => {
    try {
        // 根据 url 获取缓存页面
        const hit = microCache.get(req.url);
        // 如果有缓存则直接返回缓存数据
        if (hit) {
            console.log("hit return");
            return res.end(hit);
        }

        // window ? window.ssr_cookie = req.cookie : undefined;

        console.log("res：----------------");
        // console.log(res);
        console.log(req.url);

        const context = {
            url: req.url,
            title: 'index.template.html test from server.js'
        };

        console.log("process.env.RUN_ENV：" + process.env.RUN_ENV);
        const html = await renderToString(context);

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(html);
        // 将页面缓存到缓存对象中
        microCache.set(req.url, html);
    } catch (e) {
        res.send('服务端异常：' + e);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App running at: 3000');
});
