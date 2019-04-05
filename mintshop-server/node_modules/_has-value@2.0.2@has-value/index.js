/*!
 * has-value <https://github.com/jonschlinkert/has-value>
 *
 * Copyright (c) 2014-2018, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const get = require('get-value');
const has = require('has-values');

module.exports = function(obj, path, options) {
  if (isObject(obj) && (typeof path === 'string' || Array.isArray(path))) {
    return has(get(obj, path, options));
  }
  return false;
};

function isObject(val) {
  return val != null && (typeof val === 'object' || typeof val === 'function' || Array.isArray(val));
}
