import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/rem'
import VueScroller from 'vue-scroller';
import axios from 'axios'
import qs from 'qs'
import MetaInfo from 'vue-meta-info'

Vue.use(MetaInfo)



Vue.use(VueScroller);

import VueQuillEditor from 'vue-quill-editor'
//引入插件样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.prototype.$qs = qs;
Vue.prototype.bus = new Vue;
const env = "dev";
const link = {
    dev: "http://test08.jiusencms.com",
    prod: "http://qianniu.miaowbuy.com"
}[env];

Vue.prototype.fixedIp = function () {//固定ip
    return link
};

export default function ajax(method, url, data, callback, headers, isQs, isOpen) {
    let openId = {
        openid: localStorage.getItem("openId")
    };
    this.bus.$emit('loading', true);
    let way = method === 'post' || method === 'POST' ? 'data' : 'params';
    isQs = isQs === false ? isQs : true;
    isOpen = isOpen === false ? isOpen : true;
    if (isOpen) {
        data = (method === 'post' || method === 'POST') && isQs ? qs.stringify(Object.assign(openId, data)) : Object.assign(openId, data);
    } else {
        data = data;
    }

    let header = headers ? headers : 'application/x-www-form-urlencoded;charset=UTF-8';
    axios({
        method: method,
        url: link + url,
        [way]: data,
        headers: {
            'Content-Type': header,
            // Authorization: localStorage.getItem("token")
        }
    }).then((res) => {
        this.bus.$emit('loading', false);
        if (res.data.code === 0) {
            callback(res.data);
        } else {
            this.bus.$emit('tips', {
                show: true,
                title: res.data.msg
            });
            setTimeout(() => {
                if (res.data.msg === '请先进行身份验证') {
                    router.replace("/publishMissionApply")
                }
            }, 500)
        }
    })
}

Vue.prototype.$axios = ajax;

Vue.use(VueQuillEditor);

Vue.config.productionTip = false;

Vue.prototype.getQueryVariable = function (variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
