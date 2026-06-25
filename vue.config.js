const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

// 复制文件到指定目录
const copyFiles = [
    {
        from: path.resolve("src/plugins/manifest.json"),
        to: `${path.resolve("dist")}/manifest.json`
    },
    {
        from: path.resolve("src/assets"),
        to: path.resolve("dist/assets")
    },
    {
        from: path.resolve("src/background/sw.js"),
        to: `${path.resolve("dist")}/sw.js`
    },
    {
        from: path.resolve("src/inject/page-hook.js"),
        to: `${path.resolve("dist")}/js/page-hook.js`
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
// 配置 popup 页面
const chromeName = ["popup", "drawer"];

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
            content: "/src/content-script/content.js"
        },
        output: {
            filename: "./js/[name].js",
            hashFunction: 'md4'
        },
        plugins,
        // 禁用eval相关的devtool
        devtool: false,
        // 优化配置
        optimization: {
            minimize: false,
            splitChunks: false
        },
        // 确保不使用eval
        mode: 'production'
    },
    filenameHashing: false,
    // 配置 content.css
    css: {
        extract: {
            filename: "./css/[name].css"
        }
    },
    // chainWebpack配置
    chainWebpack: config => {
        // 设置输出文件名
        config.output.filename(`./js/[name].js`).end()
        config.output.chunkFilename(`./js/[name].js`).end()
        
        // 设置CSS文件名
        config.plugin('extract-css').tap(() => [{
            filename: `./css/[name].css`,
            chunkFilename: `./css/[name].css`
        }])
        
        // 禁用source map和缓存loader
        config.devtool(false)
        config.module.rule('js').uses.delete('cache-loader')
        config.module.rule('js').uses.delete('thread-loader')
        
        // 禁用预加载插件
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
    }
}
