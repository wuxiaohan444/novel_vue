<template>
    <div id="publish-news-apply">
        <headInfo :headInfo="headInfo"></headInfo>
        <div class="apply-item">
            <span class="label">身份证正面：</span>
            <div class="item-right"><img :src="front" alt=""><input type="file" @change="frontUp($event)"></div>
        </div>

        <div class="apply-item">
            <span class="label">身份证反面：</span>
            <div class="item-right"><img :src="back" alt=""><input type="file" @change="backUp($event)"></div>
        </div>

        <div class="hint">协议</div>
        <div :class="chooseStatus?'warring choose':'warring'" @click="chooseWarring">
            <p>1.不发布违法、黄色、暴力、等违法信息。</p>
            <p>2.不发布虚假广告，给消费者承诺“假一罚十”</p>
        </div>
        <div class="issue-button" @click="submitIssue">提交申请</div>
    </div>
</template>

<script>
    import headInfo from '../../components/headInfo'
    export default {
        name: "publish-news-apply",
        metaInfo: {
            title:'上传信息',
        },
        components: {headInfo},
        data() {
            return {
                front: require("../../assets/images/idCard.png"),
                back: require("../../assets/images/idCard2.png"),
                front1: '',
                back1: '',
                chooseStatus: false,
                type: '',
                headInfo: {
                    title: '上传信息',
                    isReturn:true
                }
            }
        },
        methods: {
            frontUp(e) {
                this.type = 1;
                this.uploading(e)
            },
            backUp(e) {
                this.type = 2;
                this.uploading(e)
            },
            // 上传图片
            uploading(e) {
                let file = e.target.files[0];
                let formData = new FormData();
                formData.append('file', file);
                this.$axios('post', '/index.php?m=&c=Index&a=upload', formData, (res) => {
                    if (this.type === 1) {
                        this.front = this.fixedIp() + res.data.url;
                        this.front1 = res.data.url;
                    } else if (this.type === 2) {
                        this.back = this.fixedIp() + res.data.url;
                        this.back1 = res.data.url;
                    }

                }, 'multipart/form-data', false,false)
            },
            chooseWarring() {
                this.chooseStatus = !this.chooseStatus
            },
            submitIssue() {
                let data = {
                    front: this.front1,
                    back: this.back1
                };
                if (this.chooseStatus) {
                    this.$axios('post', '/index.php?m=&c=Index&a=setIdCard', data, (res) => {
                        this.bus.$emit('tips', {
                            show: true,
                            title: res.msg
                        });
                        setTimeout(() => {
                            this.$router.go(-1);
                        }, 1000)
                    })
                } else {
                    alert('请同意协议')
                }
            }
        }
    }
</script>

<style scoped lang="less">
    #publish-news-apply {
        padding: 100px 40px 0 40px;
        box-sizing: border-box;
        .apply-item {
            display: flex;
            line-height: 50px;
            padding: 20px 0;

            .label {
                font-size: 24px;
                width: 200px;
            }

            .item-right {
                position: relative;

                img {
                    width: 300px;
                    height: 192px;
                }

                input[type='file'] {
                    width: 300px;
                    height: 192px;
                    position: absolute;
                    left: 0;
                    opacity: 0;
                }
            }

        }

        .hint {
            font-weight: 800;
            font-size: 30px;
            line-height: 80px;
        }

        .warring {
            font-size: 26px;
            position: relative;
            text-indent: 50px;
            height: 50px;
            line-height: 50px;
        }

        .warring:before {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            content: '';
            width: 40px;
            height: 40px;
            background: url("../../assets/images/weixuanzhong.png");
            background-size: 100% 100%;
        }

        .warring.choose:before {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            content: '';
            width: 40px;
            height: 40px;
            background: url("../../assets/images/xuanzhong.png");
            background-size: 100% 100%;
        }
    }
</style>