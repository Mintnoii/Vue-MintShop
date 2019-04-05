# snapdragon-node [![NPM version](https://img.shields.io/npm/v/snapdragon-node.svg?style=flat)](https://www.npmjs.com/package/snapdragon-node) [![NPM monthly downloads](https://img.shields.io/npm/dm/snapdragon-node.svg?style=flat)](https://npmjs.org/package/snapdragon-node) [![NPM total downloads](https://img.shields.io/npm/dt/snapdragon-node.svg?style=flat)](https://npmjs.org/package/snapdragon-node) [![Linux Build Status](https://img.shields.io/travis/here-be/snapdragon-node.svg?style=flat&label=Travis)](https://travis-ci.org/here-be/snapdragon-node)

> Class for creating AST nodes.

Please consider following this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), and consider starring the project to show your :heart: and support.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save snapdragon-node
```

## Usage

```js
const Node = require('snapdragon-node');
// either pass on object with "type" and (optional) "val"
const node1 = new Node({type: 'star', val: '*'});
// or pass "val" (first) and "type" (second) as string
const node2 = new Node('*', 'star');
// both result in => Node { type: 'star', val: '*' }
```

## Snapdragon usage

With [snapdragon](https://github.com/here-be/snapdragon) v0.9.0 and higher, it's recommended that you use `this.node()` to create a new `Node` inside parser handlers (instead of doing `new Node()`).

### Snapdragon ^1.0.0

Example usage inside a [snapdragon](https://github.com/here-be/snapdragon) parser handler function.

```js
const Node = require('snapdragon-node');
const Token = require('snapdragon-token');

// create a new AST node
const node = new Node({ type: 'star', value: '*' });

// convert a Lexer Token into an AST Node
const token = new Token({ type: 'star', value: '*' });
const node = new Node(token);
```

## Node objects

AST Nodes are represented as `Node` objects that implement the following interface:

```js
interface Node {
  type: string;
  value: string | undefined
  nodes: array | undefined
}
```

* `type` **{string}** - A string representing the node variant type. This property is often used for classifying the purpose or nature of the node, so that parsers or compilers can determine what to do with it.
* `value` **{string|undefined}** (optional) - In general, value should only be a string when `node.nodes` is undefined. This is not reinforced, but is considered good practice. Use a different property name to store arbitrary strings on the node when `node.nodes` is an array.
* `nodes` **{array|undefined}** (optional) - array of child nodes

A number of useful methods and non-enumerable properties are also exposed for adding, finding and removing child nodes, etc.

Continue reading the API documentation for more details.

## Node API

### [Node](index.js#L20)

Create a new AST `Node` with the given `type` and `value`, or an object to initialize with.

**Params**

* `type` **{object|string}**: Either an object to initialize with, or a string to be used as the `node.type`.
* `value` **{string|boolean}**: If the first argument is a string, the second argument may be a string value to set on `node.value`.
* `clone` **{boolean}**: When an object is passed as the first argument, pass true as the last argument to deep clone values before assigning them to the new node.
* `returns` **{Object}**: node instance

**Example**

```js
console.log(new Node({ type: 'star', value: '*' }));
console.log(new Node('star', '*'));
// both result in => Node { type: 'star', value: '*' }
```

### [.clone](index.js#L50)

Return a clone of the node. Values that are arrays or plain objects are deeply cloned.

* `returns` **{Object}**: returns a clone of the node

**Example**

```js
const node = new Node({type: 'star', value: '*'});
consle.log(node.clone() !== node);
//=> true
```

### [.stringify](index.js#L68)

Return a string created from `node.value` and/or recursively visiting over `node.nodes`.

* `returns` **{String}**

**Example**

```js
const node = new Node({type: 'star', value: '*'});
consle.log(node.stringify());
//=> '*'
```

### [.push](index.js#L88)

Push a child node onto the `node.nodes` array.

**Params**

* `node` **{Object}**
* `returns` **{Number}**: Returns the length of `node.nodes`, like `Array.push`

**Example**

```js
const foo = new Node({type: 'foo'});
const bar = new Node({type: 'bar'});
foo.push(bar);
```

### [.unshift](index.js#L117)

Unshift a child node onto `node.nodes`, and set `node` as the parent on `child.parent`.

**Params**

* `node` **{Object}**
* `returns` **{Number}**: Returns the length of `node.nodes`

**Example**

```js
const foo = new Node({type: 'foo'});
const bar = new Node({type: 'bar'});
foo.unshift(bar);
```

### [.pop](index.js#L151)

Pop a node from `node.nodes`.

* `returns` **{Number}**: Returns the popped `node`

**Example**

```js
const node = new Node({type: 'foo'});
node.push(new Node({type: 'a'}));
node.push(new Node({type: 'b'}));
node.push(new Node({type: 'c'}));
node.push(new Node({type: 'd'}));
console.log(node.nodes.length);
//=> 4
node.pop();
console.log(node.nodes.length);
//=> 3
```

### [.shift](index.js#L178)

Shift a node from `node.nodes`.

* `returns` **{Object}**: Returns the shifted `node`

**Example**

```js
const node = new Node({type: 'foo'});
node.push(new Node({type: 'a'}));
node.push(new Node({type: 'b'}));
node.push(new Node({type: 'c'}));
node.push(new Node({type: 'd'}));
console.log(node.nodes.length);
//=> 4
node.shift();
console.log(node.nodes.length);
//=> 3
```

### [.remove](index.js#L197)

Remove `node` from `node.nodes`.

**Params**

* `node` **{Object}**
* `returns` **{Object}**: Returns the removed node.

**Example**

```js
node.remove(childNode);
```

### [.find](index.js#L228)

Get the first child node from `node.nodes` that matches the given `type`. If `type` is a number, the child node at that index is returned.

**Params**

* `type` **{String}**
* `returns` **{Object}**: Returns a child node or undefined.

**Example**

```js
const child = node.find(1); //<= index of the node to get
const child = node.find('foo'); //<= node.type of a child node
const child = node.find(/^(foo|bar)$/); //<= regex to match node.type
const child = node.find(['foo', 'bar']); //<= array of node.type(s)
```

### [.has](index.js#L259)

Returns true if `node.nodes` array contains the given `node`.

**Params**

* `type` **{String}**
* `returns` **{Boolean}**

**Example**

```js
const foo = new Node({type: 'foo'});
const bar = new Node({type: 'bar'});
cosole.log(foo.has(bar)); // false
foo.push(bar);
cosole.log(foo.has(bar)); // true
```

### [.hasType](index.js#L284)

Return true if the `node.nodes` has the given `type`.

**Params**

* `type` **{String}**
* `returns` **{Boolean}**

**Example**

```js
const foo = new Node({type: 'foo'});
const bar = new Node({type: 'bar'});
foo.push(bar);

