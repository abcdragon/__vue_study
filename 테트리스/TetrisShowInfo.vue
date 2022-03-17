<template>
    <div id="form">
        <b>진행한 시간 : </b> {{timer}}
        &nbsp;
        <b>없앤 줄 수 :</b> {{clearLineNumber}}
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['timer', 'clearLineNumber']),
    },
}
</script>

<style scoped>
    div#form {
        font-size: 1.5em;
        padding: 1em;
    }
</style>