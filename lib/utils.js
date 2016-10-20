'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.contain = contain;
exports.isString = isString;
exports.isUndefined = isUndefined;
exports.isArray = isArray;
exports.inheritPrototype = inheritPrototype;
exports.toggleClass = toggleClass;
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

function toggleClass(element, toToggleClass) {
    if (element.classList) {
        element.classList.toggle(toToggleClass);
    } else {
        var classNames = element.className.split(/\s+/);

        var pos = -1,
            i = void 0,
            len = classNames.length;

        for (i = 0; i < len; i++) {
            if (classNames[i] == toToggleClass) {
                pos = i;
                break;
            }
        }

        if (pos == -1) {
            classNames.push(toToggleClass);
        } else {
            classNames.splice(i, 1);
        }

        element.className = classNames.join(' ');
    }
}