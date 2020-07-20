<template>
    <div id="headInfo">
        <img src="../assets/images/back.png" alt="" class="back" v-if="headInfo.isReturn" @click="back">
        <div class="title">{{headInfo.title}}</div>
    </div>
</template>

<script>
    export default {
        name: "headInfo",
        data() {
            return {}
        },
        props:['headInfo'],
        methods:{
            back(){
                this.$router.go(-1);//返回上一层
            },
        }
    }
</script>

<style scoped lang="less">
    #headInfo {
        height: 100px;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9;
        background: #ffffff;
        border-bottom: 1px solid #f2f2f2;
        box-sizing: border-box;
        .back{
            position: absolute;
            width: 52px;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        .title{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateY(-50%) translateX(-50%);
        }
    }
</style>