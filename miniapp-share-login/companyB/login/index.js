const app = getApp()
Page({
    data: {
        // companyA中的登录H5页面
        webviewUrl: '../../companyA/index.html',
    },

    onLoad() {
        wx.showLoading({
            title: '加载中'
        });        
    },

    handleMessage(e) {
        if (e.detail.data) {
            const loginData = JSON.parse(e.detail.data[0]).data;
            app.globalData.events.emit('LOGIN_DATA', loginData);
        }      
    }
});
