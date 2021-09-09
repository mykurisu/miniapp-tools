import definePage from '../../lib/definePage'
import Router from '../../lib/router'
import EventBus from '../../lib/eventBus'
import Store from '../../lib/store'

definePage({
    onLoad() {
        console.log(this.data.$$define)
        const eKey = EventBus.on('test', (content) => {
            console.log(content)
            console.log(EventBus)
        })
        console.log(eKey)
        Store.set('HOME_DATA', { a: 1 }, { ttl: 600, isLocal: true })
    },

    onShow() {
        console.log(Store.get('HOME_DATA'))
    },

    handleBtnClick() {
        const { $$define } = this.data
        const url = encodeURIComponent($$define.route)
        Router.navigateTo('/pages/projectA/index/index', { url })
    },
})
