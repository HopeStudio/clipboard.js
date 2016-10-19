'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.contain = contain;
exports.isString = isString;
function contain(arr, item) {
    return arr.indexOf(item) > -1;
}

function isString(input) {
    return typeof input === 'string';
}