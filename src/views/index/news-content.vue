<template>
    <div id="news-content" :class="advert_info.length!==0?'haveAd':''">
        <headInfo :headInfo="headInfo"></headInfo>
        <div class="new-title">{{title}}</div>
        <div class="user-info">
            <div class="user-left">
                <img :src="info.headimg" alt="">
                <span>{{info.nickname}}</span>
            </div>
            <div class="time">{{time}}</div>
        </div>

        <div class="new-box" v-html="news"></div>
        <!--        <div class="advertising">-->
        <!--            <a :href="advert_info.url" @click="chooseAdv">-->
        <!--                <img :src="advert_info.pic?fixedIp()+advert_info.pic:''" alt="">-->
        <!--                <p v-if="advert_info.title"><span>广告</span> <span>{{advert_info.title}}</span></p>-->
        <!--            </a>-->
        <!--        </div>-->
        <div class="copy">
            <span @click="copyArticle">复制文章</span>
        </div>
        <div class="comment">
            <!--            <div class="comment-top">-->
            <!--                <span>评论</span>-->
            <!--                <button @click="write">写评论</button>-->
            <!--            </div>-->
            <div class="comment-item" v-for="(item,index) in commentList" :key="index">
                <div class="headImg">
                    <img :src="item.headimg" alt="">
                </div>
                <div class="item-right">
                    <div class="item-right-top">
                        <p class="username">{{item.nickname}}</p>
                        <span class="time">{{item.create_time}}</span>
                    </div>
                    <p class="content">{{item.content}}</p>
                </div>
            </div>
            <div v-if="commentList.length==0" class="none-comment">暂时还没有留言，快来留言吧</div>
            <div class="write-box" @click="write">
                <img src="../../assets/images/write.png" alt=""><span>写评论</span>
            </div>
        </div>
        <comment :modalData="modalData" v-on:closeModal="closeModal"></comment>
        <div class="new-ad" @click="chooseAdv(advert_info.url)" v-if="advert_info.length!==0">
            <div class="new-ad-left">
                <img :src="advert_info.pic?fixedIp()+advert_info.pic:''" alt="">
            </div>
            <div class="new-ad-right">
                <p>{{advert_info.title}}</p>
            </div>
            <!--            <span class="ad-hint">广告</span>-->
            <img src="../../assets/images/close.png" alt="" class="close-ad" @click.stop="closeAd">
        </div>
    </div>
</template>

<script>
    import comment from '../../components/comment'
    import headInfo from '../../components/headInfo'

    export default {
        name: "news-content",
        components: {comment, headInfo},
        metaInfo: {
            title: '文章中心',
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
                    title: '文章中心',
                    isReturn: true
                },
                type: '',
                times: '',
                info: '',
            }
        },
        created() {
            this.id = this.$route.query.id;
            // 判断用户是否授权过
            if (localStorage.getItem('open')) {
                let code = this.getQueryVariable('code');
                if (code) {
                    this.id = this.getQueryVariable('id');
                    this.$axios('get', '/index.php?m=&c=Index&a=getOpenid', {code: code}, (res) => {
                        localStorage.setItem("openId", res.data.openid);
                        this.getContent();
                    });
                } else {
                    this.getContent();
                }
            } else {
                localStorage.setItem('open', 'true');
                let APPID = 'wxbf9eb7f2c636b785';
                let REDIRECT_URI = encodeURIComponent(window.location.href);
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + REDIRECT_URI + '&response_type=code&scope=snsapi_userinfo&state=lswigcn&getopenid = 1#wechat_redirect'
            }
        },
        mounted() {
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);
            }
        },
        methods: {
            write() {
                this.modalData.modalShow = true;
            },
            getType() {
                this.$axios('get', '/index.php?m=&c=Cistribution&a=getAdvertType', {id: this.id}, (res) => {
                    let data = res.data;
                    this.type = data.type;
                    this.times = data.times;
                    if (this.type == 0) {
                        this.billing()
                    } else if (this.type == 2) {
                        setTimeout(() => {
                            this.billing()
                        }, this.times * 1000)
                    }
                })
            },
            getContent() {
                this.$axios('get', '/index.php?m=&c=Index&a=detailArticle', {id: this.id}, (res) => {
                    let data = res.data;
                    this.info = data.article;
                    this.news = data.article.content;
                    this.title = data.article.title;
                    this.modalData.id = data.article.id;
                    let time = new Date(data.article.create_time).getTime();
                    this.time = this.getSwitchTime(time);
                    this.advert_info = data.advert_info;
                    this.commentList = data.comment_list;
                    this.getType()
                })
            },
            chooseAdv(url) {
                if (this.type == 1) {
                    this.billing()
                }
                window.location.href = url
            },
            billing() {
                this.$axios('post', '/index.php?m=&c=Cistribution&a=readAddChargeAjax', {
                    advert_id: this.advert_info.id,
                    article_id: this.id
                }, (res) => {
                })
            },
            closeAd() {
                this.advert_info = []
            },
            closeModal(modalShow) {
                this.modalData.modalShow = modalShow.closeModal;
                if (modalShow.refresh) {
                    this.$axios('get', '/index.php?m=&c=Index&a=detailArticle', {id: this.id}, (res) => {
                        let data = res.data;
                        this.commentList = data.comment_list;
                    })
                }
            },
            // 复制文章
            copyArticle() {
                this.$axios('post', '/index.php?m=&c=Index&a=copyArticle', {user_article_id: this.id}, (res) => {
                    this.bus.$emit('tips', {
                        show: true,
                        title: res.msg
                    });
                })
            },
            goBack() {
                console.log("点击了浏览器的返回按钮");
                this.$router.replace({
                    path: '/'
                })
            },
            getSwitchTime(dateTimeStamp) {
                var minute = 1000 * 60;
                var hour = minute * 60;
                var day = hour * 24;
                var halfamonth = day * 15;
                var month = day * 30;
                var now = new Date().getTime();
                var diffValue = now - dateTimeStamp;
                if (diffValue < 0) {
                    return;
                }
                var monthC = diffValue / month;
                var weekC = diffValue / (7 * day);
                var dayC = diffValue / day;
                var hourC = diffValue / hour;
                var minC = diffValue / minute;
                var result = '';
                if (monthC >= 1) {
                    result = "" + parseInt(monthC) + "月前";
                } else if (weekC >= 1) {
                    result = "" + parseInt(weekC) + "周前";
                } else if (dayC >= 1) {
                    result = "" + parseInt(dayC) + "天前";
                } else if (hourC >= 1) {
                    result = "" + parseInt(hourC) + "小时前";
                } else if (minC >= 1) {
                    result = "" + parseInt(minC) + "分钟前";
                } else
                    result = "刚刚";
                return result;
            }
        },
        destroyed() {
            window.removeEventListener('popstate', this.goBack, false);
        },
    }
