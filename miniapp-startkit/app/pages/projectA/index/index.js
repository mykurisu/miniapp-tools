import definePage from '../../../main/lib/definePage'

definePage({
    handleEmit() {
        this._common.events.emit('test', {
            k: 1,
        })
    },
})
