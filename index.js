'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./lib/utils');

var _observer = require('./lib/observer');

var _observer2 = _interopRequireDefault(_observer);

var _fakeInput = require('./lib/fakeInput');

var _fakeInput2 = _interopRequireDefault(_fakeInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VERSION = '<@VERSION@>';

var _clipboardList = [];
var _triggers = [];

(0, _utils.inheritPrototype)(Clipboard, _observer2.default);

function exec(e) {
    if ((0, _utils.contain)(_triggers, e.target)) {
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
                _fakeInput2.default.value = text;
                _fakeInput2.default.select();
                try {
                    document.execCommand(clipboard.action);
                    _fakeInput2.default.blur();
                    clipboard.notify('success', clipboard);
                    clipboard.trigger[prop] = 'OK!️';
                    clipboard.trigger.disabled = true;
                    setTimeout(function () {
                        clipboard.trigger[prop] = originalText;
                        clipboard.trigger.disabled = false;
                    }, 1500);
                } catch (e) {
                    _fakeInput2.default.blur();
                    alert('error');
                    clipboard.notify('error', clipboard);
                }
            }
        })();
    }
}

function Clipboard(ele) {
    // 实现继承
    _observer2.default.call(this);

    var trigger = (0, _utils.isString)(ele) ? document.querySelector(ele) : ele;

    // 按钮已注册过时
    if ((0, _utils.getData)(trigger, 'registered')) {
        return _clipboardList[_triggers.indexOf(trigger)];
    }
    var target = document.querySelector((0, _utils.getData)(trigger, 'clipboard-target'));
    var action = void 0,
        type = void 0;

    if (/input|textarea/g.test(target.nodeName.toLowerCase())) {
        action = (0, _utils.getData)(trigger, 'clipboard-action') === 'cut' ? 'cut' : 'copy';
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

    (0, _utils.setData)(trigger, 'registered', 'true');

    return this;
}

Clipboard.ver = Clipboard.version = VERSION;

Clipboard.init = function (className) {
    var btns = (0, _utils.toArray)(document.querySelectorAll('.' + className));

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

exports.default = Clipboard;
module.exports = exports['default'];