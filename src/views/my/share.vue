<template>
    <div id="news-content">
        <headInfo :headInfo="headInfo"></headInfo>
        <scroller class="adv-box" :on-infinite="loadMore" ref="my_scroller"
                  loading-layer-color="#000000">
            <div class="adv-box-item" v-for="(item,index) in advList" :key="index" @click="skipDetails(item.id)">
                <div class="adv-text">{{item.title}}</div>
                <div class="tool">
                    <div class="choose" @click.stop="choose(item.id)"></div>
                </div>
            </div>
        </scroller>
        <modal :modal-option="modalOption" v-show="modalShow" ref="modalBox"></modal>
    </div>
</template>

<script>
    import modal from '../../components/msg'
    import wx from 'weixin-jsapi'
    import headInfo from '../../components/headInfo'

    export default {
        name: "news-content",
        components: {headInfo, modal},
        metaInfo: {
            title: '分享广告',
        },
        data() {
            return {
                modalData: {
                    modalShow: false,
                    id: '',
                },
                news: '',
                title: '',
                advert_info: '',
                time: '',
                commentList: [],
                headInfo: {
                    title: '分享广告',
                    isReturn: true
                },
                modalShow: false,
                modalOption: {},
                loadMoreStatus: false,
                page: 1,
                advList: [],
                share_link: '',
                newsId: '',
                imgUrl: ''
            }
        },
        created() {
            this.newsId = this.$route.query.id;
            this.$axios('get', '/index.php?m=&c=Index&a=detailArticle', {id: this.newsId}, (res) => {
                let data = res.data;
                this.imgUrl = this.fixedIp() + JSON.parse(data.article.pic)[0];
                this.title = data.article.title;
            });
            this.oneGetList();
        },
        methods: {
            // 分享
            share(id) {
                let that = this;
                let url = location.href.split('#')[0];
                this.share_link = this.fixedIp() + '/dist/shareNews?id=' + this.newsId + "&advert_id=" + id;
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
                            'onMenuShareTimeline', // 分享到朋友圈接口
                            'onMenuShareAppMessage',//分享给好友
                        ]
                    });
                    wx.checkJsApi({
                        jsApiList: [
                            'onMenuShareTimeline', // 分享到朋友圈接口
                            'onMenuShareAppMessage',//分享给好友
                        ],
                        success: function (res) {

                        }
                    });

                    wx.ready(function () {
                        // 分享到朋友圈
                        wx.onMenuShareTimeline({
                            title: that.title, // 分享标题
                            desc: "分享描述", // 分享描述
                            imgUrl: that.imgUrl,//分享图片
                            link: that.share_link, // 分享链接
                            success: function () {
                                window.alert('已分享到朋友圈');
                            },
                            cancel: function () {

                            },
                            fail: function (res) {
                                window.alert(JSON.stringify(res), '失败');
                            }
                        });
                        wx.onMenuShareAppMessage({
                            title: that.title, // 分享标题
                            desc: "分享描述", // 分享描述
                            imgUrl: that.imgUrl,//分享图片
                            link: that.share_link, // 分享链接
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                // alert('share successful');
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                                // alert('share cancel');
                            }
                        }); // end onMenuShareAppMessage

                        wx.error(function (res) {
                            alert('分享失败')
                        })

                    });
                })
            },
            loadMore(done) {
                if (this.loadMoreStatus) {
                    this.page = this.page + 1;
                    this.getList(done);
                } else {
                    done(true);
                }
            },
            oneGetList() {
                this.$axios('get', '/index.php?m=&c=Index&a=userAdvert', {page: this.page}, (res) => {
                    this.advList = this.advList.concat(res.data.list);
                    if (this.advList.length >= this.count) {
                        this.loadMoreStatus = false;
                    } else {
                        this.loadMoreStatus = true;
                    }
                });
            },
            getList(done) {
                this.$axios('get', '/index.php?m=&c=Index&a=userAdvert', {page: this.page}, (res) => {
                    this.advList = this.advList.concat(res.data.list);
                    if (this.advList.length >= this.count) {
                        this.loadMoreStatus = false;
                        done(true);
                    } else {
                        this.loadMoreStatus = true;
                        done();
                    }
                })
            },
            choose(id) {
                this.modalShow = true;
                this.modalOption = {
                    text: '请点击右上角微信分享按钮分享到朋友圈'
                };
                this.$refs.modalBox.confirm().then(() => {
                    this.modalShow = false;
                    this.relevance(id)
                }).catch(() => {
                    this.modalShow = false;
                })
            },
            // 把广告和文章关联
            relevance(id) {
                this.share(id);
            },
            skipDetails(id) {
                this.$router.push({
                    path: '/advDetails',
                    query: {
                        id: id,
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    #news-content {
        padding-top: 100px;

        .adv-box {
            width: 100% !important;
            height: calc(100% - 100px) !important;
            padding: 20px 40px;
            box-sizing: border-box;
            overflow: scroll;
            margin-top: 100px;

            .adv-box-item {
                width: 100%;
                height: 100px;
                padding: 0 20px;
                box-sizing: border-box;
                border: 1px solid #f2f2f2;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 20px 0;


                .adv-text {
                    margin-left: 20px;
                    font-size: 30px;
                }

                .tool {
                    > div {
                        width: 40px;
                        height: 40px;
                        margin: 0 20px;
                    }

                    .choose {
                        background: url("../../assets/images/fenxiang.png");
                        background-size: 100% 100%;
                    }

                }

            }
        }
    }
</style>