<template>
    <div class="comment-modal" v-show="modalData.modalShow" @click="closeModal">
        <div :class="modalData.modalShow?'comment-text hide':'comment-text'" @click.stop>
            <div class="tool">
                <div class="close" @click="closeModal"></div>
                <button :class="submitStatus?'active':''" @click="submitComent">提交</button>
            </div>
            <textarea v-model="text" placeholder="请输入评论" v-on:input="change"></textarea>
        </div>
    </div>
</template>

<script>
    export default {
        name: "comment",
        props: ['modalData'],
        data() {
            return {
                submitStatus: false,
                text: '',
                commentRefresh: false
            }
        },
        methods: {
            closeModal() {
                this.$emit("closeModal", {closeModal: false, refresh: this.commentRefresh})
            },
            // 提交
            submitComent() {
                this.$axios('post', '/index.php?m=&c=Index&a=articleCommentAdd', {
                    id: this.modalData.id,
                    content: this.text
                }, (res) => {
                    this.bus.$emit('tips', {
                        show: true,
                        title: res.msg
                    });
                    this.commentRefresh = true;
                    setTimeout(() => {
                        this.closeModal();
                        this.text = ''
                    }, 1000)
                });
            },
            change() {
                if (this.text !== '') {
                    this.submitStatus = true
                } else {
                    this.submitStatus = false
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .comment-modal {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.3);
        z-index: 99;

        .comment-text {
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
            background: #ffffff;
            padding: 20px;
            box-sizing: border-box;
            border-radius: 30px 30px 0 0;

            .tool {
                display: flex;
                justify-content: space-between;
                height: 80px;
                align-items: center;

                .close {
                    width: 40px;
                    height: 40px;
                    background: url("../assets/images/close.png");
                    background-size: 100% 100%;
                }

                button {
                    padding: 10px 15px;
                    background: #f2f2f2;
                }

                button.active {
                    background: #07C160;
                    color: #f2f2f2;
                }
            }

            textarea {
                width: 100%;
                height: 500px;
                border: none;
                outline: none;
                resize: none;
                font-size: 26px;
                color: #333333;
            }
        }

        .comment-text.hide {
            animation: tall 0.3s forwards;
        }

        @keyframes tall {
            0% {
                height: 0px;
            }
            100% {
                height: 70%;
            }
        }
    }
</style>