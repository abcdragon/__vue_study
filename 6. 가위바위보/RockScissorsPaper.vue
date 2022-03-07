<template>
    <div>
        <!-- 이미지 스프라이트 여러 개의 이미지가 하나로 합쳐진 것. 비용문제 때문에 로드완료되면 이 친구의 표현 위치를 바꿔가면서 화면에 보여준다. -->
        <!-- 현재 가위바위보도 이런식 -->
        <!-- 원래 css 속성이면 background-image 가 맞지만, javascript 표현식이어야 하기 때문에 캐멀케이스로 표현해야 된다.-->
        <div id="computer" :style="computedStyleObject"></div>
        <div>
            <button @click="onClickButton">바위</button>
            <button @click="onClickButton">가위</button>
            <button @click="onClickButton">보</button>
        </div>
        <div>{{ result }}</div>
        <div>현재 {{ score }} 점</div>
    </div>
</template>

<script>
    const rspCoords = {
            바위: '0px',
            가위: '-142px',
            보 : '-284px',
        }
    
    export default {
        data() {
            return {
                imgCoord: rspCoords.바위,
                result: '',
                score: 0,
            }
        },
        computed: { 
            computedStyleObject() {  // 곁다리로 있는데, 성능에 영향을 미칠만한 친구들을 computed 에 등록
                return { 
                    background: `url('https://en.pimg.jp/023/182/267/1/23182267.jpg') ${this.imgCoord} 0`,
                }
            }
        },
        methods: {
            onClickButton(choice) {

            },
        }
    };
</script>

<style scoped>
    #computer {
        width: 142px;
        height: 200px;
        background-position: 0 0;
    }
</style>