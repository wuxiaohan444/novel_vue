<template>
    <div id="channel">
        <div class="headInfo">
            <img src="../../assets/images/back2.png" alt="" class="back" @click="back">
            <div class="title">频道管理</div>
        </div>
        <div class="channel-title">点击删除以下频道</div>
        <div class="channel-box">
            <div class="nodata" v-if="deleteList.length===0">暂时没有数据</div>
            <div class="label-item" v-for="(item,index) in deleteList" :key="index" @click="deleteChannel(index)">
                {{item}}
            </div>
        </div>
        <div class="channel-title">点击添加以下频道</div>
        <div class="channel-box">
            <div class="nodata" v-if="addList.length===0">暂时没有数据</div>
            <div class="label-item" v-for="(item,index) in addList" :key="index" @click="addChannel(index)">
                {{item}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "channel",
        data() {
            return {
                deleteList: [],
                addList: ['国际', '游戏', '旅游'],
            }
        },
        created() {
            this.getData()
        },
        methods: {
            back() {
                this.$router.go(-1);//返回上一层
            },
            getData() {
                this.$axios('get', '/index.php?m=&c=Index&a=ajaxArticleType', {}, (res) => {
                    this.deleteList = res.data.type;
                    this.addList = res.data.diff
                });
            },
            deleteChannel(index) {
                this.$axios('post', '/index.php?m=&c=Index&a=setUserArticleType', {
                    name: this.deleteList[index],
                    act: 2
                }, (res) => {
                    // let deleteData = this.deleteList.splice(index, 1);
                    // this.addList.push(deleteData[0]);
                    this.getData()
                });

            },
            addChannel(index) {
                this.$axios('post', '/index.php?m=&c=Index&a=setUserArticleType', {
                    name: this.addList[index],
                    act: 1
                }, (res) => {
                    // let deleteData = this.addList.splice(index, 1);
                    // this.deleteList.push(deleteData[0])
                    this.getData()
                });
            },

        }
    }
</script>

<style scoped lang="less">
    #channel {
        padding-top: 110px;

        .headInfo {
            height: 110px;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9;
            background: #DF1B09;
            box-sizing: border-box;
            padding: 0 40px;
            display: flex;
            align-items: center;

            .back {
                width: 23px;
                height: 40px;
            }

            .title {
                position: absolute;
                left: 50%;
                top: 50%;
                font-size: 36px;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                transform: translateX(-50%) translateY(-50%);
            }
        }

        .channel-title {
            font-size: 30px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            padding: 40px;
        }

        .channel-box {
            display: flex;
            flex-wrap: wrap;
            padding: 0 40px;

            .nodata {
                font-size: 30px;
                font-weight: 400;
                color: #333333;
                text-align: center;
            }

            .label-item {
                font-size: 34px;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                line-height: 71px;
                text-align: center;
                width: 153px;
                height: 71px;
                border: 1px solid rgba(153, 153, 153, 1);
                border-radius: 4px;
                margin: 0 19px 20px 0;
                box-sizing: border-box;
            }

            .label-item:nth-child(4n+4) {
                margin-right: 0;
            }

            .label-item.active {
                background: linear-gradient(0deg, rgba(235, 47, 84, 1) 0%, rgba(254, 117, 63, 1) 100%);
                color: #FFFFFF;
            }
        }
    }

</style>