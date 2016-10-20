import { isUndefined, isArray } from './utils';

function Publisher() {
    this.subscribers = {};
}

Publisher.prototype = {
    constructor: Publisher,

    subscribe: function(notification, subscriber) {
        if (isUndefined(this.subscribers[notification])) {
            this.subscribers[notification] = [];
        }

        if (isArray(subscriber)) {
            for (let i = 0, len = subscriber.length; i < len; i++) {
                this.subscribers[notification].push(subscriber[i]);
            }
            return;
        }
        this.subscribers[notification].push(subscriber);
        return this;
    },

    on: function(notification, subscriber) {
        return this.subscribe(notification, subscriber);
    },

    notify: function(notification, e) {
        if(isArray(this.subscribers[notification])) {
            let subscriberGroup = this.subscribers[notification];
            for(let i = 0, len = subscriberGroup.length; i < len; i++) {
                subscriberGroup[i](e, notification);
            }
        }
        return this;
    },

    dispatch: function(notification, e) {
        return this.notify(notification, e);
    },

    unsubscribe: function(notification, subscriber) {
        if(isArray(this.subscribers[notification])) {
            let subscriberGroup = this.subscribers[notification];
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

    cacel: function(notification, subscriber) {
        return this.unsubscribe(notification, subscriber);
    }
};

export default Publisher;
