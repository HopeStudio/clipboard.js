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

export function toggleClass(element, toToggleClass) {
    if (element.classList) {
        element.classList.toggle(toToggleClass);
    } else {
        let classNames = element.className.split(/\s+/);

        let pos = -1,
            i,
            len = classNames.length;

        for (i = 0; i < len; i++ ) {
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
