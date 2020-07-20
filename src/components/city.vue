<template>
    <div id="city" v-show="cityShow" @click="closeModal">
        <div :class="cityShow?'city-box hide':'city-box'" @click.stop>
            <div class="tool">
                <div class="close" @click="closeModal"></div>
            </div>
            <h5>选择城市</h5>
            <div class="city-ul">
                <ul class="left">
                    <li v-for="(item,index) in data" @click="choose(index)" :class="{active:count===index}"
                        :key="index">
                        <span class="font fa fa-address-book"></span><span class="info">{{item.name}}</span>
                    </li>
                </ul>
                <ul class="right">
                    <li v-for="(item,index) in city" :key="index" :class="{active:cityIndex===index}"
                        @click="chooseCityId(item.id,item.name,index)">{{item.name}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import data from '../utils/data'

    export default {
        name: "city",
        data() {
            return {
                count: 0,
                cityIndex: '',
                city: "",
                district: "",
                data: '',
            }
        },
        props: ['cityShow'],
        created() {
            this.data = data.getCity();
            this.city = this.data[0].city;
        },
        methods: {
            choose(index) {
                this.count = index;
                this.city = this.data[index].city;
                this.cityIndex = ''
            },

            chooseCityId(id, name, index) {
                this.cityIndex = index;
                this.$emit('chooseCityId', {id: id, name: name});
                this.closeModal();
            },

            closeModal() {
                this.$emit('closeModal', false)
            }
        }
    }
</script>

<style scoped lang="less">
    #city {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .3);

        .city-box {
            width: 100%;
            height: 0;
            background: #ffffff;
            position: fixed;
            bottom: 0;
            left: 0;

            h5 {
                text-align: center;
                line-height: 100px;
                font-size: 30px;
            }

            .city-ul {
                height: 100%;
                display: flex;

                .left {
                    width: 260px;
                    margin-left: 40px;
                    overflow: scroll;
                }

                .right {
                    margin-left: 40px;
                    width: 260px;
                    overflow: scroll;
                }

                li {
                    line-height: 100px;
                    font-size: 28px;
                }

                li.active {
                    color: #3d9970;
                }
            }

            .tool {
                display: flex;
                justify-content: space-between;
                height: 120px;
                align-items: center;
                position: absolute;
                right: 40px;

                .close {
                    width: 40px;
                    height: 40px;
                    background: url("../assets/images/close.png");
                    background-size: 100% 100%;
                }
            }
        }

        .city-box.hide {
            animation: tall 0.3s forwards;
        }

        @keyframes tall {
            0% {
                height: 0px;
            }
            100% {
                height: 60%;
            }
        }
    }
</style>