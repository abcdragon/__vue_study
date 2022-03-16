// redux 는 이 파일이 1개만 있어야 하지만, vuex 는 여러 개 있어도 된다.
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); // 이러면 Vue와 Vuex 가 연결이 된다. 미들웨어와 비슷하다.

// 이렇게 함수 이름을 변수로 지정하고 모듈로 바꿔 놓으면
// vue 에서 접근할 때 오타를 낼 수가 없다.
export const SET_WINNER = 'SET_WINNER'; // import { SET_WINNER } from './store';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

export default new Vuex.Store({ // import store from './store';
    state: {
        tableData: [
            ['', '', ''], 
            ['', '', ''], 
            ['', '', ''],
        ],
        turn: 'O',
        winner: '',
    }, // Vue의 data와 유사

    getters: {
        turnMessage(state) {
            return state.turn + '님이 승리하셨습니다.';
        }
    }, // Vue의 computed와 유사

    mutations: {
        // ES2015 문법 (Dynamic Property 동적 속성)
        [SET_WINNER](state, winner) { // 대문자로 함수명을 짓는 것이 약속
            state.winner = winner;
        },
        [CLICK_CELL](state, { row, cell }) {
            // state.tableData[row][cell] = state.turn; // Vuex 도 마찬가지로 배열을 인덱스 접근으로 바꿀 경우 변화가 감지되지 않는다.
            Vue.set(state.tableData[row], cell, state.turn); // this.$set은 현재 객체가 Vuex 이고, $set 이 없어서 안 된다.
        },
        [CHANGE_TURN](state) {
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME](state) {
            state.turn = 'O';
            state.tableData = [
                ['', '', ''], 
                ['', '', ''], 
                ['', '', '']
            ];
        },
        [NO_WINNER](state) {
            state.winner = '';
        }
    }, // state를 수정할 때 사용한다. 꼭 mutations 를 거쳐가야한다.

    actions: {

    } // 비동기를 사용할 때, 또는 여러 mutation 을 연달아 실행할 때 사용
});
