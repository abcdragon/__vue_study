<template>
    <div>
        <mine-form />
        <div>{{timer}}</div>
        <table-component></table-component>
        <div>{{result}}</div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import MineForm from './MineForm';
import TableComponent from './TableComponent';
import store, { INCREMENT_TIMER } from './store';

let interval;

export default {
    store,
    components: {
        TableComponent,
        MineForm,
    },
    computed: {
        ...mapState(['timer', 'result', 'halted']),
    },
    methods: {
       
    },
    watch: {
        halted(value, oldValue){
            if (value === false) {    
                interval = setInterval(() => {
                    this.$store.commit(INCREMENT_TIMER);
                }, 1000);
                // 중간중간 다른 메서드의 실행시간이 존재하기 때문에 정확하지 않다.
                // 완전 정확하게 하려면 new Date() 를 사용하여 현재 시각 - 시작 시각을 해야한다.
            } else {
                console.log(interval);
                clearTimeout(interval);
            }
        }
    }
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