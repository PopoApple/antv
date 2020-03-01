<template>
  <div class="ExceptionBlock">
    <div class="ExceptionBlock-left">
        <img :src="imgSrc"/>
    </div>
    <div class="ExceptionBlock-right">
        <div class="ExceptionBlock-title">
        {{ title }}
        </div>
        <div class="ExceptionBlock-info">
        {{ info }}
        </div>
        <div class="ExceptionBlock-btn">
        <a-button type="primary" @click="onClick()">{{ btnTxt }}</a-button>
        </div>
    </div>
    </div>
</template>
<script>
    export default {
        name: 'ExceptionBlock',
        components: {},
        props: {
            title: String,
            info: String,
            btnTxt: String,
            imgSrc: String,
        },
        data() {
            return {}
        },
        created() {},
        mounted() {
        },
        computed: {},
        methods: {
            onClick(e) {
                this.$emit('btnClick')
            },
        }
    }
</script>
<style lang="less">
 .ExceptionBlock {
    height: 100%;
    max-width: 800px;
    margin: 0 auto;
    .ExceptionBlock-left {
        float: left;
        width: 55%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
            width: 100%;
        }
    }
    .ExceptionBlock-right {
        float: right;
        width: 35%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .ExceptionBlock-title {
        color: #4A4A4A;
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .ExceptionBlock-info {
        color: #BFBFBF;
        font-size: 20px;
        margin-bottom: 12px;
    }
}
</style>