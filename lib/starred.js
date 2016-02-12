'use strict';

// MODULES //

var factory = require( './factory.js' );


// STARRED //

/**
* FUNCTION: starred( opts, clbk )
*	Gets a list of repositories a user has starred.
*
* @param {Object} opts - function options
* @param {String} [opts.token] - Github access token
* @param {String} [opts.username] - Github username
* @param {String} [opts.useragent] - user agent string
* @param {String} [opts.sort='created'] - sort method
* @param {String} [opts.direction='desc'] - sort direction
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Void}
*/
function starred( opts, clbk ) {
	factory( opts, clbk )();
} // end FUNCTION starred()


// EXPORTS //

module.exports = starred;
