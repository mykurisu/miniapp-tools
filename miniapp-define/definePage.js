const defaultPage = {
    onLoad(options) {
        const $$define = {
            // some global data
        };
        if (options) {
            $$define.query = options;
            if ($$define.query.url) {
                $$define.query.url = decodeURIComponent($$define.query.url);
            }
        }
        $$define.route = getCurrentPages()[0].route;
        this.setData({ $$define });
        // do some report
    },
    onShow() {
        // ...
    },
    onHide() {
        // ...
    },
}

const definePage = function (page) {
    const _page = Object.assign({}, page);
    _page.data = _page.data ? Object.assign(_page.data, defaultPage.data) : defaultPage.data;
    _page.onLoad = function (options) {
        defaultPage.onLoad.call(this, options);
        if (page.onLoad) {
            page.onLoad.call(this, options);
        }
    };
    // ...some common options

    return Page(_page);
}

export default definePage;
