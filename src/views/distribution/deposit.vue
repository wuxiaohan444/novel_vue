<template>
    <div id="deposit">
        <headInfo :headInfo="headInfo"></headInfo>
        <scroller class="deposit-box" :on-infinite="loadMore" loading-layer-color="#000000">
            <div class="deposit-box-item" v-for="(item,index) in dataList" :key="index">
                <div class="tool">
                    <span class="time">{{item.create_time}}</span>
                    <span class="status being" v-if="item.status==0">申请中</span>
                    <span class="status pass" v-if="item.status==1">申请通过</span>
                    <span class="status already" v-if="item.status==2">已付款</span>
                    <span class="status refuse" v-if="item.status==3">拒绝</span>
                    <span class="status revocation" v-if="item.status==4">撤销</span>
                </div>
                <div class="item-main">
                    <div>
                        <p>提现人</p>
                        <span>{{item.nickname}}</span>
                    </div>
                    <div>
                        <p>提现金额</p>
                        <span>{{item.charge}}元</span>
                    </div>
                    <div>
                        <p>提现方式</p>
                        <span v-if="item.type==0">支付宝</span>
                        <span v-if="item.type==1">微信</span>
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
    import headInfo from '../../components/headInfo'

    export default {
        name: "deposit",
        components: {headInfo},
        metaInfo: {
            title: '提现明细',
        },
        data() {
            return {
                headInfo: {
                    title: '提现明细',
                    isReturn: true
                },
                loadMoreStatus: false,
                page: 1,
                count: '',
                dataList: []
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

            getList(done) {
                this.$axios('get', '/index.php?m=&c=Cistribution&a=withdrawalList', {page: this.page}, (res) => {
                    this.count = res.data.count;
                    let data = res.data.list;
                    this.dataList = this.dataList.concat(data);
                    if (this.dataList.length >= this.count) {
                        this.loadMoreStatus = false;
                        done(true);
                    } else {
                        this.loadMoreStatus = true;
                        done();
                    }
                })
            },
            // 首次加载
            oneGetList() {
                this.$axios('get', '/index.php?m=&c=Cistribution&a=withdrawalList', {page: this.page}, (res) => {
                    this.count = res.data.count;
                    let data = res.data.list;
                    this.dataList = this.dataList.concat(data);
                    if (this.dataList.length >= this.count) {
                        this.loadMoreStatus = false;
                    } else {
                        this.loadMoreStatus = true;
                    }
                })
            },
        }
    }
</script>

<style scoped lang="less">
    #deposit {
        background: #f2f2f2;
        height: 100%;
        padding-top: 100px;
        box-sizing: border-box;

        .deposit-box {
            height: calc(100% - 100px) !important;
            padding-top: 100px;

            .deposit-box-item {
                padding: 0 40px;
                height: 160px;
                background: #ffffff;
                margin-bottom: 40px;

                .tool {
                    line-height: 50px;
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #f2f2f2;

                    .time {
                        color: #999999;
                        font-size: 26px;
                    }

                    .status {
                        font-size: 30px;
                    }

                    .status.being {
                        color: orange;
                    }

                    .status.pass {
                        color: #2ecc40;
                    }

                    .status.already {
                        color: #7fdbff;
                    }

                    .status.refuse {
                        color: #da4939;
                    }

                    .status.revocation {
                        color: #999999;
                    }
                }

                .item-main {
                    display: flex;
                }

                .item-main > div {
                    flex: 1;
                    text-align: center;
                    font-size: 30px;
                    color: #333333;

                    p {
                        line-height: 60px;
                    }
                }
            }
        }
    }
</style>