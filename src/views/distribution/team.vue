<template>
    <div id="team">
        <headInfo :headInfo="headInfo"></headInfo>
        <div class="tab-team">
            <div :class="tabIndex===index?'active':''" v-for="(item,index) in tabList" @click="chooseType(index)">
                {{item.name}}
            </div>
        </div>
        <div class="team-box">
            <div class="team-box-item" v-for="(item,index) in dataList" :key="index">
                <div class="item-top">
                    <div class="item1-top-info">
                        <img :src="item.userinfo.headimg"
                             alt="">
                        <div>
                            <p>{{item.userinfo.nickname}}</p>
                            <p>注册时间 <span class="time">{{item.userinfo.join_time}}</span></p>
                        </div>
                    </div>
                    <div class="tuiguang">推广{{item.tuiguang}}人</div>
                </div>
                <div class="item-bottom">
                    <div>收益{{item.shouyi}}元</div>
                </div>
            </div>
            <div v-if="dataList.length==0" class="nodata">暂无数据</div>
        </div>
    </div>
</template>

<script>
    import headInfo from '../../components/headInfo'

    export default {
        name: "team",
        metaInfo: {
            title: '我的团队',
        },
        components: {headInfo},
        data() {
            return {
                tabList: [{name: '一级'}, {name: '二级'}],
                tabIndex: 0,
                headInfo: {
                    title: '我的团队',
                    isReturn: true
                },
                type: 0,
                dataList: []
            }
        },
        created() {
            this.oneGetList()
        },
        methods: {
            chooseType(index) {
                this.tabIndex = index;
                this.type = index;
                this.oneGetList()
            },
            // 首次加载
            oneGetList() {
                this.$axios('post', '/index.php?m=&c=Cistribution&a=tuandui', {type: this.type}, (res) => {
                    let data = res.data;
                    this.dataList = data;
                })
            },
        }
    }
</script>

<style scoped lang="less">
    #team {
        background: #f2f2f2;
        height: 100%;
        padding-top: 100px;
        box-sizing: border-box;
    }

    .tab-team {
        display: flex;
        width: 100%;
        border-bottom: 1px solid #f2f2f2;
        background: #ffffff;

        > div {
            flex: 1;
            text-align: center;
            font-size: 30px;
            line-height: 100px;
        }

        > div.active {
            color: #f04449;
            position: relative;
        }

        > div.active:after {
            position: absolute;
            content: '';
            width: 50px;
            height: 4px;
            background: #f04449;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    .team-box {
        height: calc(100% - 102px) !important;
        overflow: scroll;

        .team-box-item {
            padding: 0 40px;
            background: #ffffff;
            margin-bottom: 20px;

            .item-top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 140px;
                font-size: 30px;
                color: #333333;

                .item1-top-info {
                    display: flex;

                    img {
                        width: 80px;
                        height: 80px;
                    }

                    > div {
                        margin-left: 40px;
                    }

                    .time {
                        font-size: 24px;
                        color: #999999;
                    }
                }
            }

            .item-bottom {
                border-top: 1px solid #f2f2f2;
                display: flex;
                justify-content: space-between;

                > div {
                    font-size: 30px;
                    line-height: 60px;
                }
            }
        }
        .nodata{
            font-size: 30px;
            text-align: center;
            line-height: 60px;
        }
    }
</style>