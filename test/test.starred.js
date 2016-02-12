'use strict';

// MODULES //

var tape = require( 'tape' );
var assert = require( 'chai' ).assert;
var proxyquire = require( 'proxyquire' );
var get = require( './../lib/starred.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var data = require( './fixtures/results.json' );
var info = require( './fixtures/info.json' );


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof get, 'function', 'export is a function' );
	t.end();
});

tape( 'function returns an error to a provided callback if an error is encountered when fetching a list of starred repositories', function test( t ) {
	var opts;
	var get;

	get = proxyquire( './../lib/starred.js', {
		'./factory.js': factory
	});

	opts = getOpts();
	get( opts, done );

	function factory( opts, clbk ) {
		return function starred() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk({
					'status': 404,
					'message': 'beep'
				});
			}
		};
	}

	function done( error ) {
		t.equal( error.status, 404, 'equal status' );
		t.equal( error.message, 'beep', 'equal message' );
		t.end();
	}
});

tape( 'functions returns response data to a provided callback', function test( t ) {
	var expected;
	var opts;
	var get;

	get = proxyquire( './../lib/starred.js', {
		'./factory.js': factory
	});

	expected = data;

	opts = getOpts();
	get( opts, done );

	function factory( opts, clbk ) {
		return function starred() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( null, data, info );
			}
		};
	}

	function done( error, data ) {
		assert.deepEqual( data, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});

tape( 'function returns rate limit info to a provided callback', function test( t ) {
	var expected;
	var opts;
	var get;

	get = proxyquire( './../lib/starred.js', {
		'./factory.js': factory
	});

	expected = info;

	opts = getOpts();
	get( opts, done );

	function factory( opts, clbk ) {
		return function starred() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( null, data, info );
			}
		};
	}

	function done( error, data, info ) {
		assert.deepEqual( info, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});

tape( 'function supports providing only a `username` option (no authentication)', function test( t ) {
	var expected;
	var opts;
	var get;

	get = proxyquire( './../lib/starred.js', {
		'./factory.js': factory
	});

	expected = data;

	opts = getOpts();
	delete opts.token;

	get( opts, done );

	function factory( opts, clbk ) {
		return function starred() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( null, data, info );
			}
		};
	}

	function done( error, data ) {
		assert.deepEqual( data, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});

tape( 'function supports providing only a `token` option (get the authenticated user\'s starred repos)', function test( t ) {
	var expected;
	var opts;
	var get;

	get = proxyquire( './../lib/starred.js', {
		'./factory.js': factory
	});

	expected = data;

	opts = getOpts();
	delete opts.username;
	
	get( opts, done );

	function factory( opts, clbk ) {
		return function starred() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( null, data, info );
			}
		};
	}

	function done( error, data ) {
		assert.deepEqual( data, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});

tape( 'function supports providing both `token` and `username` options to get another user\'s starred repos (increased rate limits)', function test( t ) {
	var expected;
	var opts;
	var get;

	get = proxyquire( './../lib/starred.js', {
		'./factory.js': factory
	});

	expected = data;

	opts = getOpts();
	opts.token = 'boopbeep';
	opts.username = 'kgryte';
	
	get( opts, done );

	function factory( opts, clbk ) {
		return function starred() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( null, data, info );
			}
		};
	}

	function done( error, data ) {
		assert.deepEqual( data, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});
