<template>
    <div id="my">
        <headInfo :headInfo="headInfo"></headInfo>
        <div class="my_main">
            <div class="my_main_item"  @click="skip">
                <div class="item_left">
                    <img src="../../assets/images/renwu.png" alt="">
                    <span>发布广告</span>
                </div>
                <img src="../../assets/images/next.png" alt="">
            </div>
            <router-link to=/advertising class="my_main_item"  @click="skip">
                <div class="item_left">
                    <img src="../../assets/images/list.png" alt="">
                    <span>广告列表</span>
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
        components:{headInfo},
        metaInfo: {
            title:'任务中心',
        },
        data(){
            return{
                headInfo: {
                    title: '任务中心',
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
                // this.$router.push({
                //     path:'/publishMissionApply'
                // })

                this.$router.push({
                    path: '/mission'
                })
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

    .my_main {
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