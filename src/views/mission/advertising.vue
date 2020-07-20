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
<!--                <img :src="fixedIp()+item.pic" alt="" class="adv-img">-->
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
        components: {modal,headInfo},
        metaInfo: {
            title:'广告列表',
        },
        data() {
            return {
                advList: [],
                loadMoreStatus: false,
                modalShow: false,
                modalOption: {},
                page: 1,
                count: '',
                headInfo: {
                    title: '广告列表',
                    isReturn:true
                }
            }
        },
        created() {
            this.oneGetList()
        },
        methods: {
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
            editAdv(id) {
                this.$router.push({
                    path: '/mission',
                    query: {
                        id: id
                    }
                })
            },
            deleteAdv(id) {
                this.allot(id)
            },
            allot(id) {
                this.modalShow = true;
                this.modalOption = {
                    text: '确认删除吗'
                };
                this.$refs.modalBox.confirm().then(() => {
                    this.$axios('get', '/index.php?m=&c=Index&a=delAdvert', {id: id}, (res) => {
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
            padding: 20px 40px;
            box-sizing: border-box;
            overflow: scroll;
            margin-top: 100px;

            .adv-box-item {
                width: 100%;
                /*height: 350px;*/
                height: 180px;
                padding: 0 20px;
                box-sizing: border-box;
                border: 1px solid #f2f2f2;
                border-radius: 8px;
                margin: 20px 0;

                .adv-img {
                    width: 300px;
                    height: 225px;
                }

                .adv-text {
                    margin-left: 20px;
                    font-size: 30px;
                    line-height: 60px;
                }

                .tool {
                    display: flex;
                    justify-content: flex-end;
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

                .adv-top {
                    width: 600px;
                    height: 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .time {
                        font-size: 24px;
                        color: #999999;
                    }

                    .status {
                        font-size: 30px;

                        .pass {
                            color: #2ecc40;
                        }

                        .review {
                            color: orangered;
                        }

                        .fail {
                            color: red;
                        }
                    }


                }
            }
        }
    }
</style>