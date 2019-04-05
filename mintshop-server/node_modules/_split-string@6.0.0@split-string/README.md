# split-string [![NPM version](https://img.shields.io/npm/v/split-string.svg?style=flat)](https://www.npmjs.com/package/split-string) [![NPM monthly downloads](https://img.shields.io/npm/dm/split-string.svg?style=flat)](https://npmjs.org/package/split-string) [![NPM total downloads](https://img.shields.io/npm/dt/split-string.svg?style=flat)](https://npmjs.org/package/split-string) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/split-string.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/split-string)

> Easy way to split a string on a given character unless it's quoted or escaped.

Please consider following this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), and consider starring the project to show your :heart: and support.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save split-string
```

## Usage

```js
const split = require('split-string');

console.log(split('a.b.c'));
//=> ['a', 'b', 'c']

// respects escaped characters
console.log(split('a.b.c\\.d'));
//=> ['a', 'b', 'c.d']

// respects double-quoted strings
console.log(split('a."b.c.d".e'));
//=> ['a', '"b.c.d"', 'e']
```

## Options

### options.quotes

**Type**: `Array|Boolean`

**Default**: `[]

**Description**

Tell split-string not to split inside any of the quote characters specified on the quotes option. Each character signifies both the "opening" and "closing" character to use.

```js
// default behavior
console.log(split('a.b."c.d.e.f.g".h.i'));
//=> [ 'a', 'b', '"c', 'd', 'e', 'f', 'g"', 'h', 'i' ]

// with quotes
console.log(split('a.b."c.d.e.f.g".h.i', { quotes: ['"'] }));
//=> [ 'a', 'b', '"c.d.e.f.g"', 'h', 'i' ]

// escaped quotes will be ignored
console.log(split('a.b.\\"c.d."e.f.g".h.i', { quotes: ['"'] }));
//=> [ 'a', 'b', '"c', 'd', '"e.f.g"', 'h', 'i' ]

// example of how to exclude non-escaped quotes from the result
let keep = (value, state) => {
  return value !== '\\' && (value !== '"' || state.prev() === '\\');
};
console.log(split('a.b.\\"c.d."e.f.g".h.i', { quotes: ['"'], keep }));
//=> [ 'a', 'b', '"c', 'd', 'e.f.g', 'h', 'i' ]
```

## Options

### options.brackets

**Type**: `Object|Boolean`

**Default**: `{}`

**Description**

By default, no special significance is given to bracket-like characters (such as square brackets, curly braces, angle brackets, and so on).

```js
// default behavior
console.log(split('a.{b.c}.{d.e}'));
//=> [ 'a', '{b', 'c}', '{d', 'e}' ]
```

When `options.brackets` is `true`, the following brackets types are supported:

```js
{
  '<': '>',
  '(': ')',
  '[': ']',
  '{': '}'
}
```

For example:

```js
console.log(split('a.{b.c}.{d.e}', { brackets: true }));
//=> [ 'a', '{b.c}', '{d.e}' ]
```

Alternatively, an object of brackets may be passed, where each key is the _opening bracket_ and each value is the corresponding _closing bracket_. Note that the key and value **must be different characters**. If you want to use the same character for both open and close, use the [quotes option](#optionsquotes).

**Examples**

```js
// no bracket support by default
console.log(split('a.{b.c}.[d.e].f'));
//=> [ 'a', '{b', 'c}', '[d', 'e]', 'f' ]

// tell split-string not to split inside curly braces
console.log(split('a.{b.c}.[d.e].f', { brackets: { '{': '}' }}));
//=> [ 'a', '{b.c}', '[d', 'e]', 'f' ]

// tell split-string not to split inside any of these types: "<>{}[]()"
console.log(split('a.{b.c}.[d.e].f', { brackets: true }));
//=> [ 'a', '{b.c}', '[d.e]', 'f' ]

// ...nested brackets are also supported
console.log(split('a.{b.{c.d}.e}.f', { brackets: true }));
//=> [ 'a', '{b.{c.d}.e}', 'f' ]

// tell split-string not to split inside the given custom types
console.log(split('«a.b».⟨c.d⟩.[e.f]', { brackets: { '«': '»', '⟨': '⟩' } }));
//=> [ '«a.b»', '⟨c.d⟩', '[e', 'f]' ]
```

### options.keep

**Type**: `function`

**Default**: Function that returns true if the character is not `\\`.

Function that returns true when a character should be retained in the result.

**Example**

```js
console.log(split('a.b\\.c')); //=> ['a', 'b.c']

// keep all characters
console.log(split('a.b.\\c', { keep: () => true })); //=> ['a', 'b\.c']
```

### options.separator

**Type**: `string`

**Default**: `.`

The character to split on.

**Example**

```js
console.log(split('a.b,c', { separator: ',' })); //=> ['a.b', 'c']
```

## Split function

Optionally pass a function as the last argument to tell split-string whether or not to split when the specified separator is encountered.

**Example**

```js
// only split on "." when the "previous" character is "a"
console.log(split('a.b.c.a.d.e', state => state.prev() === 'a'));
//=> [ 'a', 'b.c.a', 'd.e' ]
```

The `state` object exposes the following properties:

* `input` - (String) The un-modified, user-defined input string
* `separator` - (String) the specified separator to split on.
* `index` - (Number) The current cursor position
* `value` - (String) The character at the current index
* `bos` - (Function) Returns true if position is at the beginning-of-string
* `eos` - (Function) Returns true if position is at the end-of-string
* `prev` - (Function) Returns the previously scanned character
* `next` - (Function) Returns the next character after the current position
* `block` - (Object) The "current" AST node.
* `stack` - (Array) AST nodes

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

* [deromanize](https://www.npmjs.com/package/deromanize): Convert roman numerals to arabic numbers (useful for books, outlines, documentation, slide decks, etc) | [homepage](https://github.com/jonschlinkert/deromanize "Convert roman numerals to arabic numbers (useful for books, outlines, documentation, slide decks, etc)")
* [randomatic](https://www.npmjs.com/package/randomatic): Generate randomized strings of a specified length using simple character sequences. The original generate-password. | [homepage](https://github.com/jonschlinkert/randomatic "Generate randomized strings of a specified length using simple character sequences. The original generate-password.")
* [repeat-string](https://www.npmjs.com/package/repeat-string): Repeat the given string n times. Fastest implementation for repeating a string. | [homepage](https://github.com/jonschlinkert/repeat-string "Repeat the given string n times. Fastest implementation for repeating a string.")
* [romanize](https://www.npmjs.com/package/romanize): Convert numbers to roman numerals (useful for books, outlines, documentation, slide decks, etc) | [homepage](https://github.com/jonschlinkert/romanize "Convert numbers to roman numerals (useful for books, outlines, documentation, slide decks, etc)")

### Contributors

| **Commits** | **Contributor** | 
| --- | --- |
| 52 | [jonschlinkert](https://github.com/jonschlinkert) |
| 10 | [doowb](https://github.com/doowb) |

### Author

**Jon Schlinkert**

* [GitHub Profile](https://github.com/jonschlinkert)
* [Twitter Profile](https://twitter.com/jonschlinkert)
* [LinkedIn Profile](https://linkedin.com/in/jonschlinkert)

### License

Copyright © 2018, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on August 14, 2018._