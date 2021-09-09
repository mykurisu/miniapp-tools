import definePage from '../../lib/definePage'
import { miniappLogin } from '../../lib/login'
import Router from '../../lib/router'
import { HOME_PAGE } from '../../constants/index'

definePage({
    onLoad() {
        wx.showLoading({
            title: '加载中...',
        })
        this.handleLogin()
    },
    async handleLogin() {
        await miniappLogin(true)
        const { redirectKey = '' } = this.data.$$define.query
        if (!redirectKey) {
            // switchTab不允许拼接参数
            return Router.switchTab(HOME_PAGE)
        }
        // handleRedirect()
    },
    // handleRedirect() {
    //     const { redirectKey } = this.data.$$define.query
    //     // 处理重定向逻辑...
    // },
})
