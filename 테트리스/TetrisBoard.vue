<template>
    <div align="center" @scroll.prevent>
        <tetris-show-info></tetris-show-info>
        <div id="gameBoardWrapper">
            <div tabindex="0" ref="gameBoardTable"><table>
                <tr v-for="(yData, y) in tableData" :key="y">
                    <td v-for="(_, x) in yData" :key="x" :style="blockStyle(y, x)"/>
                </tr>
            </table></div>
            <next-mino />
        
            <button @click="onClickStart">시작</button>
            <button @click="onClickStop">정지</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import store, { START_GAME, INCREMENT_TIMER, __DEV_END_GAME, CONTROL_MINO, CHANGE_MINO, MINO_COLORS } from './store';

import TetrisShowInfo from './TetrisShowInfo';
import NextMino from './NextMino';

let interval;

export default {
    store,
    components: {
        TetrisShowInfo,
        NextMino,
    },
    
    computed: {
        ...mapState(['tableData', 'halted', 'timer', 'clearLineNumber']),
        blockStyle(state){
            return (y, x) => {
                return {
                    background: MINO_COLORS[state.tableData[y][x]],
                };
            }
        },
    },

    methods: {
        turnMinoHandler(e) {
            this.$store.commit(CONTROL_MINO, e.key);
            //this.$store.commit(CHANGE_MINO); // TODO: 여기에 두면 아무 키나 눌러도 계속 미노가 바뀜!
        },

        onClickStart() {
            console.log(this.$refs.gameBoardTable);
            this.$refs.gameBoardTable.focus();
            this.$store.commit(START_GAME);
            this.$store.commit(CHANGE_MINO);
            document.addEventListener('keydown', this.turnMinoHandler);
        },

        onClickStop() {
            this.$store.commit(__DEV_END_GAME);
            document.removeEventListener('keydown', this.turnMinoHandler);
        },
    },

    watch: {
        halted(value, _){
            if (value === false) {    
                interval = setInterval(() => {
                    this.$store.commit(INCREMENT_TIMER);
                }, 1000);
            } else {
                clearTimeout(interval);
            }
        }
    }
};
</script>

<style scoped>
    div {
        outline:none;
    }

    div#gameBoardWrapper {
        position: relative;
    }

    button {
        font-size: 1.5em;
        margin: 1em;
        width: 10em;
        height: 2em;
        background: #fac511;
        border: 0.1em solid #fac511;
        border-radius: 0.5em;
    }

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
