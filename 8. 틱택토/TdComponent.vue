<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
export default {
    props: {
        cellData: String,
        rowIndex: Number,
        cellIndex: Number,
    },
    methods: {
        onClickTd() {
            if (this.cellData) return; // 이미 누른 칸이면 패스

            const rootData = this.$root.$data; // 참조(alias), this.$root.$data는 최상위 객체의 data 속성을 참조한다.

            // Vue 에서는 객체를 변경하는 것을 감지하지 못하기 때문에 배열에 
            // 직접 접근하여 값을 바꾸는 등의 행위는 화면을 바꾸지 못한다.
            // this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn; // 동작 X
            // this.$set(바꾸고 싶은 값, 키 값, 바뀔 값)
            this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);

            let win = false;
            if (rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2] === rootData.turn) {
                win = true;
            }
            
            if (rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex] === rootData.turn) {
                win = true;
            }
           
            if (rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn) {
                win = true;
            }
            
            if (rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn) {
                win = true;
            }

            if (win) { // 3 줄 달성
                rootData.winner = rootData.turn;
                rootData.turn = 'O';
                rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
            } else {
                let all = true;
                rootData.tableData.forEach((row) => {
                    row.forEach((cell) => {
                        if(!cell) {
                            all = false;
                        }
                    });
                });

                if (all) { // 무승부
                    rootData.winner = '';
                    rootData.turn = 'O';
                    rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                } else { // 아직 게임이 안 끝난 상태
                    this.$root.$data.turn = this.$root.$data.turn === 'O' ? 'X' : 'O';
                }
            }
        }
    },
}
</script>
