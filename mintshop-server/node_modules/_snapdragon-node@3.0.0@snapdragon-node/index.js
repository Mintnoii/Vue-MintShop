'use strict';

/**
 * Create a new AST `Node` with the given `type` and `value`, or an
 * object to initialize with.
 *
 * ```js
 * console.log(new Node({ type: 'star', value: '*' }));
 * console.log(new Node('star', '*'));
 * // both result in => Node { type: 'star', value: '*' }
 * ```
 * @name Node
 * @param {object|string} `type` Either an object to initialize with, or a string to be used as the `node.type`.
 * @param {string|boolean} `value` If the first argument is a string, the second argument may be a string value to set on `node.value`.
 * @param {boolean} `clone` When an object is passed as the first argument, pass true as the last argument to deep clone values before assigning them to the new node.
 * @return {Object} node instance
 * @api public
 */

class Node {
  constructor(type, value, clone) {
    define(this, 'isNode', true);
    define(this, 'parent', null);
    define(this, 'size', 0);

    if (isObject(type)) {
      assign(this, type, clone);
    } else {
      this.type = type;
      if (value != null) {
        this.value = value;
      }
    }
  }

  /**
   * Return a clone of the node. Values that are arrays or plain objects
   * are deeply cloned.
   *
   * ```js
   * const node = new Node({type: 'star', value: '*'});
   * consle.log(node.clone() !== node);
   * //=> true
   * ```
   * @name .clone
   * @return {Object} returns a clone of the node
   * @api public
   */

  clone() {
    return new this.constructor(this, null, true);
  }

  /**
   * Return a string created from `node.value` and/or recursively
   * visiting over `node.nodes`.
   *
   * ```js
   * const node = new Node({type: 'star', value: '*'});
   * consle.log(node.stringify());
   * //=> '*'
   * ```
   * @name .stringify
   * @return {String}
   * @api public
   */

  stringify(fn = n => n.value) {
    let str = '';
    visit(this, n => (str += fn(n)));
    return str;
  }

  /**
   * Push a child node onto the `node.nodes` array.
   *
   * ```js
   * const foo = new Node({type: 'foo'});
   * const bar = new Node({type: 'bar'});
   * foo.push(bar);
   * ```
   * @name .push
   * @param {Object} `node`
   * @return {Number} Returns the length of `node.nodes`, like `Array.push`
   * @api public
   */

  push(node) {
    if (!node) return;
    assert(isObject(node), 'expected node to be an object');
    assert(node !== this, 'node should not be the same as node.parent');
    if (!this.constructor.isNode(node)) {
      node = new this.constructor(node);
    }
    this.nodes = this.nodes || [];
    node.parent = this;
    ensureNodes(node);
    this.size++;
    return this.nodes.push(node);
  }

  /**
   * Unshift a child node onto `node.nodes`, and set `node` as
   * the parent on `child.parent`.
   *
   * ```js
   * const foo = new Node({type: 'foo'});
   * const bar = new Node({type: 'bar'});
   * foo.unshift(bar);
   * ```
   * @name .unshift
   * @param {Object} `node`
   * @return {Number} Returns the length of `node.nodes`
   * @api public
   */

  unshift(node) {
    if (!node) return;
    assert(isObject(node), 'expected node to be an object');
    assert(node !== this, 'node should not be the same as node.parent');
    if (!this.constructor.isNode(node)) {
      node = new this.constructor(node);
    }
    this.nodes = this.nodes || [];
    node.parent = this;
    ensureNodes(node);
    this.size++;
    return this.nodes.unshift(node);
  }

  /**
   * Pop a node from `node.nodes`.
   *
   * ```js
   * const node = new Node({type: 'foo'});
   * node.push(new Node({type: 'a'}));
   * node.push(new Node({type: 'b'}));
   * node.push(new Node({type: 'c'}));
   * node.push(new Node({type: 'd'}));
   * console.log(node.nodes.length);
   * //=> 4
   * node.pop();
   * console.log(node.nodes.length);
   * //=> 3
   * ```
   * @name .pop
   * @return {Number} Returns the popped `node`
   * @api public
   */

  pop() {
    if (this.nodes && this.nodes.length) {
      this.size--;
      return this.nodes.pop();
    }
  }

