<template>
    <div>
        <div>당첨 숫자</div>
        <div id="결과창">
            <lotto-ball v-for="ball in winBalls" :key="ball" :number="ball"></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
        <button v-if="redo" @click="onClickRedo">한 번 더!</button>
    </div>
</template>

<script>
    import LottoBall from './LottoBall';

    function getWinNumbers() {
        const candidate = Array(45).fill().map((v, i) => i + 1);
        const shuffle = [];
        while (candidate.length > 0) {
            shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
        }

        const bonusNumber = shuffle[shuffle.length - 1];
        const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
        return [...winNumbers, bonusNumber];
    }

    const timeouts = [];
    export default {
        components: {
            'lotto-ball': LottoBall, // LottoBall, 로 줄일 수 있다. 왜냐하면, 파스칼로 썼기 때문에 케밥으로 호환이 되서 알아서 바꿔준다.
        },
        data() {
            return {
                winNumbers: getWinNumbers(),
                winBalls: [],
                bonus: null,
                redo: false,
            };
        },
        methods: {
            onClickRedo() {
                this.winNumbers = getWinNumbers();
                this.winBalls = [];
                this.bonus = null;
                this.redo = false;
                this.showBalls();
            },
            showBalls() {
                for (let i = 0; i < this.winNumbers.length - 1; i++){
                    timeouts[i] = setTimeout(() => {
                        this.winBalls.push(this.winNumbers[i]);
                    }, (i + 1) * 1000);
                }
                timeouts[6] = setTimeout(() => {
                    this.bonus = this.winNumbers[6];
                    this.redo = true;
                }, 7000);
            },
        },
        mounted() {
            this.showBalls();
        },
        beforeDestroy() { // mounted 에서 setTimeout, setInterval 을 했으면, destory 에서는 clear~~ 를 꼭! 해야한다.
            timeouts.forEach((t) => {
                clearTimeout(t);
            });
        },
        watch: { // 변수의 변화를 감지하는 속성
            /* bonus(val, oldVal) { // (현재값, 이전값) ==> 참조형(배열) 같은 경우는 둘이 같게 나온다.
                if (val === null){ // winBalls 가 빈배열이 될 때마다 showBalls() 실행
                    this.showBalls();
                }
            } */ 
            // 근데 많이 안 쓰는게 좋음 하나 바뀔 때 여러 개가 바뀌면 나중에 고치기가 힘듬
            // 위에 한 것처럼 값이 바뀔 때 그 때 바꾸는 것이 이상적인 방법
        }
    };
</script>

<style scoped>
</style>