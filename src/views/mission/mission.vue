<template>
    <div id="publish-news-apply">
        <headInfo :headInfo="headInfo"></headInfo>
        <div class="apply-item">
            <span class="label">广告图片：</span>
            <div class="item-right"><img :src="img" alt=""><input type="file" @change="changeImg($event)"></div>
        </div>
        <div class="apply-item">
            <span class="label">广告标题：</span>
            <div class="item-right"><input type="text" placeholder="请输入广告标题" v-model="title"></div>
        </div>

        <div class="apply-item">
            <span class="label">广告链接：</span>
            <div class="item-right"><input type="text" placeholder="请输入广告链接" v-model="url"></div>
        </div>
        <div class="apply-item">
            <span class="label">广告分类：</span>
            <div class="item-right">
                <select name="public-choice" v-model="type" class="public-choice">
                    <option>请选择分类</option>
                    <option v-for="(item,index) in typeList" :key="index">{{item}}</option>
                </select>
            </div>
        </div>
        <div class="apply-item">
            <span class="label">广告类型：</span>
            <div class="item-right radio">
                <div :class="chooseIndex==0?'radio-item choose':'radio-item'" @click="choosType(0)">非本地</div>
                <div :class="chooseIndex==1?'radio-item choose':'radio-item'" @click="choosType(1)">本地</div>
            </div>
        </div>
        <div class="apply-item" v-show="chooseIndex==1">
            <span class="label">投放城市：</span>
            <div class="item-right"><input type="text" placeholder="请选择城市" readonly @click="chooseCity()"
                                           v-model="cityName"></div>
        </div>

        <!--        <div class="apply-item">-->
        <!--            <span class="label">投放状态：</span>-->
        <!--            <div class="item-right radio">-->
        <!--                <div :class="status==0?'radio-item choose':'radio-item'" @click="choosePut(0)">未投放</div>-->
        <!--                <div :class="status==1?'radio-item choose':'radio-item'" @click="choosePut(1)">投放</div>-->
        <!--            </div>-->
        <!--        </div>-->

        <!--        <div class="apply-item">-->
        <!--            <span class="label">是否收费：</span>-->
        <!--            <div class="item-right radio">-->
        <!--                <div :class="is_charge==0?'radio-item choose':'radio-item'" @click="chooseFree(0)">免费</div>-->
        <!--                <div :class="is_charge==1?'radio-item choose':'radio-item'" @click="chooseFree(1)">收费</div>-->
        <!--            </div>-->
        <!--        </div>-->

        <div class="apply-item">
            <span class="label">每次收费金额：</span>
            <div class="item-right"><input type="text" placeholder="最小金额不能少于0.05" v-model="money" @input="count()"
                                           @blur="detection()" :disabled="disable">
            </div>
        </div>

        <div class="apply-item">
            <span class="label">投放最大次数：</span>
            <div class="item-right"><input type="text" placeholder="请输入投放最大次数" :disabled="disable"
                                           v-model="push_max_num" @input="count()">
            </div>
        </div>

        <div class="apply-item">
            <span class="label">总金额：</span>
            <div class="item-right money">{{charge}}</div>
        </div>

        <div class="issue-button" @click="submitIssue">发布广告</div>
        <city :cityShow="cityShow" v-on:closeModal="closeModal" v-on:chooseCityId="chooseCityId"></city>
    </div>
</template>

<script>
    import city from '../../components/city'
    import headInfo from '../../components/headInfo'

    export default {
        name: "publish-news-apply",
        metaInfo: {
            title: '编辑广告',
        },
        components: {city, headInfo},
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
                type: '请选择分类',
                headInfo: {
                    title: '编辑广告',
                    isReturn: true
                },
                disable: false,
                typeList: []
            }
        },
        created() {
            this.$axios('get', '/index.php?m=&c=Index&a=ajaxArticleType', {}, (res) => {
                let deleteList = res.data.diff;
                let addList = res.data.type;
                this.typeList = deleteList.concat(addList);
            });
            this.id = this.$route.query.id;
            if (this.id) {
                this.getMission(this.id);
                this.disable = true
            }
        },
        methods: {
            changeImg(e) {
                let file = e.target.files[0];
                let formData = new FormData();
                formData.append('file', file);
                this.$axios('post', '/index.php?m=&c=Index&a=upload', formData, (res) => {
                    this.img = this.fixedIp() + res.data.url;
                    this.pic = res.data.url;
                }, 'multipart/form-data', false, false)
            },
            submitIssue() {
                if (this.type == '请选择分类') {
                    alert('请选择广告分类');
                    return false
                }
                if (this.charge == 0) {
                    alert('请设置金额和投放次数');
                    return false
                }
                let data = {
                    id: this.id,
                    title: this.title,
                    url: this.url,
                    pic: this.pic,
                    charge: this.charge,
                    push_max_num: this.push_max_num,
                    locale: this.cityName,
                    type: this.type
                };

                this.$axios('post', '/index.php?m=&c=Index&a=setAdvert', data, (res) => {
                    this.bus.$emit('tips', {
                        show: true,
                        title: res.msg
                    });
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 1000)
                });

            },
            choosType(index) {
                this.chooseIndex = index;
                if (this.chooseIndex == 0) {
                    this.cityName = '';
                }
            },
            choosePut(index) {
                this.status = index
            },
            chooseFree(index) {
                this.is_charge = index;
            },
            count() {
                if (this.money >= 0.05) {
                    this.charge = this.floatMul(this.money, this.push_max_num)
                }

            },
            detection() {
                if (this.money < 0.05 && this.money !== '') {
                    alert("输入金额必须大于0.05");
                    this.money = '';
                    this.charge = 0;
                }
            },
            chooseCity() {
                this.cityShow = true
            },
            chooseCityId(city) {
                this.cityName = city.name;
            },
            closeModal(city) {
                this.cityShow = city
            },
            getMission(id) {
                this.$axios('get', '/index.php?m=&c=Index&a=detailAdvert', {id: id}, (res) => {
                    let data = res.data;
                    this.title = data.title;
                    this.url = data.url;
                    this.img = this.fixedIp() + data.pic;
                    this.pic = data.pic;
                    this.charge = data.charge;
                    this.type = data.type;
                    this.push_max_num = data.push_max_num;
                    this.money = this.floatDiv(this.charge, this.push_max_num);
                    if (data.locale) {
                        this.cityName = data.locale;
                        this.chooseIndex = 1;
                    } else {
                        this.cityName = '';
                        this.chooseIndex = 0;
                    }
                })
            },
            // 乘法
            floatMul(arg1, arg2) {
                var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
                try {
                    m += s1.split(".")[1].length
                } catch (e) {
                }
                try {
                    m += s2.split(".")[1].length
                } catch (e) {
                }
                return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
            },
            // 除法
            floatDiv(arg1, arg2) {
                var t1 = 0, t2 = 0, r1, r2;
                try {
                    t1 = arg1.toString().split(".")[1].length
                } catch (e) {
                }
                try {
                    t2 = arg2.toString().split(".")[1].length
                } catch (e) {
                }

                r1 = Number(arg1.toString().replace(".", ""));
                r2 = Number(arg2.toString().replace(".", ""));
                return (r1 / r2) * Math.pow(10, t2 - t1);
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

                select {
                    width: 300px;
                    height: 70px;
                    background: #FFFFFF;
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