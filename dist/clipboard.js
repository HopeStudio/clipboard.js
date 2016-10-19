/*
 Rollup.js v0.0.1
 Thu Oct 20 2016 01:57:21 GMT+0800 (CST)

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

  {
      /* eslint-disable no-console */
      console.log('production');
      /* eslint-enable no-console */
  }

  var VERSION = '0.0.1';

  var _clipboardList = [];
  var _triggers = [];

  var fakeInput = document.createElement('input');
  fakeInput.id = 'fakeInput';
  fakeInput.type = 'text';
  fakeInput.value = ' ';
  fakeInput.style.position = 'absolute';
  fakeInput.style.left = '-9999px';
  fakeInput.style.width = '1px';
  fakeInput.style.height = '1px';
  document.body.appendChild(fakeInput);

  function exec(e) {
      if (contain(_triggers, e.target)) {
          var clipboard = _clipboardList[_triggers.indexOf(e.target)];
          if (clipboard.type === 1) {
              clipboard.target.select();
              document.execCommand(clipboard.action);
              clipboard.target.blur();
          } else if (clipboard.type === 2) {
              var text = clipboard.target.innerText;
              fakeInput.value = text;
              fakeInput.select();
              document.execCommand(clipboard.action);
              fakeInput.blur();
          }
      }
  }

  function Clipboard(ele) {
      var trigger = isString(ele) ? document.querySelector(ele) : ele;
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

  // [TODO] on 复制成功或失败采取的操作

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