  /**
   * Shift a node from `node.nodes`.
   *
   * ```js
   * const node = new Node({type: 'foo'});
   * node.push(new Node({type: 'a'}));
   * node.push(new Node({type: 'b'}));
   * node.push(new Node({type: 'c'}));
   * node.push(new Node({type: 'd'}));
   * console.log(node.nodes.length);
   * //=> 4
   * node.shift();
   * console.log(node.nodes.length);
   * //=> 3
   * ```
   * @name .shift
   * @return {Object} Returns the shifted `node`
   * @api public
   */

  shift() {
    if (this.nodes && this.nodes.length) {
      this.size--;
      return this.nodes.shift();
    }
  }

  /**
   * Remove `node` from `node.nodes`.
   *
   * ```js
   * node.remove(childNode);
   * ```
   * @name .remove
   * @param {Object} `node`
   * @return {Object} Returns the removed node.
   * @api public
   */

  remove(node) {
    if (!this.nodes) return [];
    assert(this.constructor.isNode(node), 'expected an instance of Node');
    assert(node !== this, 'cannot remove a node from itself');

    const idx = this.nodes.indexOf(node);
    node.index = -1;

    if (idx !== -1) {
      this.size--;
      return this.nodes.splice(idx, 1);
    }
    return [];
  }

  /**
   * Get the first child node from `node.nodes` that matches the given `type`.
   * If `type` is a number, the child node at that index is returned.
   *
   * ```js
   * const child = node.find(1); //<= index of the node to get
   * const child = node.find('foo'); //<= node.type of a child node
   * const child = node.find(/^(foo|bar)$/); //<= regex to match node.type
   * const child = node.find(['foo', 'bar']); //<= array of node.type(s)
   * ```
   * @name .find
   * @param {String} `type`
   * @return {Object} Returns a child node or undefined.
   * @api public
   */

  find(type, n = 0) {
    if (!Array.isArray(this.nodes) || this.nodes.length === 0) return null;
    if (typeof type === 'number') return this.nodes[type];
    for (let i = n; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      if (isType(node, type)) {
        return node;
      }
    }
  }

  visit(fn) {
    return visit(this, fn);
  }

  /**
   * Returns true if `node.nodes` array contains the given `node`.
   *
   * ```js
   * const foo = new Node({type: 'foo'});
   * const bar = new Node({type: 'bar'});
   * cosole.log(foo.has(bar)); // false
   * foo.push(bar);
   * cosole.log(foo.has(bar)); // true
   * ```
   * @name .has
   * @param {String} `type`
   * @return {Boolean}
   * @api public
   */

  has(node) {
    if (this.constructor.isNode(node)) {
      return Array.isArray(this.nodes) && this.nodes.includes(node);
    }
    return this.hasType(node);
  }

  /**
   * Return true if the `node.nodes` has the given `type`.
   *
   * ```js
   * const foo = new Node({type: 'foo'});
   * const bar = new Node({type: 'bar'});
   * foo.push(bar);
   *
   * cosole.log(foo.hasType('qux'));          // false
   * cosole.log(foo.hasType(/^(qux|bar)$/));  // true
   * cosole.log(foo.hasType(['qux', 'bar'])); // true
   * ```
   * @name .hasType
   * @param {String} `type`
   * @return {Boolean}
   * @api public
   */

  hasType(type) {
    return Array.isArray(this.nodes) && this.nodes.find(node => isType(node, type));
  }

  /**
   * Return true if the node is the given `type`.
   *
   * ```js
   * const node = new Node({type: 'bar'});
   * cosole.log(node.isType('foo'));          // false
   * cosole.log(node.isType(/^(foo|bar)$/));  // true
   * cosole.log(node.isType(['foo', 'bar'])); // true
   * ```
   * @name .isType
   * @param {String} `type`
   * @return {Boolean}
   * @api public
   */

  isType(type) {
    return isType(this, type);
  }

  /**
   * Returns true if `node.value` is an empty string, or `node.nodes` does
   * not contain any non-empty text nodes.
   *
   * ```js
   * const node = new Node({type: 'text'});
   * node.isEmpty(); //=> true
   * node.value = 'foo';
   * node.isEmpty(); //=> false
   * ```
   * @name .isEmpty
   * @param {Function} `fn` (optional) Filter function that is called on `node` and/or child nodes. `isEmpty` will return false immediately when the filter function returns false on any nodes.
   * @return {Boolean}
   * @api public
   */

  isEmpty(fn) {
    return isEmpty(this, fn);
  }

