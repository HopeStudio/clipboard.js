import { isUndefined, isArray } from './utils';

function Observer(obj) {
    // 作用域安全的构造函数
    if (this instanceof Observer) {
        if (!isUndefined(obj)) {
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

    subscribe: function(eventNotification, subscriber) {
        if (isUndefined(this.subscribers[eventNotification])) {
            this.subscribers[eventNotification] = [];
        }

        if (isArray(subscriber)) {
            for (let i = 0, len = subscriber.length; i < len; i++) {
                this.subscribers[eventNotification].push(subscriber[i]);
            }
            return;
        }
        this.subscribers[eventNotification].push(subscriber);
        return this;
    },

    on: function(eventNotification, subscriber) {
        return this.subscribe(eventNotification, subscriber);
    },

    notify: function(eventNotification, e) {
        if(isArray(this.subscribers[eventNotification])) {
            let subscriberGroup = this.subscribers[eventNotification];
            for(let i = 0, len = subscriberGroup.length; i < len; i++) {
                subscriberGroup[i](e, eventNotification);
            }
        }
        return this;
    },

    dispatch: function(eventNotification, e) {
        return this.notify(eventNotification, e);
    },

    unsubscribe: function(eventNotification, subscriber) {
        if(isArray(this.subscribers[eventNotification])) {
            let subscriberGroup = this.subscribers[eventNotification];
            if (isArray(subscriber)) {
                for(let i = 0, len = subscriberGroup.length; i < len; i++) {
                    for (let j = 0, len = subscriber.length; j < len; j++) {
                        if(subscriberGroup[i] === subscriber[j]) {
                            subscriberGroup.splice(i, 1);
                        }
                    }
                }
            } else {
                for(let k = 0, len = subscriberGroup.length; k < len; k++) {
                    if(subscriberGroup[k] === subscriber) {
                        subscriberGroup.splice(k, 1);
                    }
                }
            }

        }

        return this;
    },

    cacel: function(eventNotification, subscriber) {
        return this.unsubscribe(eventNotification, subscriber);
    }
};

export default Observer;
