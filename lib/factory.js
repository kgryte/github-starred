'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' );
var merge = require( 'utils-merge2' );
var request = require( '@kgryte/github-get' ).factory;
var validate = require( './validate.js' );
var defaults = require( './defaults.json' );


// FACTORY //

/**
* FUNCTION: factory( options, clbk )
*	Returns a function for fetching a list of repositories a user has starred.
*
* @param {Object} options - function options
* @param {String} [options.token] - Github access token
* @param {String} [options.username] - Github username
* @param {String} [options.useragent] - user agent string
* @param {String} [options.sort='created'] - sort method
* @param {String} [options.direction='desc'] - sort direction
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Function} function for getting a list of starred repositories
*/
function factory( options, clbk ) {
	var opts;
	var err;
	opts = merge( {}, defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	if ( !isFunction( clbk ) ) {
		throw new TypeError( 'invalid input argument. Callback argument must be a function. Value: `' + clbk + '`.' );
	}
	if (
		opts.token === void 0 &&
		opts.username === void 0
	) {
		throw new Error( 'invalid input argument. Must provide a username or, to get a list of repositories an authenticated user has starred, an access token.' );
	}
	if ( opts.username ) {
		opts.pathname += 'users/' + opts.username + '/';
	} else {
		opts.pathname += 'user/';
	}
	opts.pathname += 'starred';
	opts.query = 'sort=' + opts.sort + '&direction=' + opts.direction;
	delete opts.sort;
	delete opts.direction;

	return request( opts, done );
	/**
	* FUNCTION: done( error, data, info )
	*	Callback invoked after resolving resources.
	*
	* @private
	* @param {Error|Null} error - error object
	* @param {Object[]} data - query data
	* @param {Object} info - response info
	* @returns {Void}
	*/
	function done( error, data, info ) {
		error = error || null;
		data = data || null;
		info = info || null;
		clbk( error, data, info );
	} // end FUNCTION done()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;
