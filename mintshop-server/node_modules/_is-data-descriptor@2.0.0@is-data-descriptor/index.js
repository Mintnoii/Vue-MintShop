'use strict';

const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
const isObject = val => {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
};

const isDescriptor = (obj, key) => {
  if (!isObject(obj)) return false;
  let desc = key ? Object.getOwnPropertyDescriptor(obj, key) : obj;
  if (isObject(desc)) {
    let booleans = ['configurable', 'enumerable', 'writable'];
    if (!hasOwn(desc, 'value') || hasOwn(desc, 'get') || hasOwn(desc, 'set')) {
      return false;
    }
    for (let key of Object.keys(desc)) {
      if (booleans.includes(key) && typeof desc[key] !== 'boolean') {
        return false;
      }
      if (!booleans.includes(key) && key !== 'value') {
        return false;
      }
    }
    return true;
  }
  return false;
};

module.exports = isDescriptor;
