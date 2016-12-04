export function contain (arr, item) {
    return arr.indexOf(item) > -1;
}

export function isString(input) {
    return typeof input === 'string';
}

export function isUndefined(input) {
    return input === undefined;
}

export function isArray(input) {
    return Array.isArray(input);
}

export function isObject(input) {
    if (input === null) {
        return false;
    } else if (typeof input === 'function' || typeof input === 'object') {
        return true;
    }
    return undefined;
}

export function toArray(obj, offset) {
    offset = offset >= 0 ? offset : 0;
    if (Array.from) {
        // Array.from: convert an obj or an array-like obj to an array
        return Array.prototype.slice.call(Array.from(obj), offset);
    }

    return Array.prototype.slice.call(obj, offset);
}


export function inheritPrototype(subType, superType) {
    function F() {}
    F.prototype = superType.prototype;
    let middleObj = new F();
    middleObj.constructor = subType;
    subType.prototype = middleObj;
}

function hyphenate(str) {
    if (!isString(str)) {
        return false;
    }
    const REGEXP_HYPHENATE = /([a-z\d])([A-Z])/g;
    str = str.replace(REGEXP_HYPHENATE, '$1-$2').toLowerCase();
    return str;
}


export function getData(element, name) {
    if (element.dataset) {
        return name ? element.dataset[name] : element.dataset;
    } else {
        let temp = {};
        for (let i = 0, len = element.attributes.length; i < len; i += 1) {
            if (element.attributes[i].nodeName.indexOf('data-') > -1) {
                temp[element.attributes[i].nodeName.slice(5)] = element.attributes[i].nodeValue;
            }
        }
        return name ? temp[hyphenate(name)] : temp;
    }
}

export function setData(element, name, data) {
    if (element.dataset) {
        element.dataset[name] = data;
    } else {
        element.setAttribute('data-' + hyphenate(name), data);
    }
}