</script>

<style lang="less" scoped>
    #news-content {
        padding-top: 100px;

        .new-title {
            padding: 20px;
            font-size: 48px;
            line-height: 70px;
            font-weight: 700;
        }

        .user-info {
            padding: 0 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .user-left {
                display: flex;
                align-items: center;

                img {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                }

                span {
                    font-size: 30px;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: rgba(51, 51, 51, 1);
                    padding-left: 10px;
                }
            }

            .time {
                text-indent: 20px;
                font-size: 26px;
                line-height: 50px;
                color: #999999;
            }
        }

        .new-box {
            padding: 20px;
            width: 100%;
            overflow: hidden;
            line-height: 50px;
            font-size: 26px;
            box-sizing: border-box;

            img {
                max-width: 100% !important;
            }
        }

        .comment {
            border-top: 1px solid #ECECEC;
            padding: 20px 40px;
            background: #ffffff !important;
            box-sizing: border-box;

            .comment-top {
                display: flex;
                justify-content: space-between;

                span {
                    font-size: 36px;
                }

                button {
                    padding: 0 10px;
                    background: #f8f8f8;
                }
            }

            .none-comment {
                text-align: center;
                line-height: 100px;
                font-size: 30px;
            }

            .comment-item {
                margin: 20px 0;

                .headImg {
                    img {
                        width: 70px;
                        height: 70px;
                        border-radius: 50%;
                    }
                }

                .item-right {
                    margin-left: 20px;
                    width: 600px;

                    .item-right-top {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .username {
                        font-size: 26px;
                        color: #1B4886 !important;
                    }

                    .content {
                        font-size: 30px !important;
                        color: #333333;
                        overflow: hidden;
                    }
                }
            }

            .write-box {
                width: 670px;
                height: 80px;
                background: rgba(237, 237, 237, 1);
                border-radius: 40px;
                padding-left: 40px;
                box-sizing: border-box;
                line-height: 80px;

                img {
                    width: 33px;
                    height: 30px;
                }

                span {
                    font-size: 34px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(153, 153, 153, 1);
                    padding-left: 10px;
                }
            }
        }

        .copy {
            font-size: 28px;
            line-height: 100px;
            height: 100px;
            padding: 0 20px;

            span {
                float: right;
                position: relative;
            }

            span:before {
                content: '';
                position: absolute;
                left: -60px;
                top: 50%;
                transform: translateY(-50%);
                width: 40px;
                height: 40px;
                background: url("../../assets/images/copy.png");
                background-size: 100% 100%;
            }
        }

        .advertising {
            width: 100%;

            a {
                display: block;
                width: 100%;
                padding: 20px;
                box-sizing: border-box;

                img {
                    width: 100%;
                }

                p {
                    font-size: 24px;
                    color: #999999;
                }
            }

        }

        .new-ad {
            z-index: 98;
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 180px;
            background: #F2F2F2;
            display: flex;
            align-items: center;
            padding: 0 20px;
            box-sizing: border-box;

            .new-ad-left {
                img {
                    width: 200px;
                    border-radius: 10px;
                }
            }

            .new-ad-right {
                margin-left: 30px;
                font-size: 32px;
            }

            .ad-hint {
                position: absolute;
                right: 5px;
                top: 5px;
                font-size: 28px;
                color: #333333;
            }

            .close-ad {
                position: absolute;
                right: 10px;
                top: 10px;
                width: 40px;
            }
        }
    }

    #news-content.haveAd {
        padding-bottom: 200px;
    }
</style>