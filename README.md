Starred
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Get a list of repositories a user has [starred][github-starred].


## Installation

``` bash
$ npm install github-starred
```


## Usage

``` javascript
var starred = require( 'github-starred' );
```

<a name="starred"></a>
#### starred( opts, clbk )

Get a list of repositories a user has [starred][github-starred].

``` javascript
var opts = {
	'username': 'kgryte'
};

starred( opts, clbk );

function clbk( error, results, info ) {
	// Check for rate limit information...
	if ( info ) {
		console.error( 'Limit: %d', info.limit );
		console.error( 'Remaining: %d', info.remaining );
		console.error( 'Reset: %s', (new Date( info.reset*1000 )).toISOString() );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( JSON.stringify( results ) );
	// returns <repo_data>
}
```

The `function` accepts the following `options`:
*	__token__: Github [access token][github-token].
*	__username__: Github username.
*	__useragent__: [user agent][github-user-agent] `string`.
*	__sort__: sort method. Can be either `'created'` or `'updated'`. Default: `'created'`.
*	__direction__: sort direction. Can be either `'asc'` or `'desc'`. Default: `'desc'`.

To [authenticate][github-oauth2] with Github, set the [`token`][github-token] option.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!'
};

starred( opts, clbk );
```

To get a list of repositories a particular user has [starred][github-starred], set the `username` option.

``` javascript
var opts = {
	'username': 'kgryte'
};

starred( opts, clbk );
```

To specify a [user agent][github-user-agent], set the `useragent` option.

``` javascript
var opts = {
	'useragent': 'hello-github!'
};

starred( opts, clbk );
```


#### starred.factory( options, clbk )

Creates a reusable `function`.

``` javascript
var opts = {
	'username': 'kgryte',
	'token': 'tkjorjk34ek3nj4!'
};

var get = starred.factory( opts, clbk );

get();
get();
get();
// ...
```

The factory method accepts the same `options` as [`starred()`](#starred).


## Notes

*	Either a `username` or a [`token`][github-token] or both __must__ be provided. If provided a [`token`][github-token], but not a `username`, the `function` [fetches][github-get] a list of repositories the authenticated user has [starred][github-starred] on Github.
*	[Rate limit][github-rate-limit] information includes the following:
	-	__limit__: maximum number of requests a consumer is permitted to make per hour.
	-	__remaining__: number of remaining requests.
	-	__reset__: time at which the current [rate limit][github-rate-limit] window resets in [UTC seconds][unix-time].


---
## Examples

``` javascript
var starred = require( 'github-starred' );

var opts = {
	'username': 'kgryte',
	'useragent': 'beep-boop-bop'
};

starred( opts, clbk );

function clbk( error, results, info ) {
	if ( info ) {
		console.error( info );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( results );
}
```

To run the example code from the top-level application directory,

``` bash
$ DEBUG=* node ./examples/index.js
```


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g github-starred
```


### Usage

``` bash
Usage: ghstarred [options] 

Options:

  -h,  --help               Print this message.
  -V,  --version            Print the package version.
       --token token        Github access token.
       --username username  Github username.
  -ua, --useragent ua       User agent.
       --sort method        Sort method: created, updated.
       --direction dir      Sort direction: asc, desc.
```


### Notes

*	In addition to the [`token`][github-token] option, the [token][github-token] may also be specified by a [`GITHUB_TOKEN`][github-token] environment variable. The command-line option __always__ takes precedence.
*	Request resources are written to `stdout`.
*	[Rate limit][github-rate-limit] information is written to `stderr`.


### Examples

Setting the access [token][github-token] using the command-line option:

``` bash
$ DEBUG=* ghstarred --token <token> --username kgryte
# => '[{...},{...},...]'
```

Setting the access [token][github-token] using an environment variable:

``` bash
$ DEBUG=* GITHUB_TOKEN=<token> ghstarred --username kgryte
# => '[{...},{...},...]'
```

For local installations, modify the command to point to the local installation directory; e.g., 

``` bash
$ DEBUG=* ./node_modules/.bin/ghstarred --token <token> --username kgryte
# => '[{...},{...},...]'
```

Or, if you have cloned this repository and run `npm install`, modify the command to point to the executable; e.g., 

``` bash
$ DEBUG=* node ./bin/cli --token <token> --username kgryte
# => '[{...},{...},...]'
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/github-starred.svg
[npm-url]: https://npmjs.org/package/github-starred

[build-image]: http://img.shields.io/travis/kgryte/github-starred/master.svg
[build-url]: https://travis-ci.org/kgryte/github-starred

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/github-starred/master.svg
[coverage-url]: https://codecov.io/github/kgryte/github-starred?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/github-starred.svg
[dependencies-url]: https://david-dm.org/kgryte/github-starred

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/github-starred.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/github-starred

[github-issues-image]: http://img.shields.io/github/issues/kgryte/github-starred.svg
[github-issues-url]: https://github.com/kgryte/github-starred/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[unix-time]: http://en.wikipedia.org/wiki/Unix_time

[github-get]: https://github.com/kgryte/github-get
[github-starred]: https://developer.github.com/v3/activity/starring/
[github-api]: https://developer.github.com/v3/
[github-token]: https://github.com/settings/tokens/new
[github-oauth2]: https://developer.github.com/v3/#oauth2-token-sent-in-a-header
[github-user-agent]: https://developer.github.com/v3/#user-agent-required
[github-rate-limit]: https://developer.github.com/v3/rate_limit/