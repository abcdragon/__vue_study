<template>
    <div><table>
        <tr v-for="(yData, y) in tableData" :key="y">
            <td v-for="(_, x) in yData" :key="x" :style="blockStyle(y, x)"/>
        </tr>
    </table></div>
</template>

<script>
import { mapState } from 'vuex';
import { MINOS } from './store';

export default {
    computed: {
        ...mapState(['tableData']),
        blockStyle(state){
            return (y, x) => {
                switch(state.tableData[y][x]){
                    case MINOS.I_MINO:
                        return { background: 'cyan' };

                    case MINOS.O_MINO:
                        return { background: 'yellow' };

                    case MINOS.Z_MINO:
                        return { background: 'red' };
                    
                    case MINOS.S_MINO:
                        return { background: 'green' };

                    case MINOS.J_MINO:
                        return { background: 'blue' };

                    case MINOS.L_MINO:
                        return { background: 'orange' };

                    case MINOS.T_MINO:
                        return { background: 'purple' };
                    
                    default:
                        return { background: 'white' };
                }
            }
        }
    },
    methods: {

    },
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