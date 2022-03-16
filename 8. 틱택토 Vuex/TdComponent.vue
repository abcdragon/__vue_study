<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
import { mapState } from 'vuex';
import { CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER } from './store';
export default {
    props: {
        rowIndex: Number,
        cellIndex: Number,
    },
    computed: {
        ...mapState({
            tableData: state => state.tableData,
            turn: state => state.turn,
            // 아래처럼 하면 성능상에는 문제가 없지만, 배열의 내용이 바뀌면 다른 요소도 리랜더링 된다.
            // 그래서 이번 커밋에서는 그냥 TicTacToe 로 옮겼다
            cellData(state) {
                return state.tableData[this.rowIndex][this.cellIndex];
            }
        })

        // Vuex 의 state 변수를 쓰고 싶으면 computed 를 꼭 활용해야 한다.

        // cellData() { // 부모에서 오는 거랑 vuex 에서 오는 거랑 차이 때문에 화면 갱신이 안 될 수도 있음.
        //     return this.$store.state.tableData[this.rowIndex][this.cellIndex];
        // },
        // tableData() {
        //     return this.$store.state.tableData;
        // },
        // turn() {
        //     return this.$store.state.turn;
        // },
    },
    methods: {
        
    },
}
</script>
