<!-- template 은 굳이 쓸데없는 태그를 써가면서 감싸고 싶지 않을 때 사용한다.-->
<template>
    <div>
        <!-- 데이터 -> DOM 의 값을 변경할 때는 v-bind를 사용한다. -->
        <!-- v-bind:class 와 같은 것들을 :class 로 축약할 수 있다. -->

        <!-- v-bind, v-model의 차이점 -->
        <!-- https://vuejs.org/guide/essentials/forms.html -->
        <!-- https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes -->
        <!-- https://stackoverflow.com/questions/42260233/vue-js-difference-between-v-model-and-v-bind -->

        <!-- :class="{state : true, hello: false}" 라고 하면, state는 true라 적용되고, hello는 false라 적용이 안 된다.-->
        <div id="screen" :class="state" @click="onClickScreen">{{ message }}</div>

        <!-- v-if 는 아예 DOM 자체가 없어지는 반면, v-show 는 display:none 속성이 더해진다. -->
        <div v-show="result.length">
            <!-- average 라고 바로 쓸 수 있는 이유는 computed 속성을 통해 캐싱되기 때문이다. -->
            <!-- 또, computed 에 쓰인 함수가 오래 걸린다고 했을 때, 적용하여 캐싱되는 것으로 성능 이슈를 개선할 수 있음. -->
            <div> 평균 시간: {{ average }} ms </div>
            <button @click="onReset"> 리셋 </button>
        </div>
    </div>
</template>

<script>
    let startTime = 0;
    let endTime = 0;
    let timeout = null;
    export default {
        data() {
            return {
                result: [],
                state: 'waiting',
                message: '클릭해서 시작하세요.',
            };
        },
        computed: { // 수식을 계산할 때 사용, 값을 가공할 때 사용
            average() {
                return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0;
            },
        },
        methods: {
            onReset() {
                this.result = [];
            },
            onClickScreen() {
                if (this.state === 'waiting') {
                    this.state = 'ready';
                    this.message = '초록색이 되면 클릭하세요';
                    timeout = setTimeout(() => {
                        this.state = 'now';
                        this.message = '지금 클릭!';
                        startTime = new Date();
                    }, Math.floor(Math.random() * 1000) + 2000); // 2 ~ 3초
                } else if(this.state === 'ready') {
                    clearTimeout(timeout);
                    this.state = 'waiting';
                    this.message = '너무 성급하시군요! 초록색이 된 후에 클릭하세요.';
                } else if (this.state === 'now') {
                    endTime = new Date();
                    this.state = 'waiting';
                    this.message = '클릭해서 시작하세요.';
                    this.result.push(endTime - startTime);
                }
            },
        }
    };
</script>

<!-- scoped 가 들어가면 현재 vue 파일에서만 유효하다. -->
<style scoped>
    #screen {
        width: 300px;
        height: 200px;
        text-align: center;
        user-select: none;
    }

    #screen.waiting {
        background-color: aqua;
    }

    #screen.ready {
        background-color: red;
        color: white;
    }

    #screen.now {
        background-color: greenyellow;
    }
</style>