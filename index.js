'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./lib/utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

if (process.env.NODE_ENV === 'production') {
    /* eslint-disable no-console */
    console.log('production');
    /* eslint-enable no-console */
} else {
    /* eslint-disable no-console */
    console.log('not production');
    /* eslint-enable no-console */
}

var VERSION = '<@VERSION@>';

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
    if ((0, _utils.contain)(_triggers, e.target)) {
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
    var trigger = (0, _utils.isString)(ele) ? document.querySelector(ele) : ele;
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
    var btns = [].concat(_toConsumableArray(document.querySelectorAll('.' + className)));

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

exports.default = Clipboard;
module.exports = exports['default'];