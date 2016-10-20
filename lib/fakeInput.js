'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var fakeInput = document.createElement('input');
fakeInput.id = 'fakeInput';
fakeInput.type = 'text';
fakeInput.value = ' ';
fakeInput.style.position = 'absolute';
fakeInput.style.left = '-9999px';
fakeInput.style.width = '1px';
fakeInput.style.height = '1px';
document.body.appendChild(fakeInput);

exports.default = fakeInput;
module.exports = exports['default'];