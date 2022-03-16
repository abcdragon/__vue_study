<template>
    <div>
        <input type="number" placeholder="세로" :value="row" @change="onChangeRow">
        <input type="number" placeholder="가로" :value="cell" @chnage="onChangeCell">
        <input type="number" placeholder="지뢰" :value="mine" @chnage="onChangeMine">
        <button @click="onClickBtn">시작</button>
    </div>
</template>


<!--

무조건 데이터를 Vuex 를 통해 중앙통제를 하는 것이 아니고,
Local 로 쓸 것들은 Local 에서 쓰는 것이 좋다.

-->
<script>
import { START_GAME } from './store';

export default {
    data() {
        return {
            row: 10,
            cell: 10,
            mine: 20,
        };
    },

    methods: {
        onChangeRow(e){
            this.row = e.target.value;
        },
        onChangeCell(e){
            this.cell = e.target.value;
        },
        onChangeMine(e){
            this.Mine = e.target.value;
        },
        onClickBtn(){
            this.$store.commit(START_GAME, { row: this.row, cell: this.cell, mine: this.mine });
        }
    }
}
</script>