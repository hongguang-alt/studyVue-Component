const code =
    `<template>
    <div>
        <input v-model="message" class='input'>
    </div>
    <div class='message'>{{ message }}</div>
</template>
<script>
    export default {
        data () {
            return {
                message: '这是测试数据'
            }
        }
    }
</script>
<style>
.input{
    border:1px solid black;
}
.message{
    text-align:center
}
</style>
`;

export default code;