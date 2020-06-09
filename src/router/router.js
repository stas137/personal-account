import Vue from 'vue'
import Router from 'vue-router'

import vLogin from '../components/v-login'
import vPersonalAccount from '../components/v-personal-account'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'login',
            component: vLogin
        },
        {
            path: '/personal_account',
            name: 'personal_account',
            component: vPersonalAccount,
            props: true
        },
    ]


})

export default router;