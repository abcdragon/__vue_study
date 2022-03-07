const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'development',
    devtool: 'eval', // devtools 아님 주의
    resolve: {
        extensions: ['.js', '.vue'],  // .~~ 형식임
    },
    entry: {
        app: path.join(__dirname, 'main.js'),
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader',
        }],
    },
    plugins: [ // plugins 임! 주의, 그리고 리스트임 주의!
        new VueLoaderPlugin(),
    ],
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    }
}