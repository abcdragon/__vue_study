<template>
    <div id="root">
        <div>{{ first }} 곱하기 {{ second }} 는?</div>
        <form @submit.prevent="onSubmitForm">
            <input type="number" ref="answer" v-model="value">
            <button type="submit">입력</button>
            <div>{{ result }}</div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                first: Math.ceil(Math.random() * 9),
                second: Math.ceil(Math.random() * 9),
                value: '',
                result: '',
            }
        },
        methods: {
            onSubmitForm() {
                if(this.first * this.second === parseInt(this.value)){
                    this.result = '정답';

                    this.first = Math.ceil(Math.random() * 9);
                    this.second = Math.ceil(Math.random() * 9);

                } else {
                    this.result = '땡';
                }

                this.$refs.answer.focus();
                this.value = '';
            }
        }, 
    };
</script>