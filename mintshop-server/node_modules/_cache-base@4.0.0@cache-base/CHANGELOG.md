# Release history

All notable changes to this project will be documented in this file.

This changelog's format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and versioning in this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

<details>
  <summary><strong>Guiding Principles</strong></summary>

- Changelogs are for humans, not machines.
- There should be an entry for every single version.
- The same types of changes should be grouped.
- Versions and sections should be linkable.
- The latest version comes first.
- The release date of each versions is displayed.
- Mention whether you follow Semantic Versioning.

</details>

<details>
  <summary><strong>Types of changes</strong></summary>

Changelog entries are classified using the following labels _(from [keep-a-changelog](http://keepachangelog.com/)_):

- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

</details>


## [3.0.0] - 2018-01-27

**Changed**

- adds `.prime()` and `.default()` methods


## [2.0.0] - 2017-12-17

**Changed**

- convert to class
- refactor to allow namespace to be set on constructor, thus `.namespace` was removed from the main export. Please see the readme for details.


## [1.0.1] - 2017-07-22

- run update, lint, update deps


## [0.8.5] - 2017-02-25

- Bump `isobject`.
- Bump `set-value`.
- Merge pull request #7 from wtgtybhertgeghgtwtg/bump-dependencies
- run udpate

## [0.8.4] - 2016-05-30

- run update
- adds `.union` method. resolves https://github.com/jonschlinkert/cache-base/issues/3
- generate docs
- run update, update deps
- make `.union` key behavior consistent with other methods
- generate docs

## [0.8.2] - 2016-03-02

- handle single arg key as an array
- generate docs

## [0.8.1] - 2016-02-29

- ensure value is a non-array object, only clear if `prop` is defined

## [0.8.0] - 2016-02-09

- run update
- run update, lint
- minor refactor
- generate docs with verb

## [0.7.1] - 2015-11-23

- update deps
- lint
- adds lazy-cache, event emitting
- events tests

## [0.7.0] - 2015-11-23

- use eslint, lint
- refactor, simplify

## [0.6.0] - 2015-03-11

- fix pick docs
- lint
- get rid of deps

## [0.4.0] - 2015-02-14

- adds `.pick()` and `.omit()` methods
- adds tests
- build docs/readme

## [0.3.0] - 2015-02-13

- adds npmignore
- adds travis
- rename
- copyright year, lint
- update deps
- build readme

## [0.2.0] - 2014-11-15

- remove namespace stuff
- update fixtures
- update verbfile
- clean up, refactor a number of methods:
- update docs, run verb

## 0.1.0

- first commit

[2.0.0]: https://github.com/jonschlinkert/cache-base/compare/1.0.1...2.0.0
[1.0.1]: https://github.com/jonschlinkert/cache-base/compare/1.0.0...1.0.1
[1.0.0]: https://github.com/jonschlinkert/cache-base/compare/0.8.5...1.0.0
[0.8.5]: https://github.com/jonschlinkert/cache-base/compare/0.8.4...0.8.5
[0.8.4]: https://github.com/jonschlinkert/cache-base/compare/0.8.2...0.8.4
[0.8.2]: https://github.com/jonschlinkert/cache-base/compare/0.8.1...0.8.2
[0.8.1]: https://github.com/jonschlinkert/cache-base/compare/0.8.0...0.8.1
[0.8.0]: https://github.com/jonschlinkert/cache-base/compare/0.7.1...0.8.0
[0.7.1]: https://github.com/jonschlinkert/cache-base/compare/0.7.0...0.7.1
[0.7.0]: https://github.com/jonschlinkert/cache-base/compare/0.6.0...0.7.0
[0.6.0]: https://github.com/jonschlinkert/cache-base/compare/0.4.0...0.6.0
[0.4.0]: https://github.com/jonschlinkert/cache-base/compare/0.3.0...0.4.0
[0.3.0]: https://github.com/jonschlinkert/cache-base/compare/0.2.0...0.3.0

[keep-a-changelog]: https://github.com/olivierlacan/keep-a-changelog

