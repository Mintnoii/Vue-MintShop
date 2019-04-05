/*!
 * has-own-deep <https://github.com/jonschlinkert/has-own-deep>
 *
 * Copyright (c) 2015-2018, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const hasOwn = Object.prototype.hasOwnProperty;
const isObject = require('isobject');

module.exports = function(target, path) {
  if (!isObject(target) && !Array.isArray(target)) {
    throw new TypeError('expected the first argument to be an object or array');
  }

  if (typeof path !== 'string') {
    throw new TypeError('expected object path to be a string');
  }

  if (hasOwn.call(target, path)) {
    return true;
  }

  let segs = Array.isArray(path) ? path : path.split(/\\?\./);
  let obj = target;

  while ((isObject(obj) || Array.isArray(obj)) && segs.length) {
    if (hasOwn.call(obj, segs[0])) {
      obj = obj[segs.shift()];
      continue;
    }

    let rest = segs.slice();
    let has = false;

    do {
      const prop = rest.join('.');

      if ((has = hasOwn.call(obj, prop))) {
        segs = segs.slice(rest.length);
        obj = obj[prop];
        break;
      }

      rest.pop();
    } while (rest.length);


    if (!has) {
      return false;
    }
  }

  return true;
};
