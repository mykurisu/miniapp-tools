class Request {
    constructor(props) {
        this.baseURL = props.baseURL || '';
        this.requestTask = null;
    }

    request(url, data = {}, options) {
        return new Promise((resolve, reject) => {
            let requestOptions = {};
            if (options) {
                requestOptions = Object.assign(requestOptions, options);
            }
            this.requestTask = wx.request({
                url: this.baseURL ? `${this.baseURL}/${url}` : url,
                data,
                method: 'POST',
                ...requestOptions,
                success: (result) => {
                    resolve(result);
                },
                fail: (res) => {
                    reject({
                        url,
                        data,
                        errorInof: res,
                    })
                },
                complete: () => {
                    // 通用上报逻辑
                },
            })
        })
    }
}

const BASE_URL = 'https://base.xxx.com';

const BASE_CF_URL = 'https://cloud-function.xxx.com';

// 纯净请求
const rawRequest = (...args) => {
    const r = new Request();
    return r.request(...args);
}

// 通用业务请求
const defaultRequest = (...args) => {
    const r = new Request({ baseURL: BASE_URL })
    return r.request(...args);
}

// 页面配置请求
const configRequest = (someKey, data = {}) => {
    const r = new Request({ baseURL: `${BASE_URL}/config-api` });
    return r.request('getConfigBySomeKey', { someKey, ...data });
}

// 云函数请求
const cfRequest = (cfKey, data = {}) => {
    const r = new Request({ baseURL: BASE_CF_URL });
    return r.request(cfKey, { ...data });
}

export {
    rawRequest,
    defaultRequest,
    configRequest,
    cfRequest,
};

/**
* 测试----------------------
*/
configRequest('a');

defaultRequest('default-api', { a: 1 }, {
    header: {
        'haha': '1'
    }
})
