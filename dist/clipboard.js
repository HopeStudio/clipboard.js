/*
 Rollup.js v0.0.1
 Sun Dec 04 2016 19:34:19 GMT+0800 (CST)

 https://github.com/yangfch3/clipboard.js

 Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Clipboard = factory());
}(this, (function () { 'use strict';

    function contain(arr, item) {
        return arr.indexOf(item) > -1;
    }

    function isString(input) {
        return typeof input === 'string';
    }

    function isUndefined(input) {
        return input === undefined;
    }

    function isArray(input) {
        return Array.isArray(input);
    }

    function toArray(obj, offset) {
        offset = offset >= 0 ? offset : 0;
        if (Array.from) {
            // Array.from: convert an obj or an array-like obj to an array
            return Array.prototype.slice.call(Array.from(obj), offset);
        }

        return Array.prototype.slice.call(obj, offset);
    }

    function inheritPrototype(subType, superType) {
        function F() {}
        F.prototype = superType.prototype;
        var middleObj = new F();
        middleObj.constructor = subType;
        subType.prototype = middleObj;
    }

    // export function toggleClass(element, toToggleClass) {
    //     if (element.classList) {
    //         element.classList.toggle(toToggleClass);
    //     } else {
    //         let classNames = element.className.split(/\s+/);
    //
    //         let pos = -1,
    //             i,
    //             len = classNames.length;
    //
    //         for (i = 0; i < len; i++ ) {
    //             if (classNames[i] == toToggleClass) {
    //                 pos = i;
    //                 break;
    //             }
    //         }
    //
    //         if (pos == -1) {
    //             classNames.push(toToggleClass);
    //         } else {
    //             classNames.splice(i, 1);
    //         }
    //
    //         element.className = classNames.join(' ');
    //     }
    // }

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

        subscribe: function subscribe(eventNotification, subscriber) {
            if (isUndefined(this.subscribers[eventNotification])) {
                this.subscribers[eventNotification] = [];
            }

            if (isArray(subscriber)) {
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
            if (isArray(this.subscribers[eventNotification])) {
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
            if (isArray(this.subscribers[eventNotification])) {
                var subscriberGroup = this.subscribers[eventNotification];
                if (isArray(subscriber)) {
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

    var fakeInput = document.createElement('input');
    fakeInput.id = 'fakeInput';
    fakeInput.type = 'text';
    fakeInput.value = ' ';
    fakeInput.style.position = 'absolute';
    fakeInput.style.left = '-9999px';
    fakeInput.style.width = '1px';
    fakeInput.style.height = '1px';
    document.body.appendChild(fakeInput);

    // 环境分支示例代码
    // if ("development" === 'production') {
    //     /* eslint-disable no-console */
    //     console.log('production');
    //     /* eslint-enable no-console */
    // } else {
    //     /* eslint-disable no-console */
    //     console.log('not production');
    //     /* eslint-enable no-console */
    // }

    var VERSION = '0.0.1';

    var _clipboardList = [];
    var _triggers = [];

    inheritPrototype(Clipboard, Observer);

    function exec(e) {
        if (contain(_triggers, e.target)) {
            (function () {
                var clipboard = _clipboardList[_triggers.indexOf(e.target)];
                var prop = clipboard.trigger.innerHTML ? 'innerHTML' : 'value';
                var originalText = clipboard.trigger[prop];

                if (clipboard.type === 1) {
                    clipboard.target.select();
                    try {
                        document.execCommand(clipboard.action);
                        clipboard.target.blur();
                        clipboard.notify('success', clipboard);
                        clipboard.trigger[prop] = 'OK!️';
                        clipboard.trigger.disabled = true;
                        setTimeout(function () {
                            clipboard.trigger[prop] = originalText;
                            clipboard.trigger.disabled = false;
                        }, 1500);
                    } catch (e) {
                        clipboard.notify('error', clipboard);
                    }
                } else if (clipboard.type === 2) {
                    var text = clipboard.target.innerHTML;
                    fakeInput.value = text;
                    fakeInput.select();
                    try {
                        document.execCommand(clipboard.action);
                        fakeInput.blur();
                        clipboard.notify('success', clipboard);
                        clipboard.trigger[prop] = 'OK!️';
                        clipboard.trigger.disabled = true;
                        setTimeout(function () {
                            clipboard.trigger[prop] = originalText;
                            clipboard.trigger.disabled = false;
                        }, 1500);
                    } catch (e) {
                        fakeInput.blur();
                        alert('error');
                        clipboard.notify('error', clipboard);
                    }
                }
            })();
        }
    }

    function Clipboard(ele) {
        // 实现继承
        Observer.call(this);

        var trigger = isString(ele) ? document.querySelector(ele) : ele;

        // 按钮已注册过时
        if (trigger.dataset['registered']) {
            return _clipboardList[_triggers.indexOf(trigger)];
        }
        var target = document.querySelector(trigger.dataset['clipboardTarget']);
        var action = void 0,
            type = void 0;

        if (/input|textarea/g.test(target.nodeName.toLowerCase())) {
            action = trigger.dataset['clipboardAction'] === 'cut' ? 'cut' : 'copy';
            type = 1;
        } else {
            action = 'copy';
            type = 2;
        }

        this.trigger = trigger;
        this.target = target;
        this.action = action;
        this.type = type;

        _clipboardList.push(this);
        _triggers.push(trigger);

        trigger.dataset['registered'] = true;

        return this;
    }

    Clipboard.ver = Clipboard.version = VERSION;

    Clipboard.init = function (className) {
        var btns = toArray(document.querySelectorAll('.' + className));

        for (var i = 0, len = btns.length; i < len; i++) {
            /* eslint-disable no-new */
            new Clipboard(btns[i]);
            /* eslint-enable no-new */
        }
        return _clipboardList;
    };

    Clipboard.prototype.destroy = function () {
        var that = this;
        var index = _clipboardList.indexOf(that);

        if (index > -1) {
            _clipboardList.splice(index, 1);
            _triggers.splice(index, 1);
            return true;
        }

        return false;
    };

    window.addEventListener('click', exec, false);

    return Clipboard;

})));
