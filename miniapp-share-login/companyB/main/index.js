const app = getApp()
Page({
    data: {
        loginData: null,
    },

    onLoad() {
        wx.showLoading({
            title: '加载中'
        });
        app.globalData.events.on('LOGIN_DATA', (loginData) => {
            this.setData({
                loginData,
            });
        });
        if (!this.data.loginData) {
            wx.navigateTo({
                url: '../login/index',
            })
        }
    },
});
