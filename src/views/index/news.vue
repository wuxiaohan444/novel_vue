<template>
    <div id="news">
        <div class="search-box">
            <div class="search-left">
                <img src="../../assets/images/search-input.png" alt="" class="search-input-icon">
                <input type="text" placeholder="搜素站内资讯" v-model="keywords" @keyup.enter="search">
            </div>
            <div class="search-right" @click="publish">
                <img src="../../assets/images/publish.png" alt="" class="publish-img">
                <P class="publish-text">发布</P>
            </div>
        </div>
        <div class="mu-fun-tab">
            <div style="height: 37px;overflow: hidden">
                <div class="mu-fun-tab-scroller" ref="parent">
                    <div :style="{'width':width+'px'}">
                        <div :class="tabIndex===index?'mu-fun-tab-item active':'mu-fun-tab-item '"
                             v-for="(item,index) in tabList" :key="index" @click="chooseClass(index)">{{item}}
                        </div>
                    </div>
                </div>
            </div>

            <router-link class="mu-fun-add" to="/channel">
                <img src="../../assets/images/add-class.png" alt="">
            </router-link>
        </div>
        <scroller class="news-box" :on-infinite="loadMore" loading-layer-color="#000000">
            <div class="news-box-item" v-for="(item,index) in newList" :key="index">
                <router-link :to="'/newsContent?id='+item.id" class="item1" v-if="item.type==1">
                    <div class="item1-top">
                        <div class="item-right">
                            <p>{{item.title}}</p>
                        </div>
                        <img :src="fixedIp()+imgArr" alt="" v-for="(imgArr,index) in item.pic" :key="index">
                    </div>
                    <div class="tool"><span class="comment">{{item.nickname}}</span> <span style="padding: 0 10px"
                                                                                           v-if="item.is_has_profit==0">无收益</span>
                        <span>{{item.create_time}}</span>
                    </div>
                </router-link>
                <router-link :to="'/newsContent?id='+item.id" class="item2" v-if="item.type==2">
                    <h5>{{item.title}}</h5>
                    <div class="item-img">
                        <img :src="fixedIp()+imgArr" alt="" v-for="(imgArr,index) in item.pic" :key="index">
                    </div>
                    <div class="tool"><span class="comment">{{item.nickname}}</span> <span style="padding: 0 10px"
                                                                                           v-if="item.is_has_profit==0">无收益</span>
                        <span>{{item.create_time}}</span>
                    </div>
                </router-link>
                <router-link :to="'/newsContent?id='+item.id" class="item3" v-if="item.type==3">
                    <h5>{{item.title}}</h5>
                    <div class="tool"><span class="comment">{{item.nickname}}</span> <span style="padding: 0 10px"
                                                                                           v-if="item.is_has_profit==0">无收益</span>
                        <span>{{item.create_time}}</span>
                    </div>
                </router-link>
                <router-link :to="'/newsContent?id='+item.id" class="item4" v-if="item.type==4">
                    <h5>{{item.title}}</h5>
                    <div class="item-img">
                        <img :src="fixedIp()+item.pic[0]" alt="">
                    </div>
                    <div class="tool"><span class="comment">{{item.nickname}}</span> <span style="padding: 0 10px"
                                                                                           v-if="item.is_has_profit==0">无收益</span>
                        <span>{{item.create_time}}</span>
                    </div>
                </router-link>
            </div>
        </scroller>

        <!--                <button class="remove" @click="remove">清除</button>-->
        <!--        <div class="issue-button" @click="publish">发布文章</div>-->
        <div id="modal" v-show="modalShow">
            <div class="modal_box">
                <h5 class="title">提示</h5>
                <div class="content text">
                    <input type="text" v-model="local" placeholder="请输入所在城市">
                </div>
                <div class="btn">
                    <div @click="cancel">取消</div>
                    <div @click="affirm">确认</div>
                </div>
            </div>
        </div>
        <div class="goMy">
            <a href="http://test08.jiusencms.com/index.php?m=&c=Index&a=my">我的</a>
        </div>
    </div>
</template>

