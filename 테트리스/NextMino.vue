<template>
    <div align="center">
        <span><b>다음 블럭</b></span>
        <table id="show-block">
            <tr v-for="(yData, y) in nextMino['data']" :key="y">
                <td v-for="(xData, x) in yData" :key="x" :style="blockStyle(y, x)" />
            </tr>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { MINO_COLORS } from './store';

export default {
    computed: {
        ...mapState(['nextMino']),
        blockStyle(state){
            return (y, x) => {
                return {
                    background: MINO_COLORS[state.nextMino.data[y][x]],
                }
            }
        },
    },
}
</script>

<style scoped>
    div {
        position: absolute;

        top: 0%;
        left: 50%;
        transform: translate(180%);

        border: 3px solid black;
        padding: 8px;
        width: 150px;
    }

    table#show-block {
        margin: 5px;
        border-collapse: collapse;
    }

    td {
        width: 30px;
        height: 30px;
        border: 2px solid grey;
    }
</style>
