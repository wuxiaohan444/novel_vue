<template>
    <div id="my">
<!--        <div class="my_head">-->
<!--            <div class="my_head_box">-->
<!--                <div class="box_top">-->
<!--                    <img src="" alt="">-->
<!--                    <span>18945678021</span>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
        <headInfo :headInfo="headInfo"></headInfo>
        <div class="my_main">
            <router-link to="/newsList" class="my_main_item">
                <div class="item_left">
                    <img src="../../assets/images/wenzhang.png" alt="">
                    <span>文章列表</span>
                </div>
                <img src="../../assets/images/next.png" alt="">
            </router-link>
            <router-link to="/collectList" class="my_main_item">
                <div class="item_left">
                    <img src="../../assets/images/copy.png" alt="">
                    <span>我的复制</span>
                </div>
                <img src="../../assets/images/next.png" alt="">
            </router-link>
            <router-link to="/distribution" class="my_main_item">
                <div class="item_left">
                    <img src="../../assets/images/fenxiao.png" alt="">
                    <span>我的分销</span>
                </div>
                <img src="../../assets/images/next.png" alt="">
            </router-link>
            <router-link to="/up" class="my_main_item">
                <div class="item_left">
                    <img src="../../assets/images/shangxian.png" alt="">
                    <span>我的上线</span>
                </div>
                <img src="../../assets/images/next.png" alt="">
            </router-link>
        </div>
    </div>
</template>

<script>
    import headInfo from '../../components/headInfo'
    export default {
        name: "my",
        metaInfo: {
            title: '我的',
        },
        components: {headInfo},
        data(){
            return{
                headInfo: {
                    title: '我的',
                    isReturn:false
                }
            }
        },
        created(){
            // 判断用户是否授权过
            if (localStorage.getItem('open')) {
                let code = this.getQueryVariable('code');
                if (code) {
                    this.$axios('get', '/index.php?m=&c=Index&a=getOpenid', {code: code}, (res) => {
                        localStorage.setItem("openId", res.data.openid);
                    });
                }
            } else {
                localStorage.setItem('open', 'true');
                let APPID = 'wxbf9eb7f2c636b785';
                let REDIRECT_URI = encodeURIComponent(window.location.href + "?getopenid=1");
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + REDIRECT_URI + '&response_type=code&scope=snsapi_userinfo&state=lswigcn&getopenid = 1#wechat_redirect'
            }
        },
        methods:{
            skip(){
                this.$router.push({
                    path:'/publishMissionApply'
                })

                // this.$router.push({
                //     path:'/mission'
                // })
            }
        }
    }
</script>

<style scoped lang="less">
    #my {
        background: #F8F8FA;
        min-height: 100%;
        padding-top: 100px;
        box-sizing: border-box;
    }

    .my_head {
        height: 140px;
        background: #FF0202;
        position: relative;
        .my_head_box {
            width: 690px;
            height: 150px;
            background: white;
            border-radius: 20px;
            position: absolute;
            top: 42px;
            left: 50%;
            transform: translateX(-50%);
            padding: 40px;
            box-sizing: border-box;
            .box_top {
                display: flex;
                align-items: center;
                font-size: 30px;
                color: rgba(51, 51, 51, 1);
                img {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }
            }
        }
    }

    .my_main {
        margin-top: 10px;
        background: white;
        padding: 0 30px;
        box-sizing: border-box;
        .my_main_item {
            display: flex;
            height: 88px;
            align-items: center;
            justify-content: space-between;
            box-shadow:0px 2px 0px 0px rgba(153,153,153,0.3);
            .item_left {
                display: flex;
                align-items: center;
                font-size: 30px;
                img {
                    width: 50px;
                    margin-right: 10px;
                }
            }
            >img{
                width: 60px;
            }
        }
        .my_main_item:last-child{
            box-shadow:0 0 0 0 rgba(153,153,153,0.3);
        }
    }
</style>