<script>
    import wx from 'weixin-jsapi'

    export default {
        name: 'Home',
        metaInfo: {
            title: '趣文列表',
        },
        data() {
            return {
                newList: [],
                loadMoreStatus: false,
                page: 1,
                count: '',
                local: '',
                modalShow: false,
                tabList: [],
                tabIndex: 0,
                width: '',
                distance: '',
                type: '',
                keywords: ''
            }
        },
        created() {
            // 判断用户是否授权过
            if (localStorage.getItem('open')) {
                let code = this.getQueryVariable('code');
                if (code) {
                    this.$axios('get', '/index.php?m=&c=Index&a=getOpenid', {code: code}, (res) => {
                        localStorage.setItem("openId", res.data.openid);
                        this.getTab();
                        this.getLoacl()
                    });
                } else {
                    this.getTab();
                    this.getLoacl()
                }
            } else {
                localStorage.setItem('open', 'true');
                let APPID = 'wxbf9eb7f2c636b785';
                let REDIRECT_URI = encodeURIComponent(window.location.href);
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + REDIRECT_URI + '&response_type=code&scope=snsapi_userinfo&state=lswigcn&getopenid = 1#wechat_redirect'
            }
        },
        mounted() {

        },
        methods: {
            search() {
                this.oneGetList()
            },
            chooseClass(index) {
                this.tabIndex = index;
                this.distance = index * 59;
                this.type = this.tabList[index];
                this.$nextTick(() => {
                    this.$refs.parent.scrollLeft = this.distance - 59;
                });
                this.oneGetList();
            },
            loadMore(done) {
                if (this.loadMoreStatus) {
                    this.page = this.page + 1;
                    this.getList(done);
                } else {
                    done(true);
                }
            },

            judgeType(arr) {
                arr.map((num) => {
                    if (num.pic.length === 0) {
                        num.type = 3
                    } else if (num.pic.length === 1) {
                        num.type = 1
                    } else if (num.pic.length > 1 && num.pic.length < 3) {
                        num.type = 4
                    } else if (num.pic.length >= 3) {
                        num.type = 2;
                        num.pic = num.pic.slice(0, 3)
                    }
                });
                return arr
            },

            getList(done) {
                this.$axios('post', '/index.php?m=&c=Index&a=getArticleList', {page: this.page}, (res) => {
                    this.count = res.data.count;
                    let data = res.data.list;
                    data.map((num) => {
                        num.pic = num.pic ? num.pic : [];
                    });
                    this.newList = this.newList.concat(this.judgeType(data));
                    if (this.newList.length >= this.count) {
                        this.loadMoreStatus = false;
                        done(true);
                    } else {
                        this.loadMoreStatus = true;
                        done();
                    }
                })
            },
            getTab() {
                this.$axios('get', '/index.php?m=&c=Index&a=ajaxArticleType', {}, (res) => {
                    this.tabList = res.data.type;
                    this.type = this.tabList[0];
                    this.oneGetList();
                });
            },

            // 首次加载
            oneGetList() {
                this.loadMoreStatus = false;
                this.page = 1;
                this.newList = [];
                this.$axios('post', '/index.php?m=&c=Index&a=getArticleList', {
                    page: this.page,
                    type: this.type,
                    keywords: this.keywords
                }, (res) => {
                    this.count = res.data.count;
                    let data = res.data.list;
                    this.width = this.tabList.length * 59;
                    data.map((num) => {
                        num.pic = num.pic ? num.pic : [];
                    });
                    this.newList = this.newList.concat(this.judgeType(data));
                    if (this.newList.length >= this.count) {
                        this.loadMoreStatus = false;
                    } else {
                        this.loadMoreStatus = true;
                    }
                })
            },
            publish() {
                this.$router.push({
                    path: '/publishNews'
                })
            },
            getLoacl() {
                let url = location.href.split('#')[0];
                let that = this;
                this.$axios('get', '/index.php?m=&c=Cistribution&a=getShare', {url: url}, (res) => {
                    let data = res.data;
                    wx.config({
                        debug: false, // true:调试时候弹窗
                        appId: data.appid, // 微信appid
                        timestamp: data.timestamp, // 时间戳
                        nonceStr: data.nonceStr, // 随机字符串
                        signature: data.signature, // 签名
                        jsApiList: [
                            // 所有要调用的 API 都要加到这个列表中
                            'getLocation',
                        ]
                    });
                    wx.ready(function () {
                        wx.checkJsApi({
                            jsApiList: [
                                'getLocation'
                            ],
                            success: function (res) {
                                if (res.checkResult.getLocation == false) {
                                    alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                                    return;
                                }
                            }
                        });
                        wx.error(function (res) {
                            alert("接口调取失败")
                        });
                        wx.getLocation({
                            success: function (res) {
                                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                                that.$axios('post', '/index.php?m=&c=Cistribution&a=getLocale', {
                                    latitude: latitude,
                                    longitude: longitude
                                }, (res) => {

                                })
                            },
                            cancel: function (res) {
                                this.modalShow = true;
                            }
                        });
                    })
                })
            },

            cancel() {
                this.modalShow = false;
            },
            affirm() {
                this.modalShow = false;
                this.$axios('post', '/index.php?m=&c=Cistribution&a=city', {city: this.local}, (res) => {
                    this.bus.$emit('tips', {
                        show: true,
                        title: res.msg
                    });
                });
            },
            remove() {
                localStorage.removeItem("open")
            },
        }
    }
