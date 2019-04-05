/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const util = require('util');
const isNumber = require('is-number');
const toRegex = require('to-regex-range');

/**
 * Return a range of numbers or letters.
 *
 * @param  {String} `start` Start of the range
 * @param  {String} `stop` End of the range
 * @param  {String} `step` Increment or decrement to use.
 * @param  {Function} `options`
 * @return {Array}
 */

function fillRange(start, stop, step, options) {
  if (start === void 0) {
    return [];
  }

  if (stop === void 0 || start === stop) {
    // special case, for handling negative zero
    let isString = typeof start === 'string';
    if (isNumber(start) && !toNumber(start)) {
      return [isString ? '0' : 0];
    }
    return [start];
  }

  if (typeof step !== 'number' && typeof step !== 'string') {
    options = step;
    step = undefined;
  }

  if (typeof options === 'function') {
    options = { transform: options };
  }

  const opts = Object.assign({ step }, options);
  if (opts.step && !isValidNumber(opts.step)) {
    if (opts.strictRanges === true) {
      throw new TypeError('expected options.step to be a number');
    }
    return [];
  }

  opts.isNumber = isValidNumber(start) && isValidNumber(stop);
  if (!opts.isNumber && !isValid(start, stop)) {
    if (opts.strictRanges === true) {
      throw new RangeError('invalid range arguments: ' + util.inspect([start, stop]));
    }
    return [];
  }

  opts.isPadded = isPadded(start) || isPadded(stop);
  opts.toString =
    opts.stringify ||
    typeof opts.step === 'string' ||
    typeof start === 'string' ||
    typeof stop === 'string' ||
    !opts.isNumber;

  if (opts.isPadded) {
    opts.maxLength = Math.max(String(start).length, String(stop).length);
  }

  // support legacy minimatch/fill-range options
  if (typeof opts.optimize === 'boolean') opts.toRegex = opts.optimize;
  if (typeof opts.makeRe === 'boolean') opts.toRegex = opts.makeRe;
  return expand(start, stop, opts);
}

function expand(start, stop, options) {
  let a = options.isNumber ? toNumber(start) : start.charCodeAt(0);
  let b = options.isNumber ? toNumber(stop) : stop.charCodeAt(0);

  let step = Math.abs(toNumber(options.step)) || 1;
  if (options.toRegex && step === 1) {
    return toRange(a, b, start, stop, options);
  }

  let zero = { greater: [], lesser: [] };
  let asc = a < b;
  let arr = new Array(Math.round((asc ? b - a : a - b) / step));
  let idx = 0;

  if (!asc && options.strictOrder) {
    if (options.strictRanges === true) {
      throw new RangeError('invalid range arguments: ' + util.inspect([start, stop]));
    }
    return [];
  }

  while (asc ? a <= b : a >= b) {
    let val = options.isNumber ? a : String.fromCharCode(a);
    if (options.toRegex && (val >= 0 || !options.isNumber)) {
      zero.greater.push(val);
    } else {
      zero.lesser.push(Math.abs(val));
    }

    if (options.isPadded) {
      val = zeros(val, options);
    }

    if (options.toString) {
      val = String(val);
    }

    if (typeof options.transform === 'function') {
      arr[idx++] = options.transform(val, a, b, step, idx, arr, options);
    } else {
      arr[idx++] = val;
    }

    if (asc) {
      a += step;
    } else {
      a -= step;
    }

    if (options.limit > 0 && arr.length >= options.limit) {
      break;
    }
  }

  if (options.toRegex === true) {
    return toSequence(arr, zero, options);
  }
  return arr;
}

function toRange(a, b, start, stop, options) {
  if (options.isPadded) {
    return toRegex(start, stop, options);
  }

  if (options.isNumber) {
    return toRegex(Math.min(a, b), Math.max(a, b), options);
  }

  start = String.fromCharCode(Math.min(a, b));
  stop = String.fromCharCode(Math.max(a, b));
  return `[${start}-${stop}]`;
}

function toSequence(arr, zeros, options) {
  let greater = '';
  let lesser = '';

  if (zeros.greater.length) {
    greater = zeros.greater.join('|');
  }

  if (zeros.lesser.length) {
    lesser = `-(${zeros.lesser.join('|')})`;
  }

  let res = greater && lesser ? `${greater}|${lesser}` : greater || lesser;
  if (options.capture) {
    return `(${res})`;
  }
  return res;
}

function zeros(val, options) {
  if (options.isPadded) {
    let str = String(val);
    let len = str.length;
    let dash = '';
    if (str.charAt(0) === '-') {
      dash = '-';
      str = str.slice(1);
    }
    let diff = options.maxLength - len;
    let pad = '0'.repeat(diff);
    val = dash + pad + str;
  }
  if (options.stringify) {
    return String(val);
  }
  return val;
}

function toNumber(val) {
  return Number(val) || 0;
}

function isPadded(str) {
  return /^-?0\d/.test(str);
}

function isValid(min, max) {
  return (isValidNumber(min) || isValidLetter(min))
    && (isValidNumber(max) || isValidLetter(max));
}

function isValidLetter(ch) {
  return typeof ch === 'string' && ch.length === 1 && /^\w+$/.test(ch);
}

function isValidNumber(n) {
  return isNumber(n) && !/\./.test(n);
}

/**
 * Expose `fillRange`
 * @type {Function}
 */

module.exports = fillRange;
