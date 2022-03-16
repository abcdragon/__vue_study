<template>
    <table>
        <!-- slot 은 IoC(Inversion of Control), DI(Dependence Injection) 과 연관성이 있다.  -->
        <slot /> <!-- 태그 열고 닫은 다음 기본 값을 넣을 수도 있다. -->
    </table>
</template> 

<script>
    import TrComponent from './TrComponent';

    export default {
        components: {
            TrComponent,
        },
        data() {
            return {

            };
        },
        computed: {
            tableData(){
                return this.$store.state.tableData;
            },
            turnMessage() {
                return this.$store.getters.turnMessage;
            }
        },
    }

</script>
