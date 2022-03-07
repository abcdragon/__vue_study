const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'development',
    devtool: 'eval', // 개발 중일 때는 eval, 배포할 때는 hidden-source-map
    resolve: {
        extensions: ['.js', '.vue'], // import 할 때 확장자 제외할 수 있다.
    },
    entry: {
        app: path.join(__dirname, 'main.js'), // app, main 은 자기가 설정하는 것이다.
    },
    module: { // webpack 의 핵심요소
        // 로더는 vue, css 등등의 것들을 js 로 바꿔준다.
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader',
        }, {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader',
            ],
        }],
    },

    // output 전 몇 가지 작업을 진행하는 친구
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: { // webpack-dev-server 는 램에 저장하기 때문에 실제로 파일을 생성하지 않는다.
        filename: '[name].js', // 자동으로 app.js 가 들어간다
        path: path.join(__dirname, 'dist'), // 경로명도 자유다.
        publicPath: path.join(__dirname, 'dist'), // webpack-dev-server --hot 을 사용하려면 추가해야함.
    },
};