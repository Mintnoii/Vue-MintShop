'use strict';

function mixinDeep(target, ...rest) {
  for (let obj of rest) {
    if (isObject(obj)) {
      for (let key in obj) {
        if (key !== '__proto__') {
          mixin(target, obj[key], key);
        }
      }
    }
  }
  return target;
}

function mixin(target, val, key) {
  let obj = target[key];
  if (isObject(val) && isObject(obj)) {
    mixinDeep(obj, val);
  } else {
    target[key] = val;
  }
}

function isObject(val) {
  return typeof val === 'function' || (typeof val === 'object' && val !== null && !Array.isArray(val));
}

/**
 * Expose mixinDeep
 * @type {Function}
 */

module.exports = mixinDeep;
