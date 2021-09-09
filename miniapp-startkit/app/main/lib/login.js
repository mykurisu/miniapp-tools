const miniappLogin = async (needLogin = false) => {
    try {
        if (!needLogin) {
            await wx.checkSession()
            return wx.getStorageSync('__LOGIN_INFO__')
        }
        const { code } = await wx.login()
        const loginInfo = await _loginHandler(code)
        wx.setStorageSync('__LOGIN_INFO__', loginInfo)
        return loginInfo
    } catch (error) {
        return _errorHandler(error)
    }
}

const _errorHandler = ({ errMsg }) => {
    // 登录失效
    if (/checkSession:fail/.test(errMsg)) {
        return miniappLogin(true)
    }
}

const _loginHandler = async (code) => {
    // 后端登录接口请求
    // 通过 code 换取 openId, sessionKey, unionId
    // ......
    return {
        code,
        openid: '',
        sessionKey: '',
        unionId: '',
        // ......
    }
}

export { miniappLogin }
