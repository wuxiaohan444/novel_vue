<template>
    <div id="publish-news-apply">
        <headInfo :headInfo="headInfo"></headInfo>
        <div class="apply-item">
            <span class="label">广告图片：</span>
            <div class="item-right"><img :src="img" alt=""><input type="file" disabled></div>
        </div>
        <div class="apply-item">
            <span class="label">广告标题：</span>
            <div class="item-right"><input type="text" placeholder="请输入广告标题" v-model="title" readonly></div>
        </div>

        <div class="apply-item">
            <span class="label">广告链接：</span>
            <div class="item-right"><input type="text" placeholder="请输入广告链接" v-model="url" readonly></div>
        </div>
    </div>
</template>

<script>
    import headInfo from '../../components/headInfo'

    export default {
        name: "publish-news-apply",
        metaInfo: {
            title: '广告详情',
        },
        components: {headInfo},
        data() {
            return {
                img: require("../../assets/images/up.png"),
                chooseIndex: 0,//城市
                money: '',//用户输入金额
                cityShow: false,
                cityName: '',//城市名称
                title: '',//广告标题
                pic: '',//广告封面
                url: '',//链接
                is_charge: 0,//是否收费
                charge: 0,//费用
                push_max_num: '',//最大投递次数
                locale: '',//投递城市
                status: 0,//投递状态
                id: '',
                payDate: '',
                headInfo: {
                    title: '广告详情',
                    isReturn: true
                }
            }
        },
        created() {
            this.id = this.$route.query.id;
            this.getMission(this.id);
        },
        methods: {
            getMission(id) {
                this.$axios('get', '/index.php?m=&c=Index&a=detailAdvert', {id: id}, (res) => {
                    let data = res.data;
                    this.title = data.title;
                    this.url = data.url;
                    this.img = this.fixedIp() + data.pic;
                    if (data.locale) {
                        this.cityName = data.locale;
                        this.chooseIndex = 1;
                    } else {
                        this.cityName = '';
                        this.chooseIndex = 0;
                    }
                })
            },

        }
    }
</script>

<style scoped lang="less">
    #publish-news-apply {
        padding: 100px 40px;

        .apply-item {
            display: flex;
            line-height: 50px;
            padding: 20px 0;

            .label {
                font-size: 24px;
                width: 170px;
                line-height: 70px;
            }

            .item-right {
                position: relative;

                img {
                    width: 300px;
                }

                input[type='file'] {
                    width: 300px;
                    height: 180px;
                    position: absolute;
                    left: 0;
                    opacity: 0;
                }

                input[type='text'] {
                    border-bottom: 1px solid #f2f2f2;
                    height: 70px;
                    width: 480px;
                }


            }

            .radio {
                display: flex;
                font-size: 24px;
                align-items: center;

                .radio-item {
                    margin-right: 40px;
                    position: relative;
                    text-indent: 40px;
                }

                .radio-item:before {
                    content: '';
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background: url("../../assets/images/danxuankong.png");
                    background-size: 100% 100%;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }

                .radio-item.choose:before {
                    content: '';
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background: url("../../assets/images/danxuankuang-copy.png");
                    background-size: 100% 100%;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }

            .money {
                font-size: 28px;
                line-height: 70px;
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