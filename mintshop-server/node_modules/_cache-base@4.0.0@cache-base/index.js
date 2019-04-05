'use strict';

const typeOf = require('kind-of');
const Emitter = require('@sellside/emitter');
const visit = require('collection-visit');
const hasOwn = require('has-own-deep');
const union = require('union-value');
const del = require('unset-value');
const get = require('get-value');
const set = require('set-value');

/**
 * Create an instance of `CacheBase`.
 *
 * ```js
 * const app = new CacheBase();
 * ```
 * @param {String|Object} `prop` (optional) Property name to use for the cache, or the object to initialize with.
 * @param {Object} `cache` (optional) An object to initialize with.
 * @constructor
 * @api public
 */

class CacheBase extends Emitter {
  constructor(prop, cache) {
    super();

    if (typeof prop !== 'string') {
      cache = prop || cache;
      prop = 'cache';
    }

    Reflect.defineProperty(this, 'prop', { value: prop });
    this[this.prop] = {};

    if (cache) {
      this.set(cache);
    }
  }

  /**
   * Assign `value` to `key`. Also emits `set` with the key and value.
   *
   * ```js
   * app.on('set', function(key, val) {
   *   // do something when `set` is emitted
   * });
   *
   * app.set('admin', true);
   *
   * // also takes an object or an array of objects
   * app.set({ name: 'Brian' });
   * app.set([{ foo: 'bar' }, { baz: 'quux' }]);
   * console.log(app);
   * //=> { name: 'Brian', foo: 'bar', baz: 'quux' }
   * ```
   * @name .set
   * @emits `set` with `key` and `value` as arguments.
   * @param {String|Array} `key` The name of the property to set. Dot-notation may be used to set nested properties.
   * @param {any} `value`
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  set(key, ...rest) {
    if (isObject(key) || (rest.length === 0 && Array.isArray(key))) {
      return this.visit('set', key, ...rest);
    }
    if (Array.isArray(key)) key = key.join('.');
    set(this[this.prop], key, ...rest);
    this.emit('set', key, ...rest);
    return this;
  }

  /**
   * Return the value of `key`.
   *
   * ```js
   * app.set('a.b.c', 'd');
   * app.get('a.b');
   * //=> { c: 'd' }
   * ```
   * @name .get
   * @emits `get` with `key` and `value` as arguments.
   * @param {String|Array} `key` The name of the property to get. Dot-notation may be used to set nested properties.
   * @return {any} Returns the value of `key`
   * @api public
   */

  get(key) {
    if (Array.isArray(key)) key = key.join('.');
    let val = get(this[this.prop], key);

    if (typeof val === 'undefined' && this.defaults) {
      val = get(this.defaults, key);
    }

    this.emit('get', key, val);
    return val;
  }

  /**
   * Create a property on the cache with the given `value` only if it doesn't
   * already exist.
   *
   * ```js
   * console.log(app.cache); //=> {}
   * app.set('one', { foo: 'bar' });
   * app.prime('one', { a: 'b' });
   * app.prime('two', { c: 'd' });
   * console.log(app.cache.one); //=> { foo: 'bar' }
   * console.log(app.cache.two); //=> { c: 'd' }
   * ```
   * @name .prime
   * @param {String} `key` Property name or object path notation.
   * @param {any} `val`
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  prime(key, ...rest) {
    if (isObject(key) || (rest.length === 0 && Array.isArray(key))) {
      return this.visit('prime', key, ...rest);
    }
    if (Array.isArray(key)) key = key.join('.');
    if (!this.has(key)) {
      this.set(key, ...rest);
    }
    return this;
  }

  /**
   * Set a default value to be used when `.get()` is called and the value is not defined
   * on the cache. Returns a value from the defaults when only a key is passed.
   *
   * ```js
   * app.set('foo', 'xxx');
   * app.default('foo', 'one');
   * app.default('bar', 'two');
   * app.default('baz', 'three');
   * app.set('baz', 'zzz');
   *
   * console.log(app.get('foo'));
   * //=> 'xxx'
   *
   * console.log(app.get('bar'));
   * //=> 'two'
   *
   * console.log(app.get('baz'));
   * //=> 'zzz'
   *
   * console.log(app);
   * // CacheBase {
   * //   cache: { foo: 'xxx', bar: 'two', baz: 'zzz' },
   * //   defaults: { foo: 'one', bar: 'two', baz: 'three' } }
   * ```
   * @name .default
   * @param {String|Array} `key` The name of the property to set. Dot-notation may be used to set nested properties.
   * @param {any} `value` (optional) The value to set on the defaults object.
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  default(key, ...rest) {
    this.defaults = this.defaults || {};

    if (isObject(key) || (rest.length === 0 && Array.isArray(key))) {
      return this.visit('default', key, ...rest);
    }

    if (Array.isArray(key)) key = key.join('.');
    if (!isString(key)) {
      throw new TypeError('expected "key" to be a string, object or array');
    }

    if (rest.length === 0) {
      return get(this.defaults, key);
    }

    set(this.defaults, key, ...rest);
    this.emit('default', key, rest);
    return this;
  }

  /**
   * Set an array of unique values on cache `key`.
   *
   * ```js
   * app.union('a.b.c', 'foo');
   * app.union('a.b.c', 'bar');
   * app.union('a.b.c', ['bar', 'baz']);
   * console.log(app.get('a'));
   * //=> { b: { c: ['foo', 'bar', 'baz'] } }
   * ```
   * @name .union
   * @param {String|Array} `key` The name of the property to union. Dot-notation may be used to set nested properties.
   * @param {any} `value`
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  union(key, ...rest) {
    if (Array.isArray(key)) key = key.join('.');
    union(this[this.prop], key, ...rest);
    this.emit('union', ...rest);
    return this;
  }

  /**
   * Return true if the value of property `key` is not `undefined`.
   *
   * ```js
   * app.set('foo', true);
   * app.set('baz', null);
   * app.set('bar', undefined);
   *
   * app.has('foo'); //=> true
   * app.has('bar'); //=> true
   * app.has('baz'); //=> false
   * ```
   * @name .has
   * @param {String|Array} `key` The name of the property to check. Dot-notation may be used to set nested properties.
   * @return {Boolean}
   * @api public
   */

