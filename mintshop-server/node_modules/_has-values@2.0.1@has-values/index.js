/*!
 * has-values <https://github.com/jonschlinkert/has-values>
 *
 * Copyright (c) 2014-2018, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const typeOf = require('kind-of');

module.exports = function has(val) {
  switch (typeOf(val)) {
    case 'boolean':
    case 'date':
    case 'function':
    case 'null':
    case 'number':
      return true;
    case 'undefined':
      return false;
    case 'regexp':
      return val.source !== '(?:)' && val.source !== '';
    case 'buffer':
      return val.toString() !== '';
    case 'error':
      return val.message !== '';
    case 'string':
    case 'arguments':
      return val.length !== 0;
    case 'file':
    case 'map':
    case 'set':
      return val.size !== 0;
    case 'array':
    case 'object':
      for (const key of Object.keys(val)) {
        if (has(val[key])) {
          return true;
        }
      }
      return false;

    // everything else
    default: {
      return true;
    }
  }
};
