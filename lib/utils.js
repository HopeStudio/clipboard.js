'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.contain = contain;
exports.isString = isString;
exports.isUndefined = isUndefined;
exports.isArray = isArray;
exports.isObject = isObject;
exports.toArray = toArray;
exports.inheritPrototype = inheritPrototype;
exports.getData = getData;
exports.setData = setData;
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

function isObject(input) {
    if (input === null) {
        return false;
    } else if (typeof input === 'function' || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object') {
        return true;
    }
    return undefined;
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

function hyphenate(str) {
    if (!isString(str)) {
        return false;
    }
    var REGEXP_HYPHENATE = /([a-z\d])([A-Z])/g;
    str = str.replace(REGEXP_HYPHENATE, '$1-$2').toLowerCase();
    return str;
}

function getData(element, name) {
    if (name) {
        if (element.dataset) {
            return element.dataset[name];
        }
        return element.getAttribute(name);
    }
    if (element.dataset) {
        return element.dataset;
    }
    var temp = {};
    for (var i = 0, len = element.attributes.length; i < len; i += 1) {
        if (element.attributes[i].nodeName.indexOf('data-') > -1) {
            temp[element.attributes[i].nodeName.slice(5)] = element.attributes[i].nodeValue;
        }
    }
    return temp;
}

function setData(element, name, data) {
    if (isObject(data)) {
        for (var prop in data) {
            if (Object.prototype.hasOwnProperty.call(data, prop)) {
                element.dataset[prop] = data[prop];
            }
        }
    } else if (element.dataset) {
        element.dataset[name] = data;
    } else {
        element.setAttribute('data-' + hyphenate(name), data);
    }
}