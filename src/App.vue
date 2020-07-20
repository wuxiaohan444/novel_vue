<template>
    <div id="app">
        <tips></tips>
        <loading></loading>
        <router-view/>
    </div>
</template>
<script>
    import tips from './components/tips'
    import loading from './components/loading'

    export default {
        name: 'app',
        components: {tips, loading},
        methods: {}
    }
</script>
<style lang="less">
    * {
        padding: 0;
        margin: 0;
    }

    html, body {
        height: 100%;
    }

    button, input, select {
        border: none;
        outline: none;
    }

    ul, li {
        list-style: none;
    }

    a {
        text-decoration: none;
        color: #333333;
    }

    #app {
        height: 100%;
        background: #ffffff;
        color: #333333;

        .issue-button {
            background: #da4939;
            width: 100%;
            height: 100px;
            color: #f2f2f2;
            text-align: center;
            line-height: 100px;
            position: fixed;
            left: 0;
            bottom: 0;
        }

        .ql-toolbar.ql-snow {
            border: 1px solid #ECECEC !important;
        }

        .ql-container.ql-snow {
            border: none;
        }
    }

    ._v-content {
        padding-bottom: 50px !important;
    }

</style>
