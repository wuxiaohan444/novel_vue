<template>
    <div id="advertising">
        <headInfo :headInfo="headInfo"></headInfo>
        <scroller class="adv-box" :on-infinite="loadMore" ref="my_scroller"
                  loading-layer-color="#000000">
            <div class="adv-box-item" v-for="(item,index) in advList" :key="index">
                <div class="adv-top">
                    <div class="time">{{item.create_time}}</div>
                    <div class="status">
                        <span class="review" v-if="item.verify_status==0">审核中</span>
                        <span class="pass" v-if="item.verify_status==1">审核通过</span>
                        <span class="fail" v-if="item.verify_status==2">审核不通过</span>
                        <span class="cause" v-if="item.verify_status==2">{{item.describe}}</span>
                    </div>
                </div>
                <div class="adv-text">{{item.title}}</div>
                <div class="tool">
                    <div class="edit" @click="editAdv(item.id)"></div>
                    <div class="delete" @click="deleteAdv(item.id)"></div>
                </div>
            </div>
        </scroller>
        <modal :modal-option="modalOption" v-show="modalShow" ref="modalBox"></modal>
    </div>
</template>

<script>
    import modal from '../../components/msg'
    import headInfo from '../../components/headInfo'

    export default {
        name: "advertising",
        metaInfo: {
            title: '文章列表',
        },
        components: {modal, headInfo},
        data() {
            return {
                advList: [],
                loadMoreStatus: false,
                modalShow: false,
                modalOption: {},
                page: 1,
                count: '',
                headInfo: {
                    title: '文章列表',
                    isReturn: true
                }

            }
        },
        created() {
            // 判断用户是否授权过
            if (localStorage.getItem('open')) {
                let code = this.getQueryVariable('code');
                if (code) {
                    this.$axios('get', '/index.php?m=&c=Index&a=getOpenid', {code: code}, (res) => {
                        localStorage.setItem("openId", res.data.openid);
                        this.oneGetList()
                    });
                } else {
                    this.oneGetList()
                }
            } else {
                localStorage.setItem('open', 'true');
                let APPID = 'wxbf9eb7f2c636b785';
                let REDIRECT_URI = encodeURIComponent(window.location.href + "?getopenid=1");
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + REDIRECT_URI + '&response_type=code&scope=snsapi_userinfo&state=lswigcn&getopenid = 1#wechat_redirect'
            }
        },
        methods: {
            loadMore(done) {
                if (this.loadMoreStatus) {
                    this.page = this.page + 1;
                    this.getList(done);
                } else {
                    this.loadMoreStatus = false;
                    done(true);
                }
            },
            editAdv(id) {
                this.$router.push({
                    path: '/publishNews',
                    query: {
                        id: id
                    }
                })
            },
            deleteAdv(id) {
                console.log(id);
                this.allot(id)
            },
            oneGetList() {
                this.$axios('get', '/index.php?m=&c=Index&a=userArticle', {page: this.page, is_copy: 0}, (res) => {
                    this.count = res.data.count;
                    this.advList = this.advList.concat(res.data.list);
                    if (this.advList.length >= this.count) {
                        this.loadMoreStatus = false;
                    } else {
                        this.loadMoreStatus = true;
                    }
                })
            },
            getList(done) {
                this.$axios('get', '/index.php?m=&c=Index&a=userArticle', {page: this.page, is_copy: 0}, (res) => {
                    this.count = res.data.count;
                    this.advList = this.advList.concat(res.data.list);
                    if (this.advList.length >= this.count) {
                        this.loadMoreStatus = false;
                        done(true);
                    } else {
                        this.loadMoreStatus = true;
                        done()
                    }
                })
            },
            allot(id) {
                this.modalShow = true;
                this.modalOption = {
                    text: '确认删除吗'
                };
                this.$refs.modalBox.confirm().then(() => {
                    this.$axios('post', '/index.php?m=&c=Index&a=delArticle', {id: id}, (res) => {
                        this.bus.$emit('tips', {
                            show: true,
                            title: res.msg
                        });
                        setTimeout(() => {
                            this.page = 1;
                            this.advList = [];
                            this.oneGetList()
                        }, 1000)
                    });
                    this.modalShow = false;
                }).catch(() => {
                    this.modalShow = false;
                })
            },
        }
    }
</script>

<style scoped lang="less">
    #advertising {
        width: 100%;
        height: 100%;

        .adv-box {
            width: 100% !important;
            height: calc(100% - 100px) !important;
            padding: 20px;
            box-sizing: border-box;
            margin-top: 100px;

            .adv-box-item {
                width: 100%;
                height: 200px;
                padding: 0 20px;
                box-sizing: border-box;
                border: 1px solid #f2f2f2;
                border-radius: 15px;
                display: flex;
                align-items: center;
                position: relative;
                margin: 20px 0;

                .adv-top {
                    position: absolute;
                    top: 10px;
                    width: 670px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .time {
                        font-size: 24px;
                        color: #999999;
                    }

                    .status {
                        > span {
                            font-size: 26px;
                        }

                        .pass {
                            color: #2ecc40;
                        }

                        .review {
                            color: orangered;
                        }

                        .fail {
                            color: red;
                        }

                        .cause {
                            color: #999999;
                        }
                    }
                }

                .adv-img {
                    width: 300px;
                }

                .adv-text {
                    margin-left: 20px;
                    font-size: 30px;
                }

                .tool {
                    position: absolute;
                    bottom: 10px;
                    display: flex;
                    right: 20px;

                    > div {
                        width: 40px;
                        height: 40px;
                        margin: 0 20px;
                    }

                    .edit {
                        background: url("../../assets/images/tubiaozhizuomobanyihuifu-.png");
                        background-size: 100% 100%;
                    }

                    .delete {
                        background: url("../../assets/images/shanchu.png");
                        background-size: 100% 100%;
                    }
                }
            }
        }
    }
</style>