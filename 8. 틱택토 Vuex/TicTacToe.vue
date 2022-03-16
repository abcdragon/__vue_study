<template>
    <div>
        <div>{{turn}}님의 턴 입니다.</div>
        <table-component>
            <!-- 아래는 컴포넌트 안에 들어가는 slot 이다. -->
            <!-- Key 값은 안 바뀌는 값을 사용해야 한다!!!! -->
            <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
                <td @click="onClickTd(rowIndex, cellIndex)" v-for="(cellData, cellIndex) in rowData" :key="cellIndex">{{cellData}}</td>
            </tr>
        </table-component>
        <div v-if="winner">{{winner}}님의 승리입니다.</div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import TableComponent from '../8. 틱택토/TableComponent.vue';
import store, { CHANGE_TURN, CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER} from './store';

export default {
  components: { TableComponent },
    store, // 이거 넣어줘야 댐. 그래야 하위 컴포넌트에서 this.$store 사용가능
    computed: {
        ...mapState(['winner', 'turn', 'tableData']),
        /*
            이런 식으로도 활용 가능
            ...mapState({
                winner(state) {
                    return state.winner + this.data; // 값 변경
                },
                turnState: 'turn', // 이름 변경
            })
        */

        // winner() {
        //     return this.$store.state.winner;
        // },
        // turn() {
        //     return this.$store.state.turn;
        // },
    },
    methods: {
        onClickTd(rowIndex, cellIndex) {
            if (this.cellData) return; // 이미 누른 칸이면 패스

            // Vuex 의 함   수를 쓰고 싶으면 this.$store.commmit(); 함수를 사용해야 한다
            this.$store.commit(CLICK_CELL, { row: rowIndex, cell: cellIndex }); // Vuex 

            let win = false;
            if (this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tableData[rowIndex][2] === this.turn) {
                win = true;
            }
            
            if (this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn && this.tableData[2][cellIndex] === this.turn) {
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
};
</script>

<style>
    table {
        border-collapse: collapse;
    }
    td {
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }
</style>