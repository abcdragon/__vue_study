import Vue from 'vue';
import MineSweeper from './MineSweeper';

// 이전에 만들었던 코드에서 el를 담당하는 메서드이다. 생성자의 인자는 붙일 객체이다.
new Vue(MineSweeper).$mount('#root');
