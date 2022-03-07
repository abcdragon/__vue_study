<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
import { CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER } from './store';
export default {
    props: {
        rowIndex: Number,
        cellIndex: Number,
    },
    computed: {
        // Vuex 의 state 변수를 쓰고 싶으면 computed 를 꼭 활용해야 한다.

        cellData() { // 부모에서 오는 거랑 vuex 에서 오는 거랑 차이 때문에 화면 갱신이 안 될 수도 있음.
            return this.$store.state.tableData[this.rowIndex][this.cellIndex];
        },
        tableData() {
            return this.$store.state.tableData;
        },
        turn() {
            return this.$store.state.turn;
        },
    },
    methods: {
        onClickTd() {
            if (this.cellData) return; // 이미 누른 칸이면 패스

            // Vuex 의 함수를 쓰고 싶으면 this.$store.commmit(); 함수를 사용해야 한다
            this.$store.commit(CLICK_CELL, { row: this.rowIndex, cell: this.cellIndex }); // Vuex 

            let win = false;
            if (this.tableData[this.rowIndex][0] === this.turn && this.tableData[this.rowIndex][1] === this.turn && this.tableData[this.rowIndex][2] === this.turn) {
                win = true;
            }
            
            if (this.tableData[0][this.cellIndex] === this.turn && this.tableData[1][this.cellIndex] === this.turn && this.tableData[2][this.cellIndex] === this.turn) {
                win = true;
            }
           
            if (this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn) {
                win = true;
            }
            
            if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn) {
                win = true;
            }

            if (win) { // 3 줄 달성
                this.$store.commit(SET_WINNER, this.turn);
                this.$store.commit(RESET_GAME);    
            } else {
                let all = true;
                this.tableData.forEach((row) => {
                    row.forEach((cell) => {
                        if(!cell) {
                            all = false;
                        }
                    });
                });

                if (all) { // 무승부
                    this.$store.commit(NO_WINNER);
                    this.$store.commit(RESET_GAME);
                } else { // 아직 게임이 안 끝난 상태
                    this.$store.commit(CHANGE_TURN);
                }
            }
        }, // onClickTd
    },
}
</script>
