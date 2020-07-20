import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index/news.vue'
import publishNews from '../views/index/publish-news.vue'
import channel from '../views/index/channel.vue'
import newsContent from '../views/index/news-content'
import newsList from '../views/my/news-list'
import my from '../views/my/my'
import advDetails from '../views/my/adv-details'
import share from '../views/my/share'
import publishMissionApply from '../views/my/publish-mission-apply'
import shareNews from '../views/my/shareNews'
import collectList from '../views/my/collect-list'
import mission from '../views/mission/mission'
import missionIndex from '../views/mission/missionIndex'
import advertising from '../views/mission/advertising'
import distribution from '../views/distribution/distribution'
import team from '../views/distribution/team'
import deposit from '../views/distribution/deposit'
import withdraw from '../views/distribution/withdraw'
import commission from '../views/distribution/commission'
import up from '../views/up/up'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/publishNews',
        name: 'publishNews',
        component: publishNews
    }, {
        path: '/newsContent',
        name: 'newsContent',
        component: newsContent
    }, {
        path: '/my',
        name: 'my',
        component: my
    }, {
        path:'/advDetails',
        name:'advDetails',
        component:advDetails
    },{
        path: '/collectList',
        name: 'collectList',
        component: collectList
    }, {
        path:'/share',
        name:'share',
        component:share
    },
    {
        path: '/mission',
        name: 'mission',
        component: mission
    }, {
        path: '/publishMissionApply',
        name: 'publishMissionApply',
        component: publishMissionApply
    }, {
        path: '/missionIndex',
        name: 'missionIndex',
        component: missionIndex
    }, {
        path: '/advertising',
        name: 'advertising',
        component: advertising
    }, {
        path: '/newsList',
        name: 'newsList',
        component: newsList
    }, {
        path: '/distribution',
        name: 'distribution',
        component: distribution
    }, {
        path: '/team',
        name: 'team',
        component: team
    }, {
        path: '/deposit',
        name: 'deposit',
        component: deposit
    }, {
        path: '/commission',
        name: 'commission',
        component: commission
    }, {
        path: '/up',
        name: 'up',
        component: up
    },{
        path:'/withdraw',
        name:'withdraw',
        component:withdraw
    },{
        path:'/shareNews',
        name:'shareNews',
        component:shareNews
    },{
        path:'/channel',
        name:'channel',
        component:channel
    }
]

const router = new VueRouter({
    // mode: 'history',
    base: '/dist',
    routes
});

export default router