  /**
   * Returns true if the node has an ancestor node of the given `type`
   *
   * ```js
   * const box = new Node({type: 'box'});
   * const marble = new Node({type: 'marble'});
   * box.push(marble);
   * marble.isInside('box'); //=> true
   * ```
   * @name .isInside
   * @param {String} `type`
   * @return {Boolean}
   * @api public
   */

  isInside(type) {
    return this.parent && (this.parent.type === type || this.parent.isInside(type));
  }

  /**
   * Get the siblings array, or `null` if it doesn't exist.
   *
   * ```js
   * const foo = new Node({type: 'foo'});
   * const bar = new Node({type: 'bar'});
   * const baz = new Node({type: 'baz'});
   * foo.push(bar);
   * foo.push(baz);
   *
   * console.log(bar.siblings.length) // 2
   * console.log(baz.siblings.length) // 2
   * ```
   * @getter
   * @name .siblings
   * @return {Array}
   * @api public
   */

  get siblings() {
    return this.parent ? this.parent.nodes : null;
  }

  /**
   * Calculate the node's current index on `node.parent.nodes`, or `-1` if the
   * node does not have a parent, or is not on `node.parent.nodes`.
   *
   * ```js
   * const foo = new Node({type: 'foo'});
   * const bar = new Node({type: 'bar'});
   * const baz = new Node({type: 'baz'});
   * const qux = new Node({type: 'qux'});
   * foo.push(bar);
   * foo.push(baz);
   * foo.unshift(qux);
   *
   * console.log(bar.index) // 1
   * console.log(baz.index) // 2
   * console.log(qux.index) // 0
   * ```
   * @setter
   * @getter
   * @name .index
   * @return {Number}
   * @api public
   */

  set index(index) {
    define(this, '_index', index);
  }
  get index() {
    if (!Array.isArray(this.siblings)) {
      return -1;
    }
    if (this._index === -1 || this.siblings[this._index] !== this) {
      define(this, '_index', this.siblings.indexOf(this));
    }
    return this._index;
  }

  /**
   * Get the previous node from the [siblings](#siblings) array or `null`.
   *
   * ```js
   * const foo = new Node({type: 'foo'});
   * const bar = new Node({type: 'bar'});
   * const baz = new Node({type: 'baz'});
   * foo.push(bar);
   * foo.push(baz);
   *
   * console.log(baz.prev.type) // 'bar'
   * ```
   * @getter
   * @name .prev
   * @return {Object}
   * @api public
   */

  get prev() {
    if (Array.isArray(this.siblings)) {
      return this.siblings[this.index - 1] || this.parent.prev;
    }
    return null;
  }

  /**
   * Get the next element from the [siblings](#siblings) array, or `null` if
   * a next node does not exist.
   *
   * ```js
   * const parent = new Node({type: 'root'});
   * const foo = new Node({type: 'foo'});
   * const bar = new Node({type: 'bar'});
   * const baz = new Node({type: 'baz'});
   * parent.push(foo);
   * parent.push(bar);
   * parent.push(baz);
   *
   * console.log(foo.next.type) // 'bar'
   * console.log(bar.next.type) // 'baz'
   * ```
   * @getter
   * @name .next
   * @return {Object}
   * @api public
   */

  get next() {
    if (Array.isArray(this.siblings)) {
      return this.siblings[this.index + 1] || this.parent.next;
    }
    return null;
  }

  /**
   * Get the first child node from `node.nodes`.
   *
   * ```js
   * const foo = new Node({type: 'foo'});
   * const bar = new Node({type: 'bar'});
   * const baz = new Node({type: 'baz'});
   * const qux = new Node({type: 'qux'});
   * foo.push(bar);
   * foo.push(baz);
   * foo.push(qux);
   *
   * console.log(foo.first.type) // 'bar'
   * ```
   * @getter
   * @name .first
   * @return {Object} The first node, or undefiend
   * @api public
   */

  get first() {
    return Array.isArray(this.nodes) ? this.nodes[0] : null;
  }

  /**
   * Get the last child node from `node.nodes`.
   *
   * ```js
   * const foo = new Node({type: 'foo'});
   * const bar = new Node({type: 'bar'});
   * const baz = new Node({type: 'baz'});
   * const qux = new Node({type: 'qux'});
   * foo.push(bar);
   * foo.push(baz);
   * foo.push(qux);
   *
   * console.log(foo.last.type) // 'qux'
   * ```
   * @getter
   * @name .last
   * @return {Object} The last node, or undefiend
   * @api public
   */