cosole.log(foo.hasType('qux'));          // false
cosole.log(foo.hasType(/^(qux|bar)$/));  // true
cosole.log(foo.hasType(['qux', 'bar'])); // true
```

### [.isType](index.js#L303)

Return true if the node is the given `type`.

**Params**

* `type` **{String}**
* `returns` **{Boolean}**

**Example**

```js
const node = new Node({type: 'bar'});
cosole.log(node.isType('foo'));          // false
cosole.log(node.isType(/^(foo|bar)$/));  // true
cosole.log(node.isType(['foo', 'bar'])); // true
```

### [.isEmpty](index.js#L323)

Returns true if `node.value` is an empty string, or `node.nodes` does not contain any non-empty text nodes.

**Params**

* `fn` **{Function}**: (optional) Filter function that is called on `node` and/or child nodes. `isEmpty` will return false immediately when the filter function returns false on any nodes.
* `returns` **{Boolean}**

**Example**

```js
const node = new Node({type: 'text'});
node.isEmpty(); //=> true
node.value = 'foo';
node.isEmpty(); //=> false
```

### [.isInside](index.js#L342)

Returns true if the node has an ancestor node of the given `type`

**Params**

* `type` **{String}**
* `returns` **{Boolean}**

**Example**

```js
const box = new Node({type: 'box'});
const marble = new Node({type: 'marble'});
box.push(marble);
marble.isInside('box'); //=> true
```

### [.siblings](index.js#L365)

Get the siblings array, or `null` if it doesn't exist.

* `returns` **{Array}**

**Example**

```js
const foo = new Node({type: 'foo'});
const bar = new Node({type: 'bar'});
const baz = new Node({type: 'baz'});
foo.push(bar);
foo.push(baz);

console.log(bar.siblings.length) // 2
console.log(baz.siblings.length) // 2
```

### [.index](index.js#L393)

Calculate the node's current index on `node.parent.nodes`, or `-1` if the node does not have a parent, or is not on `node.parent.nodes`.

* `returns` **{Number}**

**Example**

```js
const foo = new Node({type: 'foo'});
const bar = new Node({type: 'bar'});
const baz = new Node({type: 'baz'});
const qux = new Node({type: 'qux'});
foo.push(bar);
foo.push(baz);
foo.unshift(qux);

console.log(bar.index) // 1
console.log(baz.index) // 2
console.log(qux.index) // 0
```

### [.prev](index.js#L424)

Get the previous node from the [siblings](#siblings) array or `null`.

* `returns` **{Object}**

**Example**

```js
const foo = new Node({type: 'foo'});
const bar = new Node({type: 'bar'});
const baz = new Node({type: 'baz'});
foo.push(bar);
foo.push(baz);

