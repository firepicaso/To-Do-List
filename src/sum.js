const { toNumber } = require("lodash");

function stringLength(string) {
    string = string.replace(/\s/g, "");
    if (string.length < 1) {
        throw new Error('string needs to have at least 1 character');
    }
    else if (string.length > 10) {
        throw new Error('string needs to have less than 10 character');
    }
    return string.length;
}

function reverseString(string) {
    return string.split('').reverse().join('');
}

class calculator {
    divide(a,b) {
        if (b === 0) {
            throw new Error('cannot divide by zero');
        }
        return a / b;
    }
}

module.exports = { stringLength, reverseString, calculator };