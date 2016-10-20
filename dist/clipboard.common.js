/*
 Rollup.js v0.0.1
 Thu Oct 20 2016 16:27:22 GMT+0800 (CST)

 https://github.com/yangfch3/clipboard.js

 Released under the MIT License.
 */
'use strict';

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

function inheritPrototype(subType, superType) {
    function F() {}
    F.prototype = superType.prototype;
    var middleObj = new F();
    middleObj.constructor = subType;
    subType.prototype = middleObj;
}

function Publisher() {
    this.subscribers = {};
}

Publisher.prototype = {
    constructor: Publisher,

    subscribe: function subscribe(notification, subscriber) {
        if (isUndefined(this.subscribers[notification])) {
            this.subscribers[notification] = [];
        }

        if (isArray(subscriber)) {
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
        if (isArray(this.subscribers[notification])) {
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
        if (isArray(this.subscribers[notification])) {
            var subscriberGroup = this.subscribers[notification];
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

    cacel: function cacel(notification, subscriber) {
        return this.unsubscribe(notification, subscriber);
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

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

// 环境分支示例代码
// if ("production" === 'production') {
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

inheritPrototype(Clipboard, Publisher);

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
                    clipboard.trigger[prop] = '✔️';
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
                    clipboard.trigger[prop] = '✔️';
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
    Publisher.call(this);

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
    var btns = [].concat(toConsumableArray(document.querySelectorAll('.' + className)));

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

module.exports = Clipboard;
