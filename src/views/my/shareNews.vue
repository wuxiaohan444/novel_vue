<template>
    <div id="news-content">
        <headInfo :headInfo="headInfo"></headInfo>
        <div class="new-title">{{title}}</div>
        <div class="time">{{time}}</div>
        <div class="new-box" v-html="news"></div>
        <div class="advertising">
            <a href="javascript:;">
                <img :src="advert_info.pic?fixedIp()+advert_info.pic:''" alt="">
                <p><span>广告</span> </p>
            </a>
        </div>
    </div>
</template>

<script>
    import headInfo from '../../components/headInfo'

    export default {
        name: "news-content",
        components: {headInfo},
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
                headInfo: {
                    title: '文章中心',
                    isReturn: false
                },
                type: '',
                times: '',
                advert_id:'',
            }
        },
        created() {
            this.id = this.getQueryVariable('id');
            this.advert_id = this.getQueryVariable('advert_id');
            this.getContent();
        },
        methods: {
            getContent() {
                this.$axios('get', '/index.php?m=&c=Cistribution&a=shareArticle', {article_id: this.id,advert_id:this.advert_id}, (res) => {
                    let data = res.data;
                    console.log(data);
                    this.news = data.article.content;
                    this.title = data.article.title;
                    this.modalData.id = data.article.id;
                    this.time = data.article.create_time;
                    this.advert_info = data.advert;
                })
            },
        },
    }
</script>

<style lang="less">
    #news-content {
        padding-top: 100px;

        .new-title {
            padding: 20px;
            font-size: 36px;
            line-height: 70px;
            font-weight: 700;
        }

        .time {
            text-indent: 20px;
            font-size: 26px;
            line-height: 50px;
            color: #999999;
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
            padding: 20px;
            box-sizing: border-box;
            background: #f2f2f2;

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
                display: flex;

                .headImg {
                    img {
                        width: 60px;
                        height: 60px;
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
                        color: #999999;
                    }

                    .content {
                        font-size: 26px;
                        color: #333333;
                        overflow: hidden;
                    }
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
    }
</style>