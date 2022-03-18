<template>
    <div align="center">
        <tetris-show-info></tetris-show-info>
        <table><tr>
            <td><table-component /></td>
            <td><next-mino /></td>
        </tr></table>
        <button @click="onClickStart">시작</button>
        <button @click="onClickStop">정지</button>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import store, { START_GAME, INCREMENT_TIMER, __DEV_END_GAME, NEXT_MINO } from './store';

import TetrisShowInfo from './TetrisShowInfo'
import TableComponent from './TableComponent';
import NextMino from './NextMino';

let interval;

export default {
    store,
    components: {
        TetrisShowInfo,
        TableComponent,
        NextMino,
    },
    
    computed: {
        ...mapState(['halted', 'timer', 'clearLineNumber']),
    },

    methods: {
        onClickStart() {
            this.$store.commit(START_GAME);
            this.$store.commit(NEXT_MINO);
        },

        onClickStop() {
            this.$store.commit(__DEV_END_GAME);
        }
    },

    watch: {
        halted(value, oldValue){
            if (value === false) {    
                interval = setInterval(() => {
                    this.$store.commit(INCREMENT_TIMER);
                }, 1000);
            } else {
                console.log(interval);
                clearTimeout(interval);
            }
        }
    }
};
</script>

<style scoped>
    button {
        font-size: 1.5em;
        margin: 1em;
        width: 10em;
        height: 2em;
        background: #fac511;
        border: 0.1em solid #fac511;
        border-radius: 0.5em;
    }
</style>
