function EventBus() {
    this.events = {};
}

EventBus.prototype.on = function(key, cb) {
    if (!this.events[key]) {
        this.events[key] = [];
    }
    this.events[key].push(cb);
}

EventBus.prototype.emit = function(key) {
    let args = [].slice.call(arguments);
    args.splice(0, 1);
    this.events[key].forEach((item) => {
        item.apply(this, args);
    })
}

export default EventBus;
