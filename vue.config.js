'use strict'

const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");

const nodeExternals = require("webpack-node-externals");
const env = process.env;
const isServer = env.RUN_ENV === "server";

const isProduction = process.env.NODE_ENV === 'production';

const port = process.env.port || process.env.npm_config_port || 8000;

// 与启动方式有关：process.env.NODE_ENV：development，production，test
console.log("当前环境：" + process.env.NODE_ENV);
console.log("当前端口：" + port);

let pages = {                                           // 在 multi-page 模式下构建应用
    index: {
        entry: 'src/main.js',                           // page 的入口，除了 entry 之外都是可选的
        template: 'public/index.html',                  // 模板来源
    },
    admin: {
        entry: 'src/adminMain.js',
        template: 'public/admin.html',
    }
};

if (isProduction) {
    pages.index['chunks'] = ['chunk-vendors', 'runtime', 'index'];
    pages.admin['chunks'] = ['chunk-vendors', 'runtime', 'admin'];
}

/** @type {import('@vue/cli-service').ProjectOptions} */
module.exports = {
    publicPath: '/',                        // 部署应用包时的基本 URL
    outputDir: `dist/${env.RUN_ENV}`,       // 输出文件目录，当运行 vue-cli-service build 时生成的生产环境构建文件的目录，构建之前会被清除。
    assetsDir: 'static',                    // 放置生成的静态资源 (js、css、img、fonts) 的目录。
    lintOnSave: !isProduction,              // true 会将 lint 错误输出为编译警告，但不会使得编译失败
    pages,

    // 注释掉，在 src/utils/request.js 配置的代理
    /*devServer: {                    // 配置文档 v4 版本：https://v4.webpack.docschina.org/configuration/dev-server/
        port: port,
        proxy: {                    // 前端解决跨域，后端不再解决
            '/api': {
                target: 'http://127.0.0.1:8080/api',
                ws: true,
                changOrigin: true,                  // 允许跨域
                pathRewrite: {'^/api': '/'}         // 因为 target 带了 /api，这里去掉
            },
        }
    },*/

    // Webpack 相关配置，通过 webpack-merge 合并到最终的配置中。
    configureWebpack: {   // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
        // 将 entry 指向应用程序的 server / client 文件
        entry: `./src/entry-${env.RUN_ENV}.js`,
        devtool: "eval",
        target: isServer ? "node" : "web",
        output: {
            libraryTarget: isServer ? "commonjs2" : undefined,
        },
        externals: isServer
            ? nodeExternals({
                allowlist: /\.css$/,
            })
            : undefined,
        optimization: {splitChunks: isServer ? false : undefined},
        plugins: [isServer ? new VueSSRServerPlugin() : new VueSSRClientPlugin()],
    }
};