  get last() {
    return Array.isArray(this.nodes) ? this.nodes[this.nodes.length - 1] : null;
  }

  /**
   * Get the `node.depth`. The root node has a depth of 0. Add 1 to child nodes
   * for each level of nesting.
   *
   * ```js
   * const foo = new Node({type: 'foo'});
   * foo.push(bar);
   *
   * console.log(foo.depth) // 1
   * console.log(bar.depth) // 2
   * ```
   * @getter
   * @name .depth
   * @return {Object} The last node, or undefiend
   * @api public
   */

  get depth() {
    return this.parent ? this.parent.depth + 1 : 0;
  }

  /**
   * Static method that returns true if the given value is a node.
   *
   * ```js
   * const Node = require('snapdragon-node');
   * const node = new Node({type: 'foo'});
   * console.log(Node.isNode(node)); //=> true
   * console.log(Node.isNode({})); //=> false
   * ```
   * @name Node#isNode
   * @param {Object} `node`
   * @returns {Boolean}
   * @api public
   * @static
   */

  static isNode(node) {
    return isObject(node) && (node instanceof this || node.isNode === true);
  }
}

/**
 * Simplified assertion. Throws an error is `value` is not true.
 */

function assert(value, message) {
  if (value !== true) throw new Error(message);
}

function expect(value, name) {
  assert(value, 'expected ' + name + ' to be an instance of Node');
}

function hasOwn(obj, prop) {
  return Object.hasOwnProperty.call(obj, prop);
}

function isEmpty(node, fn) {
  expect(Node.isNode(node), 'node');

  if (!Array.isArray(node.nodes)) {
    if (typeof fn === 'function') {
      return fn(node);
    }
    return !node.value;
  }

  if (node.nodes.length === 0) {
    return true;
  }

  for (const child of node.nodes) {
    if (!isEmpty(child, fn)) {
      return false;
    }
  }

  return true;
}

function isType(node, type) {
  expect(Node.isNode(node), 'node');

  switch (typeOf(type)) {
    case 'string':
      return node.type === type;
    case 'regexp':
      return type.test(node.type);
    case 'array':
      for (const key of type) {
        if (node.isType(node, key)) {
          return true;
        }
      }
      return false;
    default: {
      throw new TypeError('expected "type" to be an array, string or regexp');
    }
  }
}

function isObject(val) {
  return typeOf(val) === 'object';
}

function typeOf(val) {
  if (typeof val === 'string') return 'string';
  if (Array.isArray(val)) return 'array';
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val === void 0) return 'undefiend';
  if (val === null) return 'null';
  return typeof val;
}

/**
 * assign `token` properties to `node`
 */

function assign(node, token, clone) {
  copy(node, token, clone);
  ensureNodes(node, clone);

  if (token.constructor && token.constructor.name === 'Token') {
    copy(node, token.constructor.prototype, clone);
  }
}

function copy(receiver, provider, clone) {
  const descriptors = Object.getOwnPropertyDescriptors(provider);
  for (const key in descriptors) {
    if (key === 'constructor' || key in receiver) continue;
    const desc = descriptors[key];

    if (hasOwn(desc, 'value') && clone === true) {
      desc.value = cloneDeep(desc.value);
    }
    Object.defineProperty(receiver, key, desc);
  }
}

function ensureNodes(node, clone) {
  if (!node.nodes) return;

  if (Array.isArray(node.nodes)) {
    const len = node.nodes.length;
    for (let i = 0; i < len; i++) {
      let child = node.nodes[i];
      if (!Node.isNode(child)) {
        child = node.nodes[i] = new Node(node.nodes[i], null, true);
        child.parent = node;
        child.index = i;
      }
      ensureNodes(child);
    }
    node.size = len;
  }
}

/**
 * Deeply clone plain objects and arrays.
 */

function cloneDeep(value) {
  const obj = {};
  switch (typeOf(value)) {
    case 'array':
      return value.map(ele => cloneDeep(ele));
    case 'object':
      for (const key of Object.keys(value)) {
        obj[key] = cloneDeep(value[key]);
      }
      return obj;
    default: {
      return value;
    }
  }
}

function visit(node, fn) {
  fn(node);
  return node.nodes ? mapVisit(node, fn) : node;
}

function mapVisit(node, fn) {
  node.nodes.forEach(n => visit(n, fn));
  return node;
}

function define(obj, key, value) {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: value
  });
}

/**
 * Expose `Node`
 */

exports = module.exports = Node;
