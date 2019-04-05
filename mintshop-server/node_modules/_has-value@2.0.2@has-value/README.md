# has-value [![NPM version](https://img.shields.io/npm/v/has-value.svg?style=flat)](https://www.npmjs.com/package/has-value) [![NPM monthly downloads](https://img.shields.io/npm/dm/has-value.svg?style=flat)](https://npmjs.org/package/has-value) [![NPM total downloads](https://img.shields.io/npm/dt/has-value.svg?style=flat)](https://npmjs.org/package/has-value) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/has-value.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/has-value)

> Returns true if a value exists, false if empty. Works with deeply nested values using object paths.

Please consider following this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), and consider starring the project to show your :heart: and support.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save has-value
```

## Heads up!

Breaking changes in v2.0! See the [release history](#release-history) for details.

## Usage

```js
const has = require('has-value');

console.log(has()) //=> true
console.log(has('foo')) //=> true
```

**Works for:**

* booleans
* functions
* numbers
* strings
* nulls
* object
* arrays

**isEmpty**

To do the opposite and test for empty values, do:

```js
const isEmpty = (...args) => !has(...args);
```

## Supported types

### Arrays

```js
console.log(has({ foo: { bar: ['a'] } }, 'foo.bar'));    //=> true
console.log(has({ foo: { bar: [0] } }, 'foo.bar'));      //=> true
console.log(has({ foo: { bar: [[[]]] } }, 'foo.bar'));   //=> false
console.log(has({ foo: { bar: [[], []] } }, 'foo.bar')); //=> false
console.log(has({ foo: { bar: [] } }, 'foo.bar'));       //=> false
```

### Booleans

```js
console.log(has({ foo: { bar: true } }, 'foo.bar'));  //=> true
console.log(has({ foo: { bar: false } }, 'foo.bar')); //=> true
```

### Buffers

```js
console.log(has({ foo: { bar: new Buffer() } }, 'foo.bar'));      //=> false
console.log(has({ foo: { bar: new Buffer('foo') } }, 'foo.bar')); //=> true
```

### Dates

Dates are always true.

```js
console.log(has({ foo: { bar: new Date() } }, 'foo.bar')); //=> true
```

### Errors

Returns `false` if `err.message` is an empty string.

```js
console.log(has({ foo: { bar: new Error() } }, 'foo.bar'));      //=> false
console.log(has({ foo: { bar: new Error('foo') } }, 'foo.bar')); //=> true
```

### Functions

Functions are always true.

```js
console.log(has({ foo: { bar: function(foo) {} } }, 'foo.bar')); //=> true
console.log(has({ foo: { bar: function() {} } }, 'foo.bar'));    //=> true
```

### Maps

```js
console.log(has({ foo: { bar: new Map() } }, 'foo.bar'));                 //=> false
console.log(has({ foo: { bar: new Map([['foo', 'bar']]) } }, 'foo.bar')); //=> true
```

### Null

`null` is always true, as it's assumed that this is a user-defined value, versus `undefined` which is not.

```js
console.log(has({ foo: { bar: null } }, 'foo.bar')); //=> true
```

### Objects

```js
console.log(has({ foo: { bar: {} } }, 'foo.bar')); //=> false
console.log(has({ foo: { bar: { a: 'a' }} } }, 'foo.bar'));        //=> true
console.log(has({ foo: { bar: { foo: undefined } } }, 'foo.bar')); //=> false
console.log(has({ foo: { bar: { foo: null } } }, 'foo.bar'));      //=> true
```

### Numbers

```js
console.log(has({ foo: { bar: 1 } }, 'foo.bar')); //=> true
console.log(has({ foo: { bar: 0 } }, 'foo.bar')); //=> true
```

### Regular expressions

```js
console.log(has({ foo: { bar: new RegExp() } }, 'foo.bar'));      //=> false
console.log(has({ foo: { bar: new RegExp('foo') } }, 'foo.bar')); //=> true
```

### Sets

```js
console.log(has({ foo: { bar: new Set() } }, 'foo.bar'));               //=> false
console.log(has({ foo: { bar: new Set(['foo', 'bar']) } }, 'foo.bar')); //=> true
```

### Strings

```js
console.log(has({ foo: { bar: 'a' } }, 'foo.bar')); //=> true
console.log(has({ foo: { bar: '' } }, 'foo.bar'));  //=> false
```

## Undefined

```js
console.log(has({ foo: { bar:  } }, 'foo.bar'));          //=> false
console.log(has({ foo: { bar: void 0 } }, 'foo.bar'));    //=> false
console.log(has({ foo: { bar: undefined } }, 'foo.bar')); //=> false
```

## Release history

### v2.0.0

**Breaking changes**

* Now returns false if the first argument is not an object, function or array, and the second argument is not a string or array.

### v1.0.0

* `zero` always returns true
* `array` now recurses, so that an array of empty arrays will return `false`
* `null` now returns true

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

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

* [define-property](https://www.npmjs.com/package/define-property): Define a non-enumerable property on an object. Uses Reflect.defineProperty when available, otherwise Object.defineProperty. | [homepage](https://github.com/jonschlinkert/define-property "Define a non-enumerable property on an object. Uses Reflect.defineProperty when available, otherwise Object.defineProperty.")
* [get-value](https://www.npmjs.com/package/get-value): Use property paths like 'a.b.c' to get a nested value from an object. Even works… [more](https://github.com/jonschlinkert/get-value) | [homepage](https://github.com/jonschlinkert/get-value "Use property paths like 'a.b.c' to get a nested value from an object. Even works when keys have dots in them (no other dot-prop library can do this!).")
* [set-value](https://www.npmjs.com/package/set-value): Create nested values and any intermediaries using dot notation (`'a.b.c'`) paths. | [homepage](https://github.com/jonschlinkert/set-value "Create nested values and any intermediaries using dot notation (`'a.b.c'`) paths.")
* [unset-value](https://www.npmjs.com/package/unset-value): Delete nested properties from an object using dot notation. | [homepage](https://github.com/jonschlinkert/unset-value "Delete nested properties from an object using dot notation.")

### Contributors

| **Commits** | **Contributor** | 
| --- | --- |
| 32 | [jonschlinkert](https://github.com/jonschlinkert) |
| 2 | [rmharrison](https://github.com/rmharrison) |
| 1 | [wtgtybhertgeghgtwtg](https://github.com/wtgtybhertgeghgtwtg) |

### Author

**Jon Schlinkert**

* [LinkedIn Profile](https://linkedin.com/in/jonschlinkert)
* [GitHub Profile](https://github.com/jonschlinkert)
* [Twitter Profile](https://twitter.com/jonschlinkert)

### License

Copyright © 2018, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on March 03, 2018._