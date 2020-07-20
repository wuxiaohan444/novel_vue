<template>
    <div id="up">
        <headInfo :headInfo="headInfo"></headInfo>
        <div class="available" v-if="noTop">
            <p>暂无上线，是否添加上线</p>
            <button class="add" @click="addTop">添加</button>
        </div>
        <div class="my_top" v-if="haveTop">
            <p class="title">我的上线</p>
            <div class="my_top_main">
                <img :src="p_data.headimg" alt="" class="head-img">
                <span class="nickname">{{p_data.nickname}}</span>
                <p>邀请码：<span>{{p_data.invite_code}}</span></p>
            </div>
            <button class="add" @click="addTop">更换上线</button>
        </div>
        <div id="modal" v-show="modalShow">
            <div class="modal_box">
                <h5 class="title">请输入邀请码</h5>
                <div class="content text">
                    <input type="text" placeholder="请输入邀请码" v-model="invitation_code">
                </div>
                <div class="btn">
                    <div @click="cancel">取消</div>
                    <div @click="affirm">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headInfo from '../../components/headInfo'

    export default {
        name: "up",
        metaInfo: {
            title: '我的上线',
        },
        components: {headInfo},
        data() {
            return {
                headInfo: {
                    title: '我的上线',
                    isReturn: true
                },
                modalShow: false,
                haveTop: false,
                noTop: false,
                invitation_code: '',//邀请码
                p_data: '',

            }
        },
        created() {
            // 判断用户是否授权过
            if (localStorage.getItem('open')) {
                let code = this.getQueryVariable('code');
                if (code) {
                    this.$axios('get', '/index.php?m=&c=Index&a=getOpenid', {code: code}, (res) => {
                        localStorage.setItem("openId", res.data.openid);
                        this.getData();
                    });
                } else {
                    this.getData();
                }
            } else {
                localStorage.setItem('open', 'true');
                let APPID = 'wxbf9eb7f2c636b785';
                let REDIRECT_URI = encodeURIComponent(window.location.href + "?getopenid=1");
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + REDIRECT_URI + '&response_type=code&scope=snsapi_userinfo&state=lswigcn&getopenid = 1#wechat_redirect'
            }
        },
        methods: {
            cancel() {
                this.modalShow = false
            },
            affirm() {
                this.$axios('post', '/index.php?m=&c=Cistribution&a=setInviteCode', {invite_code: this.invitation_code}, (res) => {
                    this.invitation_code = '';
                    this.bus.$emit('tips', {
                        show: true,
                        title: res.msg
                    });
                    this.getData();
                });
                this.modalShow = false;
            },
            addTop() {
                this.modalShow = true
            },
            getData() {
                this.$axios('post', '/index.php?m=&c=Cistribution&a=index', {}, (res) => {
                    this.p_data = res.data.p_userinfo;
                    if (this.p_data) {
                        this.haveTop = true;
                    } else {
                        this.noTop = true
                    }
                })
            },
        }
    }
</script>

<style scoped lang="less">
    #up {
        padding-top: 100px;
        box-sizing: border-box;

        .add {
            background: #ff4745;
            width: 160px;
            height: 60px;
            color: #ffffff;
            transform: translateX(250px);
            border-radius: 10px;
        }

        .available {
            font-size: 30px;
            padding: 40px;
            box-sizing: border-box;

            p {
                text-align: center;
                line-height: 100px;
            }
        }

        .my_top {
            padding: 40px;
            box-sizing: border-box;

            .title {
                font-size: 30px;
                line-height: 70px;
                border-bottom: 1px solid #f2f2f2;
            }

            .my_top_main {
                display: flex;
                align-items: center;
                justify-content: space-around;
                height: 100px;

                .head-img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                }

                .nickname {
                    font-size: 30px;
                    width: 200px;
                    text-align: center;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
        }


        #modal {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 999;

            .modal_box {
                width: 70%;
                min-height: 300px;
                background: white;
                border-radius: 15px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                color: #333333;

                h5 {
                    text-align: center;
                    line-height: 70px;
                    font-size: 36px;
                }

                .content {
                    font-size: 30px;
                    padding: 30px;
                    line-height: 80px;
                }

                .btn {
                    width: 100%;
                    display: flex;
                    position: fixed;
                    bottom: 5px;

                    > div {
                        flex: 1;
                        text-align: center;
                        height: 80px;
                        line-height: 80px;
                        border-top: 1px solid #cccccc;
                    }

                    > div:nth-child(2) {
                        border-left: 1px solid #cccccc;
                        color: #44C189;
                    }
                }
            }
        }
    }
</style>