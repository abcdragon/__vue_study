<template>
    <div>
        <div>{{turn}}님의 턴 입니다.</div>
        <table-component :table-data="tableData" />
        <div v-if="winner">{{winner}}님의 승리입니다.</div>
    </div>
</template>

<script>
import TableComponent from './TableComponent';
import EventBus from './EventBus';

export default {
    components: {
        TableComponent,
    },
    data() {
        return {
            tableData: [
                ['', '', ''], 
                ['', '', ''], 
                ['', '', ''],
            ],
            turn: 'O',
            winner: '',
        };
    },
    methods: {
        onClickTd(rowIndex, cellIndex) {
             // 이미 누른 칸이면 패스

            //const rootData = this.$root.$data; // 참조(alias), this.$root.$data는 최상위 객체의 data 속성을 참조한다.

            // Vue 에서는 객체를 변경하는 것을 감지하지 못하기 때문에 배열에 
            // 직접 접근하여 값을 바꾸는 등의 행위는 화면을 바꾸지 못한다.
            // this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn; // 동작 X
            // this.$set(바꾸고 싶은 값, 키 값, 바뀔 값)
            this.$set(this.tableData[rowIndex], cellIndex, this.turn);

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
                this.winner = this.turn;
                this.turn = 'O';
                this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
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
                    this.winner = '';
                    this.turn = 'O';
                    this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                } else { // 아직 게임이 안 끝난 상태
                    this.turn = this.turn === 'O' ? 'X' : 'O';
                }
            }
        }
    },
    created() {
        EventBus.$on('clickTd', this.onClickTd);
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