console.log(baz.prev.type) // 'bar'
```

### [.next](index.js#L453)

Get the next element from the [siblings](#siblings) array, or `null` if a next node does not exist.

* `returns` **{Object}**

**Example**

```js
const parent = new Node({type: 'root'});
const foo = new Node({type: 'foo'});
const bar = new Node({type: 'bar'});
const baz = new Node({type: 'baz'});
parent.push(foo);
parent.push(bar);
parent.push(baz);

console.log(foo.next.type) // 'bar'
console.log(bar.next.type) // 'baz'
```

### [.first](index.js#L480)

Get the first child node from `node.nodes`.

* `returns` **{Object}**: The first node, or undefiend

**Example**

```js
const foo = new Node({type: 'foo'});
const bar = new Node({type: 'bar'});
const baz = new Node({type: 'baz'});
const qux = new Node({type: 'qux'});
foo.push(bar);
foo.push(baz);
foo.push(qux);

console.log(foo.first.type) // 'bar'
```

### [.last](index.js#L504)

Get the last child node from `node.nodes`.

* `returns` **{Object}**: The last node, or undefiend

**Example**

```js
const foo = new Node({type: 'foo'});
const bar = new Node({type: 'bar'});
const baz = new Node({type: 'baz'});
const qux = new Node({type: 'qux'});
foo.push(bar);
foo.push(baz);
foo.push(qux);

console.log(foo.last.type) // 'qux'
```

### [.depth](index.js#L525)

Get the `node.depth`. The root node has a depth of 0. Add 1 to child nodes for each level of nesting.

* `returns` **{Object}**: The last node, or undefiend

**Example**

```js
const foo = new Node({type: 'foo'});
foo.push(bar);

console.log(foo.depth) // 1
console.log(bar.depth) // 2
```

### [Node#isNode](index.js#L545)

Static method that returns true if the given value is a node.

**Params**

* `node` **{Object}**
* `returns` **{Boolean}**

**Example**

```js
const Node = require('snapdragon-node');
const node = new Node({type: 'foo'});
console.log(Node.isNode(node)); //=> true
console.log(Node.isNode({})); //=> false
```

### Non-enumerable properties

* `node.isNode` **{boolean}** - this value is set to `true` when a node is created. This can be useful in situationas as a fast alternative to using `instanceof Node` if you [need to determine](#nodeisnode) if a value is a `node` object.
* `node.size` **{number}** - the number of child nodes that have been pushed or unshifted onto `node.nodes` using the node's API. This is useful for determining if nodes were added to `node.nodes` without using `node.push()` or `node.unshift()` (for example: `if (node.nodes && node.size !== node.nodes.length)`)
* `node.parent` **{object}** (instance of Node)

## Release history

See [the changelog](changelog.md).

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](.github/contributing.md) for advice on opening issues, pull requests, and coding standards.

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

</details>

<details>
<summary><strong>Building docs</strong></summary>

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

</details>

### Related projects

You might also be interested in these projects:

* [breakdance](https://www.npmjs.com/package/breakdance): Breakdance is a node.js library for converting HTML to markdown. Highly pluggable, flexible and easy… [more](http://breakdance.io) | [homepage](http://breakdance.io "Breakdance is a node.js library for converting HTML to markdown. Highly pluggable, flexible and easy to use. It's time for your markup to get down.")
* [snapdragon-capture](https://www.npmjs.com/package/snapdragon-capture): Snapdragon plugin that adds a capture method to the parser instance. | [homepage](https://github.com/jonschlinkert/snapdragon-capture "Snapdragon plugin that adds a capture method to the parser instance.")
* [snapdragon-cheerio](https://www.npmjs.com/package/snapdragon-cheerio): Snapdragon plugin for converting a cheerio AST to a snapdragon AST. | [homepage](https://github.com/jonschlinkert/snapdragon-cheerio "Snapdragon plugin for converting a cheerio AST to a snapdragon AST.")
* [snapdragon-util](https://www.npmjs.com/package/snapdragon-util): Utilities for the snapdragon parser/compiler. | [homepage](https://github.com/here-be/snapdragon-util "Utilities for the snapdragon parser/compiler.")
* [snapdragon](https://www.npmjs.com/package/snapdragon): Easy-to-use plugin system for creating powerful, fast and versatile parsers and compilers, with built-in source-map… [more](https://github.com/here-be/snapdragon) | [homepage](https://github.com/here-be/snapdragon "Easy-to-use plugin system for creating powerful, fast and versatile parsers and compilers, with built-in source-map support.")

### Author

**Jon Schlinkert**

* [GitHub Profile](https://github.com/jonschlinkert)
* [Twitter Profile](https://twitter.com/jonschlinkert)
* [LinkedIn Profile](https://linkedin.com/in/jonschlinkert)

### License

Copyright © 2018, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.8.0, on November 24, 2018._