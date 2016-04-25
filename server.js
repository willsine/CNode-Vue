'use strict'

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
config.entry.unshift('webpack-dev-server/client?http://localhost:8090', "webpack/hot/dev-server");
config.plugins.push(new webpack.HotModuleReplacementPlugin());

// 配置代理服务，将本地localhost:8090/api/请求代理到了http://cnodejs.org/api
var proxy = [{
    path: "/api/*",
    target: "https://cnodejs.org",
    host: "cnodejs.org"
}]
//启动服务
var app = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot:true,
    historyApiFallback: true,
    proxy:proxy
});
app.listen(8090);