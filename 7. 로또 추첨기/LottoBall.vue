<template>
    <div class="ball" :style="styleObj">{{number}}</div>
</template>

<script>
export default {
    name: 'LottoBall',
    // props는 부모 컴포넌트에서 자식으로 넘겨주는 값이다.
    props: { 
        // props로 가져온 값은 바꾸면 안된다 == readonly 처럼 사용해야 한다.
        // 바꾸게 되면 부모와 자식간의 데이터가 같지 않기 때문에 규모가 커졌을 때 문제가 생길 수 있다.
        number: Number, // type 지정해주는게 좋음
    },
    computed: {
        // 기존값을 활용해서 새로운 값을 도출하면 computed
        styleObj() {
            let background;
            if (this.number <= 10){
                background = 'red';
            } else if (this.number <= 20){
                background = 'orange';
            } else if (this.number <= 30) {
                background = 'yellow';
            } else if (this.number <= 40) {
                background = 'blue';
            } else {
                background = 'green';
            }

            return {
                background,
            };
        },
    },
    data() {
        let background;
        return {
            background,
            numberData: this.number,
        };
    },
}
</script>

<style>
    .ball {
        display: inline-block;
        border: 1px solid black;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        text-align: center;
        margin-right: 20px;
    }
</style>     