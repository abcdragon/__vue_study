<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
import EventBus from './EventBus';
export default {
    props: {
        cellData: String,
        rowIndex: Number,
        cellIndex: Number,
    },
    methods: {
        onClickTd() {
            if (this.cellData) return;

            // on으로 등록한 것을 실행
            EventBus.$emit('clickTd', this.rowIndex, this.cellIndex);
        }
    },
}
</script>
