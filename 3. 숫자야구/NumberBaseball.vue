<template>
    <div>
        <h1> {{result}} </h1>
        <!-- v-on:submit 대신에 @submit 가능 -->
        <!-- 또, e.preventDefault 대신에 .prevent 를 끝에 추가하는 걸로 대체 가능 -->
        <form @submit.prevent="onSubmitForm"> 
            <input ref="answer" minlength="4" maxlength="4" v-model="value">
            <button type="submit">입력</button>
        </form>
        <div>시도: {{ tries.length }}</div>
        <ul>
            <!-- 리스트 요소들을 구분하기 위해 key 값을 넣어야 한다. -->
            <li v-for="t in tries" :key="t.try">
                <div> {{ t.try }} </div>
                <div> {{ t.result }} </div>
            </li>
        </ul>
    </div>
</template>

<script>
    const getNumbers = () => {
        const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const array = [];
        for (let i = 0; i < 4; i += 1){
            const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
            array.push(chosen);
        }
        return array;
    };

    // 요 안에는 왠만하면 화면 갱신과 관련된 함수/변수 등을 넣는다.
    export default {
        data() {
            return {
                answer: getNumbers(),
                tries: [],
                value: '',
                result: '',        
            }
        },
        methods: {
            onSubmitForm(){
                if (this.value === this.answer.join('')) {
                    this.tries.push({
                        try: this.value,
                        result: '홈런',
                    });
                    this.result = '홈런';
                    alert(this.result);
                    this.tries = [];
                } else {
                    let strike = 0, ball = 0;
                    const answerArray = this.value.split('').map(v => parseInt(v));

                    for (let i = 0; i < 4; i += 1) {
                        if (answerArray[i] === this.answer[i]) {
                            strike += 1;
                        } else if (this.answer.includes(answerArray[i])) {
                            ball += 1;
                        }
                    }
                    this.tries.push({
                        try: this.value,
                        result: `${strike} 스트라이크, ${ball} 볼입니다.`,
                    });
                }
                   
                this.value = '';
                this.$refs.answer.focus();
            }
        }
    };
</script>

<style>
</style>