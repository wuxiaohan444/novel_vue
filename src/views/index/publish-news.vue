<template>
    <div id="publish-news">
        <!--        <headInfo :headInfo="headInfo"></headInfo>-->
        <div class="apply-item">
            <div class="item-right">
                <!--                <textarea placeholder="请输入标题(5-30个字）" v-model="title"></textarea>-->
                <div class="textarea" contenteditable="true" placeholder="请输入标题(5-30个字)" ref='textarea'
                     @input="divInput" v-html="inputTitle"></div>
            </div>
            <span class="beyond" v-if="title.length>30">标题字数不能超过30个字</span>
        </div>
        <div class="edit-box">
            <quill-editor
                    v-model="editorHtml"
                    ref="myQuillEditor"
                    :options="editorOption">
            </quill-editor>
            <div class="handle-button">
                <img src="../../assets/images/revocation.png" alt="" class="revocation" @click="revocation">
                <img src="../../assets/images/backtrack.png" alt="" class="backtrack" @click="backtrack">
            </div>
        </div>
        <div class="issue-button" @click="publishNews">发布</div>
        <modal :modal-option="modalOption" v-show="modalShow" ref="modalBox"></modal>
        <div class="modal" v-show="chooseModalShow">
            <div class="modal_box">
                <h5 class="title">请选择分类</h5>
                <div class="content text">
                    <select name="public-choice" v-model="type" class="public-choice">
                        <option>请选择分类</option>
                        <option v-for="(item,index) in typeList" :key="index">{{item}}</option>
                    </select>
                </div>
                <div class="btn">
                    <div @click="chooseModalShow=false">取消</div>
                    <div @click="affirm">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import modal from '../../components/msg'
    import quillConfig from '../../utils/quill-config.js'

    export default {
        name: "publish-news",
        components: {modal},
        metaInfo: {
            title: '编辑文章',
        },
        data() {
            return {
                editorHtml: '',
                modalShow: false,
                modalOption: {},
                inputTitle: '',
                title: '',
                id: '',
                editorOption: quillConfig,
                submitText: '',
                copyText: '',
                chooseModalShow: false,
                typeList: [],
                type: '请选择分类',
                UndoList: [''],
            }
        },
        created() {
            this.id = this.$route.query.id;
            if (this.id) {
                this.getNews(this.id);
                this.submitText = '编辑文章'
            } else {
                this.submitText = '发布文章'
            }
            this.$axios('get', '/index.php?m=&c=Index&a=ajaxArticleType', {}, (res) => {
                let deleteList = res.data.diff;
                let addList = res.data.type;
                this.typeList = deleteList.concat(addList);
            });
        },
        // watch: {
        //     editorHtml(val, oldVal) {
        //         this.UndoList.push(val);
        //         let arr = [];
        //         for (let i = 0; i < this.UndoList.length; i++) {
        //             if (arr.indexOf(this.UndoList[i]) == -1) {
        //                 arr.push(this.UndoList[i])
        //             }
        //         }
        //         this.UndoList = arr;
        //         console.log(arr);
        //     }
        // },
        mounted() {

        },
        methods: {
            divInput() {
                this.title = this.$refs.textarea.innerText;
            },
            publishNews() {
                this.chooseModalShow = true;
            },
            allot() {
                this.modalShow = true;
                this.modalOption = {
                    text: '1.禁止发布黄色、暴力等违法信息，否则除名；2.不发布虚假广告，给消费者承诺“假一罚十”'
                };
                this.$refs.modalBox.confirm().then(() => {
                    this.modalShow = false;
                    let data = {
                        title: this.title,
                        content: this.editorHtml,
                        is_original: 1,
                        id: this.id,
                        type: this.type
                    };
                    this.$axios('post', '/index.php?m=&c=Index&a=setArticle', data, (res) => {
                        this.bus.$emit('tips', {
                            show: true,
                            title: res.msg
                        });
                        setTimeout(() => {
                            this.$router.go(-1);
                        }, 1000)
                    })
                }).catch(() => {
                    this.modalShow = false;
                })
            },
            getNews(id) {
                this.$axios('get', '/index.php?m=&c=Index&a=detailArticle', {id: id}, (res) => {
                    let data = res.data.article;
                    this.editorHtml = data.content;
                    this.type = data.type;
                    this.title = data.title;
                    this.inputTitle = data.title;
                    this.$nextTick(() => {
                        let quill = this.$refs.myQuillEditor.quill;
                        quill.setSelection(this.editorHtml.length, 0)
                    })
                })
            },
            revocation() {
                this.copyText = this.editorHtml;
                this.editorHtml = '';
                this.$nextTick(() => {
                    let quill = this.$refs.myQuillEditor.quill;
                    quill.setSelection(this.editorHtml.length, 0)
                })
            },
            backtrack() {
                this.editorHtml = this.copyText;
                this.$nextTick(() => {
                    let quill = this.$refs.myQuillEditor.quill;
                    quill.setSelection(this.editorHtml.length, 0)
                })
            },
            affirm() {
                this.chooseModalShow = false;
                setTimeout(() => {
                    this.allot();
                }, 200)

            },
        }
    }
