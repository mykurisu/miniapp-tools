import definePage from '../../lib/definePage'
import Router from '../../lib/router'

definePage({
    onLoad() {
        console.log(this.data.$$define)
        const eKey = this._common.events.on('test', (content) => {
            console.log(content)
            console.log(this._common.events)
        })
        console.log(eKey)
    },

    onShow() {
        console.log(this.data)
    },

    handleBtnClick() {
        const { $$define } = this.data
        const url = encodeURIComponent($$define.route)
        Router.navigateTo('/pages/projectA/index/index', { url })
    },
})
