# Release history

Changelog entries are classified using the following labels from [keep-a-changelog][]:

* `added`: for new features
* `changed`: for changes in existing functionality
* `deprecated`: for once-stable features removed in upcoming releases
* `removed`: for deprecated features removed in this release
* `fixed`: for any bug fixes

Custom labels used in this changelog:

* `dependencies`: bumps dependencies
* `housekeeping`: code re-organization, minor edits, or other changes that don't fit in one of the other categories.

## 3.0.0 - 2018-11-24

**Removed**

- `node.define` was removed. Use [define-property](https://github.com/jonschlinkert/define-property) or `Object.defineProperty` instead.

**Added**

- `node.isEmpty` method
- `node.clone` method, for cloning the node
- `node.stringify` method, for returning a string from `node.value` and/or from recursing over child nodes. 

## 2.1.0 - 2017-11-14

**Deprecated**

- `node.define` is deprecated and will be removed in v3.0.0. Use [define-property](https://github.com/jonschlinkert/define-property) or `Object.defineProperty` instead.

## 2.0.0 - 2017-05-01

**Changed**

- `node.unshiftNode` was renamed to [.unshift](readme.md#unshift)
- `node.pushNode` was renamed to [.push](readme.md#push)
- `node.getNode` was renamed to [.find](readme.md#find)

**Added**

- [.isNode](readme.md#isNode)
- [.isEmpty](readme.md#isEmpty)
- [.pop](readme.md#pop)
- [.shift](readme.md#shift)
- [.remove](readme.md#remove)

### 0.1.0

First release.

[keep-a-changelog]: https://github.com/olivierlacan/keep-a-changelog
