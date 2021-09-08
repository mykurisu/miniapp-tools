import definePage from '../../main/lib/definePage'

definePage({
    onLoad() {
        wx.showLoading({
            title: '加载中...',
        })
    },

    handleLoad() {
        wx.hideLoading()
    },

    handleError() {
        wx.hideLoading()
        wx.showToast({
            title: '页面加载失败',
            icon: 'error',
            duration: 2000,
        })
    },
})
