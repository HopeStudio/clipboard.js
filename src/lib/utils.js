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
