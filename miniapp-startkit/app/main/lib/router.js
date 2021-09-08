class Router {
    constructor(options = {}) {
        this.routes = {}
        this.maxSize = options.maxSize || 10
    }

    router(path, query, options) {
        const { action } = options
        const preloadData =
            typeof options.preloadData === 'function'
                ? options.preloadData()
                : options.preloadData
        const complete = (cb) => {
            console.log('DO SOME REPORT...')
            if (cb) {
                cb()
            }
        }
        const routeID = _randomString(6)
        query.__routeID = routeID
        const url = `${path}?${_QueryObjectToString(query)}`
        this.routes[routeID] = {
            routeID,
            path,
            query,
            preloadData,
            options,
        }
        delete options.action
        delete options.preloadData
        wx[action]({ url, ...options, complete: complete(options.complete) })
    }

    navigateTo(path, query = {}, options = {}) {
        options.action = 'navigateTo'
        const { _pathName, _query } = _navigateFormator(path, query)
        if (getCurrentPages().length >= 10) {
            options.action = 'redirectTo'
        }
        this.router(_pathName, _query, options)
    }

    redirectTo(path, query = {}, options = {}) {
        const { _pathName, _query } = _navigateFormator(path, query)
        this.router(_pathName, _query, { ...options, action: 'redirectTo' })
    }

    navigateBack(delta, options = {}) {
        wx.navigateBack({
            delta,
            ...options,
        })
    }

    reLaunch(path, query = {}, options = {}) {
        const { _pathName, _query } = _navigateFormator(path, query)
        this.router(_pathName, _query, { ...options, action: 'reLaunch' })
    }

    switchTab(path, query = {}, options = {}) {
        const { _pathName, _query } = _navigateFormator(path, query)
        this.router(_pathName, _query, { ...options, action: 'switchTab' })
    }

    getPagePreloadData(routeID) {
        return this.routes[routeID]
            ? this.routes[routeID].preloadData || {}
            : {}
    }
}

const r = new Router()

export default r

function _randomString(n) {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < n; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        )
    }
    return result
}

function _QueryObjectToString(obj) {
    const keys = Object.keys(obj)
    const strArray = keys.map((key) => {
        return `${key}=${obj[key]}`
    })
    return strArray.join('&')
}

function _QueryStringToObject(str) {
    str = str.replace('?', '')
    const result = {}
    str.split('&').forEach((s) => {
        const [key, value] = s.split('=')
        result[key] = value
    })
    return result
}

function _navigateFormator(path, query) {
    const hasSearch = /\?/.test(path)
    let _pathName = path
    let _query = query
    if (hasSearch) {
        const pathArr = path.split('?')
        _pathName = pathArr[0]
        _query = { ...query, ..._QueryStringToObject(pathArr[1]) }
    }
    return { _pathName, _query }
}
