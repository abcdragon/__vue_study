<template>
    <div><table>
        <tr v-for="(yData, y) in tableData" :key="y">
            <td v-for="(_, x) in yData" :key="x" :style="blockStyle(y, x)"/>
        </tr>
    </table></div>
</template>

<script>
import { mapState } from 'vuex';
import { MINO_COLORS } from './store';

export default {
    computed: {
        ...mapState(['tableData']),
        blockStyle(state){
            return (y, x) => {
                return {
                    background: MINO_COLORS[state.tableData[y][x]],
                };
            }
        },
    },
    
    methods: {
        keyPress(e) {
            console.log('hi');
        }
    }
}
</script>

<style scoped>
    table {
        /* collapse 옵션은 겹치는 부분 처리를 어떻게 할 것인가인데, collpase 라고 옵션을 주면 그냥 겹친 채로 1줄로 표현된다. */
        border: 4px solid black;
        border-collapse: collapse;
        padding: 2em;
    }

    table td {
        border: 2px solid grey;
        width: 30px;
        height: 30px;
    }
</style>