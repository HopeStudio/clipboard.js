'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils');

function Publisher() {
    this.subscribers = {};
}

Publisher.prototype = {
    constructor: Publisher,

    subscribe: function subscribe(notification, subscriber) {
        if ((0, _utils.isUndefined)(this.subscribers[notification])) {
            this.subscribers[notification] = [];
        }

        if ((0, _utils.isArray)(subscriber)) {
            for (var i = 0, len = subscriber.length; i < len; i++) {
                this.subscribers[notification].push(subscriber[i]);
            }
            return;
        }
        this.subscribers[notification].push(subscriber);
        return this;
    },

    on: function on(notification, subscriber) {
        return this.subscribe(notification, subscriber);
    },

    notify: function notify(notification, e) {
        if ((0, _utils.isArray)(this.subscribers[notification])) {
            var subscriberGroup = this.subscribers[notification];
            for (var i = 0, len = subscriberGroup.length; i < len; i++) {
                subscriberGroup[i](e, notification);
            }
        }
        return this;
    },

    dispatch: function dispatch(notification, e) {
        return this.notify(notification, e);
    },

    unsubscribe: function unsubscribe(notification, subscriber) {
        if ((0, _utils.isArray)(this.subscribers[notification])) {
            var subscriberGroup = this.subscribers[notification];
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

    cacel: function cacel(notification, subscriber) {
        return this.unsubscribe(notification, subscriber);
    }
};

exports.default = Publisher;
module.exports = exports['default'];