</script>
<style scoped lang="less">
    .remove {
        width: 100px;
        height: 50px;
        position: fixed;
        right: 20px;
        top: 200px;
    }

    #news {
        height: 100%;

        .search-box {
            height: 110px;
            width: 100%;
            background: #DF1B0A;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 40px;
            box-sizing: border-box;

            .search-left {
                width: 593px;
                height: 70px;
                background: rgba(255, 255, 255, 1);
                border-radius: 35px;
                overflow: hidden;
                position: relative;

                .search-input-icon {
                    width: 28px;
                    height: 26px;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 30px;
                }

                input {
                    width: 100%;
                    height: 100%;
                    text-indent: 70px;
                }

                input::-webkit-input-placeholder {
                    color: #999999;
                    font-size: 27px;
                }
            }

            .search-right {
                text-align: center;

                .publish-img {
                    width: 43px;
                    height: 43px;
                }

                .publish-text {
                    font-size: 20px;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                }
            }
        }

        .mu-fun-tab {
            background: #F3F5F7;
            z-index: 999;
            padding: 0 10px;
            display: flex;

            .mu-fun-tab-scroller {
                width: 90%;
                height: 45px;
                overflow: scroll;
                overflow-y: hidden;

                > div {
                    height: 40px;
                    border-bottom: 1px solid rgba(242, 245, 248, 0.5);
                    box-sizing: border-box;

                    .mu-fun-tab-item {
                        font-size: 17px;
                        font-weight: 500;
                        width: 59px;
                        float: left;
                        text-align: center;
                        line-height: 37px;
                    }

                    .mu-fun-tab-item.active {
                        position: relative;
                        color: #DF1B0A;
                    }

                    .mu-fun-tab-item.active:after {
                        content: '';
                        position: absolute;
                        width: 30px;
                        height: 2px;
                        background: #DF1B0A;
                        left: 50%;
                        bottom: 0;
                        transform: translateX(-50%);
                    }
                }
            }

            .mu-fun-add {
                width: 10%;
                text-align: center;
                line-height: 37px;

                img {
                    width: 14.5px;
                    height: 14.5px;
                }
            }
        }

        .news-box {
            margin-top: 180px;
            box-sizing: border-box;
            height: calc(100% - 180px) !important;
            padding: 40px;

            .news-box-item {
                border-bottom: 1px solid #EBEBEB;
                margin-bottom: 20px;
                position: relative;

                .item1 {
                    display: block;
                    width: 100%;
                    padding: 0px 20px 50px 20px;
                    box-sizing: border-box;

                    .item1-top {
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        height: 180px;

                        img {
                            width: 172px;
                            border-radius: 10px;
                        }

                        .item-right {
                            font-size: 30px;
                            width: 400px;

                            p {
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 3;
                                overflow: hidden;
                            }
                        }
                    }
                }

                .item2 {
                    display: block;
                    width: 100%;
                    padding: 20px 20px 50px 20px;
                    box-sizing: border-box;

                    h5 {
                        font-size: 30px;
                        font-weight: 500;
                    }

                    .item-img {
                        margin-top: 20px;
                        margin-bottom: 20px;
                        display: flex;

                        img {
                            width: 32%;
                            height: 200px;
                            margin-right: 2%;
                            border-radius: 10px;
                        }

                        img:last-child {
                            margin-right: 0;
                        }
                    }
                }

                .item3 {
                    display: block;
                    padding: 20px 20px 50px 20px;
                    box-sizing: border-box;

                    h5 {
                        font-size: 30px;
                        font-weight: 500;
                        margin-bottom: 20px;
                    }
                }

                .item4 {
                    display: block;
                    padding: 20px 20px 50px 20px;

                    h5 {
                        font-size: 30px;
                        font-weight: 500;
                    }

                    img {
                        margin-top: 20px;
                        margin-bottom: 20px;
                        width: 100%;
                        border-radius: 20px;
                    }
                }

                .tool {
                    position: absolute;
                    font-size: 24px;
                    line-height: 50px;
                    color: #999999;
                    bottom: 10px;
                    left: 20px;
                }
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
                line-height: 60px;
                font-size: 36px;
            }

            .content {
                font-size: 30px;
                padding: 30px;
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

    .goMy{
        position: fixed;
        right: 10px;
        top: 300px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        text-align: center;
        background: rgba(218,218,218,0.8);
        a{
            color: #333333;
            font-size: 30px;
            line-height: 100px;
        }
    }
</style>
