<template>
    <table>
        <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
            <td 
                v-for="(cellData, cellIndex) in rowData"
                :key="cellIndex"
                :style="cellDataStyle(rowIndex, cellIndex)"
                @click="onClickTd(rowIndex, cellIndex)"
                @contextmenu.prevent="onRightClickTd(rowIndex, cellIndex)"
            >
                {{cellDataText(rowIndex, cellIndex)}}
            </td>
        </tr>
    </table>
</template> 

<script>
import { mapState } from 'vuex'; // 주의: mapState 는 비구조화로 불러올 수 있다.
import { CODE, CLICK_MINE, OPEN_CELL, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './store';

export default {
    // computed 내의 함수들은 기본적으로 state 라는 매개변수를 가지고 있다.
    // 따라서, 추가적인 변수를 넘기고 싶다면, 고차함수 패턴을 사용해야한다.
    // 또, :style="cellDataStyle(rowIndex, cellIndex)" 와 같이 사용하면 cellDataStyle()(rowIndex, cellIndex)처럼 실행된다. 
    computed: {
        ...mapState(['tableData']),
        cellDataStyle(state){
            console.log('heeeeyy', state, arguments); // test
            return (row, cell) => {
                switch (this.$store.state.tableData[row][cell]){
                    case CODE.NORMAL:
                    case CODE.MINE:
                        return {
                            background: '#444',
                        };

                    case CODE.CLICKED_MINE:
                    case CODE.OPENED:
                        return {
                            bacground: 'white',
                        };

                    case CODE.FLAG:
                    case CODE.FLAG_MINE:
                        return {
                            background: 'red',
                        };

                    case CODE.QUESTION:
                    case CODE.QUESTION_MINE:
                        return {
                            background: 'yellow',
                        };

                    default:
                        return {};
                };
            }
        },
        cellDataText(state){
            return (row, cell) => {
                switch (this.$store.state.tableData[row][cell]){
                    case CODE.MINE:
                        return 'X';

                    case CODE.NORMAL:
                        return '';
                    
                    case CODE.FLAG_MINE:
                    case CODE.FLAG:
                        return '!';

                    case CODE.QUESTION_MINE:
                    case CODE.QUESTION:
                        return '?';
                
                    case CODE.CLICKED_MINE:
                        return '펑';

                    default:
                        return this.$store.state.tableData[row][cell] || '';
                }
            }
        }
    },

    methods: {
        onClickTd(row, cell) {
            if (this.halted){
                return;
            }
            
            switch(this.tableData[row][cell]){
                case CODE.NORMAL:
                    return this.$store.commit(OPEN_CELL, { row, cell });
                
                case CODE.MINE:
                    return this.$store.commit(CLICK_MINE, { row, cell });
            }
        },
        onRightClickTd(row, cell) {
            if (this.halted) {
                return;
            }

            switch (this.tableData[row][cell]){
                case CODE.NORMAL:
                case CODE.MINE:
                    this.$store.commit(FLAG_CELL, { row, cell });
                    return;

                case CODE.FLAG_MINE:
                case CODE.FLAG:
                    this.$store.commit(QUESTION_CELL, { row, cell });
                    return;
                
                case CODE.QUESTION_MINE:
                case CODE.QUESTION:
                    this.$store.commit(NORMALIZE_CELL, { row, cell });
                    return;
            }
        }
    }
}
</script>
