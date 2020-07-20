<template>
    <div id="withdraw">
        <headInfo :headInfo="headInfo"></headInfo>
        <div class="withdraw-item">
            <span class="label">提现方式</span>
            <select class="withdraw-item-right" v-model="type">
                <option value="" disabled>选择提现方式</option>
                <option value="0">支付宝</option>
                <option value="1">微信</option>
            </select>
        </div>
        <div class="withdraw-item">
            <span class="label">提现金额</span>
            <input class="withdraw-item-right" type="number" v-model="money" @input="keyUp" placeholder="请输入提现金额，必须为整数">
            <span class="unit">（元）</span>
        </div>
        <div class="withdraw-item">
            <span class="label">用户姓名</span>
            <input class="withdraw-item-right" type="text" v-model="name" placeholder="请输入提现姓名">
        </div>
        <div class="withdraw-item" v-show="type==='1'">
            <span class="label">微信账号</span>
            <input class="withdraw-item-right" type="text" v-model="wx_no" placeholder="请输入微信账号">
        </div>
        <div class="withdraw-item" v-show="type==='0'">
            <span class="label">支付宝账号</span>
            <input class="withdraw-item-right" type="text" v-model="zfb_no" placeholder="请输入支付宝账号">
        </div>
        <div class="issue-button" @click="withdraw">提现</div>
    </div>
</template>

<script>
    import headInfo from '../../components/headInfo'

    export default {
        name: "withdraw",
        components: {headInfo},
        metaInfo: {
            title: '提现',
        },
        data() {
            return {
                headInfo: {
                    title: '提现',
                    isReturn: true,
                },
                money: '',
                type: '',
                name: '',
                wx_no: '',
                zfb_no: ''
            }
        },
        methods: {
            keyUp() {
                if (this.money.length == 1) {
                    this.money = this.money.replace(/[^1-9]/g, '');
                } else {
                    this.money = this.money.replace(/[^\d]/g, "");
                }
            },
            withdraw() {
                if (!this.type) {
                    this.bus.$emit('tips', {
                        show: true,
                        title: '请选择提现方式'
                    });
                } else {
                    let data = {
                        charge: this.money,
                        type: this.type,
                        name: this.name,
                        wx_no: this.wx_no,
                        zfb_no: this.zfb_no
                    };
                    this.$axios('post', '/index.php?m=&c=Cistribution&a=userWithdrawal', data, (res) => {
                        this.bus.$emit('tips', {
                            show: true,
                            title: res.msg
                        });
                        setTimeout(() => {
                            this.$router.go(-1);
                        }, 1000)
                    })
                }
            }
        }
    }
</script>

<style scoped lang="less">
    #withdraw {
        padding-top: 100px;
        box-sizing: border-box;

        .withdraw-item {
            padding-left: 40px;
            height: 100px;
            display: flex;
            align-items: center;

            .label {
                line-height: 70px;
                font-size: 30px;
            }

            .withdraw-item-right {
                width: 430px;
                margin-left: 40px;
                background: #ffffff;
                border-bottom: 1px solid #f2f2f2;
            }

            .unit {
                font-size: 24px;
                color: #999999;
                line-height: 70px;
            }
        }
    }
</style>