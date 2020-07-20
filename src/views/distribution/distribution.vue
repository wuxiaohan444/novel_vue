<template>
    <div id="distribution">
        <headInfo :headInfo="headInfo"></headInfo>
        <div class="distribution-info">
            <div class="info">
                <img :src="moneyData.userinfo?moneyData.userinfo.headimg:''" alt="">
                <div class="info-text">
                    <p>{{moneyData.userinfo?moneyData.userinfo.nickname:''}}</p>
                    <span>推荐人：{{moneyData.p_userinfo?moneyData.p_userinfo.nickname:'暂无推荐人'}}</span>
                </div>
            </div>
            <div class="head-bottom">
                <div class="bottom-left">
                    <p>可提现佣金</p>
                    <span>{{moneyData.ke}}元</span>
                </div>
                <button class="bottom-right" @click="deposit">提现</button>
            </div>
        </div>
        <div class="commission">
            <div class="commission-item one">
                <p style="color: #2ecc40">已提现佣金</p>
                <span>{{moneyData.yi}}元</span>
            </div>
            <div class="commission-item">
                <p style="color: orange">未提现佣金</p>
                <span>{{moneyData.wei}}元</span>
            </div>
        </div>
        <div class="menu">
            <router-link class="menu-item" to="/commission">
                <img src="../../assets/images/yongjing.png" alt="">
                <p>分销佣金</p>
                <p><span>{{moneyData.zong}}</span>元</p>
            </router-link>
            <router-link class="menu-item" to="/deposit">
                <img src="../../assets/images/mingxi.png" alt="">
                <p>提现明细</p>
                <p><span>{{moneyData.tixian}}</span>元</p>
            </router-link>
            <router-link class="menu-item" to="/team">
                <img src="../../assets/images/tuandui.png" alt="">
                <p>我的团队</p>
                <p><span>{{moneyData.tuan}}</span>元</p>
            </router-link>
            <div class="menu-item" @click="openQr">
                <img src="../../assets/images/qr.png" alt="">
                <p>推广二维码</p>
            </div>
        </div>
        <modal :modal-option="modalOption" v-show="modalShow" ref="modalBox"></modal>
        <div class="qr-modal" v-show="qr_show">
            <div id="qrcode" ref="qrcode"></div>
            <img src="../../assets/images/close1.png" alt="" class="close" @click="closeQr">
            <button @click="downloadAppCodeImg" class="downImg" v-if="false">下载二维码</button>
        </div>
    </div>
</template>

<script>
    import modal from '../../components/msg'
    import headInfo from '../../components/headInfo'
    import QRCode from 'qrcodejs2'

    export default {
        name: "distribution",
        components: {headInfo, modal},
        metaInfo: {
            title: '我的分销',
        },
        data() {
            return {
                headInfo: {
                    title: '我的分销',
                    isReturn: true
                },
                modalShow: false,
                modalOption: {},
                qrcode: '',
                qr_show: false,
                moneyData: {}
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
            deposit() {
                this.$router.push({
                    path: '/withdraw'
                })
            },
            getData() {
                this.$axios('post', '/index.php?m=&c=Cistribution&a=index', {}, (res) => {
                    this.moneyData = res.data
                })
            },
            allot() {
                this.modalShow = true;
                this.modalOption = {
                    text: '是否申请提现？'
                };
                this.$refs.modalBox.confirm().then(() => {
                    this.modalShow = false;
                    let data = {
                        title: this.title,
                        content: this.editorHtml,
                        is_original: 1,
                        id: this.id,
                    };
                    //提现接口
                    this.$axios('post', '/index.php?m=&c=Index&a=setArticle', data, (res) => {
                        this.bus.$emit('tips', {
                            show: true,
                            title: res.msg
                        });
                    })
                }).catch(() => {
                    this.modalShow = false;
                })
            },
            // 生成二维码
            crateQrcode() {
                this.qr = new QRCode('qrcode', {
                    width: 150,
                    height: 150, // 高度
                    text: this.qrcode, // 二维码内容
                    colorDark: '#589649',
                    colorLight: '#fff',
                    render: 'canvas', // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                })
            },
            openQr() {
                if (!this.qrcode) {
                    this.$axios('get', '/index.php?m=&c=Cistribution&a=getQrCodeUrl', {}, (res) => {
                        console.log(res.data);
                        this.qrcode = res.data.url;//二维码链接
                        // 使用$nextTick确保数据渲染
                        this.$nextTick(() => {
                            this.crateQrcode();
                        });
                        setTimeout(() => {
                            this.qr_show = true;
                        }, 200);
                    });
                } else {
                    this.qr_show = true;
                }
            },
            closeQr() {
                this.qr_show = false;
            },
            //下载二维码
            downloadAppCodeImg(name) {
                var canvasData = this.$refs.qrcode.getElementsByTagName('canvas');
                var a = document.createElement("a");
                var event = new MouseEvent("click"); // 创建一个单击事件
                a.href = canvasData[0].toDataURL("image/png");
                a.download = "drcQrcode";
                a.dispatchEvent(event); // 触发a的单击事件
            },
        }
    }
</script>

<style scoped lang="less">
    #distribution {
        background: #f2f2f2;
        height: 100%;
        padding-top: 100px;
        box-sizing: border-box;
    }

    .distribution-info {
        width: 100%;
        height: 300px;
        background: #FF4745;

        .info {
            width: 90%;
            height: 160px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #FA6E69;
            box-sizing: border-box;

            img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
            }

            .info-text {
                margin-left: 40px;
                color: #ffffff;
                font-size: 30px;
                line-height: 60px;
            }
        }

        .head-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 140px;
            width: 90%;
            margin: 0 auto;

            .bottom-left {
                color: #ffffff;
                font-size: 30px;
                line-height: 60px;
            }

            .bottom-right {
                width: 140px;
                height: 70px;
                border-radius: 10px;
                outline: none;
                background: #FA6E69;
                font-size: 35px;
                color: #ffffff;
            }
        }
    }

    .commission {
        height: 200px;
        display: flex;
        text-align: center;
        align-items: center;
        background: #ffffff;

        .commission-item {
            width: 50%;
            font-size: 32px;
            line-height: 60px;
            color: #333333;
        }

        .one {
            position: relative;
        }

        .one:after {
            content: '';
            position: absolute;
            width: 1px;
            height: 100px;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            background: #f2f2f2;
        }
    }

    .menu {
        margin-top: 40px;
        display: flex;
        flex-wrap: wrap;
        background: #ffffff;

        .menu-item {
            width: 33.3%;
            height: 230px;
            border-right: 1px solid #f2f2f2;
            border-bottom: 1px solid #f2f2f2;
            box-sizing: border-box;
            text-align: center;

            img {
                width: 64px;
                margin-top: 40px;
            }

            p {
                font-size: 30px;
                color: #333333;
                line-height: 50px;

                span {
                    color: #c4858e;
                }
            }
        }

        .menu-item:nth-child(3) {
            border-right: none;
        }

        .menu-item:nth-child(4) {
            border-bottom: none;
        }
    }

    .qr-modal {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;

        #qrcode {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            background: #ffffff;
            border-radius: 10px;
        }

        .close {
            position: absolute;
            left: 50%;
            top: 70%;
            transform: translate(-50%, -50%);
            color: #333333;
            width: 80px;
        }

        .downImg {
            position: absolute;
            left: 50%;
            top: 78%;
            transform: translate(-50%, -50%);
            color: #ffffff;
            width: 160px;
            height: 70px;
            background: #FA6E69;
            border-radius: 10px;
        }
    }
</style>