</script>

<style scoped lang="less">
    #publish-news {
        /*padding-top: 100px;*/

        .issue-button {
            background: rgba(237, 237, 237, 1);
            font-size: 36px;
            color: #666666;
        }

        .edit-box {
            position: relative;

            .handle-button {
                position: absolute;
                width: 120px;
                padding-left: 30px;
                display: flex;
                justify-content: space-between;
                top: 24px;
                right: 40px;
                border-left: 1px solid #ECECEC;

                .revocation, .backtrack {
                    width: 32px;
                    height: 32px;
                }
            }
        }

        .modal {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 999;

            .modal_box {
                width: 70%;
                min-height: 300px;
                background: white;
                border-radius: 15px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                color: #333333;

                h5 {
                    text-align: center;
                    line-height: 60px;
                    font-size: 36px;
                }

                .content {
                    font-size: 30px;
                    padding: 30px;

                    .public-choice {
                        width: 100%;
                        text-indent: 40px;
                        background: #FFFFFF;
                    }
                }

                .btn {
                    width: 100%;
                    display: flex;
                    position: fixed;
                    bottom: 5px;

                    > div {
                        flex: 1;
                        text-align: center;
                        height: 80px;
                        line-height: 80px;
                        border-top: 1px solid #cccccc;
                    }

                    > div:nth-child(2) {
                        border-left: 1px solid #cccccc;
                        color: #44C189;
                    }
                }
            }
        }
    }

    .quill-editor {
        padding-bottom: 70px;
    }

    .apply-item {
        padding: 20px;

        .beyond {
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(223, 27, 10, 1);
        }

        .item-right {
            width: 100%;

            textarea {
                width: 100%;
                resize: none;
                border: none;
                outline: none;
                font-size: 48px;
                color: rgba(153, 153, 153, 1);
            }

            textarea::-webkit-input-placeholder {
                font-size: 48px;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(153, 153, 153, 1);
            }

            .textarea {
                width: 100%;
                min-height: 100px;
                max-height: 300px;
                _height: 120px;
                margin-left: auto;
                margin-right: auto;
                outline: 0;
                font-size: 48px;
                word-wrap: break-word;
                overflow-x: hidden;
                overflow-y: auto;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(153, 153, 153, 1);
                line-height: 100px;
            }

            .textarea:empty:before {
                content: attr(placeholder); /* element attribute*/
                /*content: 'this is content';*/
                font-size: 48px;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(153, 153, 153, 1);
                line-height: 100px;
            }

            /*!*焦点时内容为空*!*/
            /*.textarea:focus:before {*/
            /*    content: none;*/
            /*}*/
        }
    }

</style>