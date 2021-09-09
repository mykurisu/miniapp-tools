import definePage from '../../../main/lib/definePage'
import EventBus from '../../../main/lib/eventBus'
import Router from '../../../main/lib/router'

definePage({
    handleEmit() {
        EventBus.emit('test', {
            k: 1,
        })
    },

    handleEnterWeb() {
        Router.navigateTo('/pages/webview/index', {
            url: encodeURIComponent('https://www.baidu.com'),
        })
    },
})
