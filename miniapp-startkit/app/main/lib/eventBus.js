import { randomString } from './utils'

class EventBus {
    constructor() {
        this.events = {}
    }

    on(key, cb, isKeep = true) {
        if (!key) {
            throw new Error('缺少事件key值')
        }

        if (!this.events[key]) {
            this.events[key] = []
        }

        const id = `${key}_${randomString(4)}`

        this.events[key].push({
            id,
            handler: cb,
            isKeep,
        })

        return id
    }

    off(key, cb, id) {
        if (!key || !cb) {
            return
        }

        if (typeof cb === 'string') {
            id = cb
            cb = null
        }

        const index = this.events[key].findIndex((_event) => {
            if (id) {
                return _event.id === id
            }
            return _event.handler === cb
        })

        if (index > -1) {
            this.events[key].splice(index, 1)
            return true
        }

        return false
    }

    emit(key, ...args) {
        if (!key) {
            throw new Error('缺少事件key值')
        }

        const events = this.events[key]

        if (!events) {
            return
        }

        const self = this

        events.forEach((e) => {
            if (e.handler) {
                e.handler.apply(this, args)
                if (!e.isKeep) {
                    self.off(key, e.id)
                }
            }
        })
    }
}

const events = new EventBus()

export default events
