<template>
    <div align="center">
        <span>다음 블럭</span>
        <table id="show-block">
            <tr v-for="(yData, y) in nextMinoData" :key="y">
                <td v-for="(xData, x) in yData" :key="x" :style="blockStyle(y, x)"/>
            </tr>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { MINOS } from './store';

export default {
    computed: {
        ...mapState(['nextMinoData']),
        blockStyle(state) {
            return (y, x) => {
                switch(state.nextMinoData[y][x]){
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
            };
        },
    },
}
</script>

<style scoped>
    table#show-block {
        border-collapse: collapse;
        border: 4px solid black;
    }

    td {
        width: 30px;
        height: 30px;
        border: 2px solid grey;
    }
</style>
