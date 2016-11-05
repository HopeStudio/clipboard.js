'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils');

function Observer(obj) {
    // 作用域安全的构造函数
    if (this instanceof Observer) {
        if (!(0, _utils.isUndefined)(obj)) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    this[prop] = obj[prop];
                }
            }
        }
        this.subscribers = {};
        return this;
    }
    return new Observer(obj);

    /**
     * subscribers {
         *     eventNotificationA: [subscriber01, subscriber02, ...],
         *     eventNotificationB: [subscriber11, subscriber12, ...],
         *     ...
         * }
     *
     * 一般 eventNotification 为字符串类型，subscriber 订阅者为函数
     */
}

Observer.prototype = {
    constructor: Observer,

    subscribe: function subscribe(eventNotification, subscriber) {
        if ((0, _utils.isUndefined)(this.subscribers[eventNotification])) {
            this.subscribers[eventNotification] = [];
        }

        if ((0, _utils.isArray)(subscriber)) {
            for (var i = 0, len = subscriber.length; i < len; i++) {
                this.subscribers[eventNotification].push(subscriber[i]);
            }
            return;
        }
        this.subscribers[eventNotification].push(subscriber);
        return this;
    },

    on: function on(eventNotification, subscriber) {
        return this.subscribe(eventNotification, subscriber);
    },

    notify: function notify(eventNotification, e) {
        if ((0, _utils.isArray)(this.subscribers[eventNotification])) {
            var subscriberGroup = this.subscribers[eventNotification];
            for (var i = 0, len = subscriberGroup.length; i < len; i++) {
                subscriberGroup[i](e, eventNotification);
            }
        }
        return this;
    },

    dispatch: function dispatch(eventNotification, e) {
        return this.notify(eventNotification, e);
    },

    unsubscribe: function unsubscribe(eventNotification, subscriber) {
        if ((0, _utils.isArray)(this.subscribers[eventNotification])) {
            var subscriberGroup = this.subscribers[eventNotification];
            if ((0, _utils.isArray)(subscriber)) {
                for (var i = 0, len = subscriberGroup.length; i < len; i++) {
                    for (var j = 0, _len = subscriber.length; j < _len; j++) {
                        if (subscriberGroup[i] === subscriber[j]) {
                            subscriberGroup.splice(i, 1);
                        }
                    }
                }
            } else {
                for (var k = 0, _len2 = subscriberGroup.length; k < _len2; k++) {
                    if (subscriberGroup[k] === subscriber) {
                        subscriberGroup.splice(k, 1);
                    }
                }
            }
        }

        return this;
    },

    cacel: function cacel(eventNotification, subscriber) {
        return this.unsubscribe(eventNotification, subscriber);
    }
};

exports.default = Observer;
module.exports = exports['default'];