  has(key) {
    if (Array.isArray(key)) key = key.join('.');
    return typeof get(this[this.prop], key) !== 'undefined';
  }

  /**
   * Returns true if the specified property is an own (not inherited) property.
   * Similar to [.has()](#has), but returns true if the key exists, even if the
   * value is `undefined`.
   *
   * ```js
   * app.set('a.b.c', 'd');
   * app.set('x', false);
   * app.set('y', null);
   * app.set('z', undefined);
   *
   * app.hasOwn('a');      //=> true
   * app.hasOwn('b');      //=> true
   * app.hasOwn('c');      //=> true
   * app.hasOwn('a.b.c');  //=> true
   * app.hasOwn('x');      //=> true
   * app.hasOwn('y');      //=> true
   * app.hasOwn('z');      //=> true
   * app.hasOwn('lslsls'); //=> false
   * ```
   * @name .hasOwn
   * @param  {String} `key`
   * @return {Boolean} Returns true if object `key` exists. Dot-notation may be used to set nested properties.
   * @api public
   */

  hasOwn(key) {
    if (Array.isArray(key)) key = key.join('.');
    return hasOwn(this[this.prop], key);
  }

  /**
   * Delete one or more properties from the instance.
   *
   * ```js
   * // setup a listener to update a property with a default
   * // value when it's deleted by the user
   * app.on('del', key => app.set(key, app.default(key)));
   *
   * app.del(); // delete all properties on the cache
   * // or
   * app.del('foo');
   * // or an array of keys
   * app.del(['foo', 'bar']);
   * ```
   * @name .del
   * @emits `del` with the `key` as the only argument.
   * @param {string} `key` The name of the property to delete. Dot-notation may be used to delete nested properties. This method does not accept key as an array.
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  del(key) {
    if (!key) return this.clear();
    del(this[this.prop], key);
    this.emit('del', key);
    return this;
  }

  /**
   * Reset the entire cache to an empty object. Note that this does not also clear the `defaults`
   * object, since you can manually do `cache.defaults = {}` if you want to reset that object as well.
   *
   * ```js
   * // clear "defaults" whenever the cache is cleared
   * app.on('clear', key => (app.defaults = {}));
   * app.clear();
   * ```
   * @name .clear
   * @api public
   */

  clear() {
    this[this.prop] = {};
    this.emit('clear');
    return this;
  }

  /**
   * Visit (or map visit) the specified method (`key`) over the properties in the
   * given object or array.
   *
   * @name .visit
   * @param {String|Array} `key` The name of the method to visit.
   * @param {Object|Array} `val` The object or array to iterate over.
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  visit(key, ...rest) {
    visit(this, key, ...rest);
    return this;
  }

  /**
   * Gets an array of names of all enumerable properties on the cache.
   *
   * ```js
   * const app = new CacheBase();
   * app.set('user', true);
   * app.set('admin', false);
   *
   * console.log(app.keys);
   * //=> ['user', 'admin']
   * ```
   * @name .keys
   * @api public
   */

  get keys() {
    return Object.keys(this[this.prop]);
  }

  /**
   * Gets the length of [keys](#keys).
   *
   * ```js
   * const app = new CacheBase();
   * app.set('user', true);
   * app.set('admin', false);
   *
   * console.log(app.size);
   * //=> 2
   * ```
   * @name .size
   * @api public
   */

  get size() {
    return this.keys.length;
  }
}

/**
 * Returns true if `value` is a non-empty string.
 */

function isString(value) {
  return typeof value === 'string' && value !== '';
}

/**
 * Returns true if `value` is an object
 */

function isObject(value) {
  return typeOf(value) === 'object';
}

/**
 * Expose `CacheBase`
 */

module.exports = CacheBase;
