const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require('webpack');

// 复制文件到指定目录
const copyFiles = [
    {
        from: path.resolve("src/plugins/manifest.json"),
        to: `${path.resolve("dist")}/manifest.json`
    },
    {
        from: path.resolve("src/assets"),
        to: path.resolve("dist/assets")
    }
];

// 复制插件
const plugins = [
    new CopyWebpackPlugin({
        patterns: copyFiles
    })
];

// 页面文件
const pages = {};
// 配置 popup.html 页面
const chromeName = ["popup", "popup1", "popup2"];

chromeName.forEach(name => {
    pages[name] = {
        entry: `./src/${name}/main.js`,
        template: `./src/${name}/index.html`,
        filename: `./${name}.html`
    };
});

module.exports = {
    pages,
    publicPath: './',
    productionSourceMap: false,
    // 配置 content.js
    configureWebpack: {
        entry: {
            background: "/src/background/main.js",
            content: "/src/content-script/main.js"
        },
        output: {
            filename: "./js/[name].js"
        },
        plugins
    },
    filenameHashing: false,
    // 配置 content.css
    css: {
        extract: {
            filename: "./css/[name].css"
        }
    },
    // 增加chainWebpack配置
    chainWebpack: config => {
        config.output.filename(`./js/[name].js`).end()
        config.output.chunkFilename(`./js/[name].js`).end()
        config.plugin('extract-css').tap(() => [{
            filename: `./css/[name].css`,
            chunkFilename: `./css/[name].css`
        }])
        config.plugin('provide').use(webpack.ProvidePlugin, [{
            $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }])
    }
}
