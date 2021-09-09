const defaultPage = {
    data: {},
    onLoad(options) {
        const $$define = {
            // globalData
        }
        if (options) {
            $$define.query = options
            if ($$define.query.url) {
                $$define.query.url = decodeURIComponent($$define.query.url)
            }
        }
        const pageStack = getCurrentPages()
        $$define.route = pageStack[pageStack.length - 1].route
        this.setData({ $$define })
        // Report
    },
}

const definePage = function (page) {
    const _page = Object.assign({}, page)
    _page.data = Object.assign(_page.data ? _page.data : {}, defaultPage.data)
    _page.onLoad = function (options) {
        defaultPage.onLoad.call(this, options)
        if (page.onLoad) {
            page.onLoad.call(this, options)
        }
    }
    // ...commonOptions

    return Page(_page)
}

export default definePage
