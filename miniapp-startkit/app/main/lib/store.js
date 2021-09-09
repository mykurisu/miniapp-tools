class Store {
    constructor() {
        this.store = {}
    }

    set(key, value, options = {}) {
        if (!key) {
            return
        }

        this.store[key] = {
            value
        }

        if (options.ttl) {
            const expiredTime = Date.now() + (options.ttl * 1000)
            this.store[key].expiredTime = expiredTime
        }

        if (options.isLocal) {
            wx.setStorage({
                key: storeKeyCreator(key),
                data: this.store[key]
            })
        }
    }

    get(key) {
        if (!key) return null

        const content = this.store[key] || wx.getStorageSync(storeKeyCreator(key)) || undefined
        if (!content) return null

        if (content.expiredTime && Date.now >= content.expiredTime) {
            this.delete(key)
            return null
        }

        return content.value
    }

    delete(key) {
        if (!key) return null
        delete this.store[key]
        wx.removeStorage({
            key: storeKeyCreator(key),
        })
    }
}

function storeKeyCreator(key) {
    return `__STORE__${key}`
}

const store = new Store()

export default store
