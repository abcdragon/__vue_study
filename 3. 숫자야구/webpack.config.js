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
        rules: [{ // 많은 js 파일들을 어떻게 합칠 것인가에 대한 규칙
            test: /\.vue$/,
            use: 'vue-loader',
        }],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        filename: '[name].js', // 자동으로 app.js 가 들어간다
        path: path.join(__dirname, 'dist'), // 경로명도 자유다.
    },
};