/*!
 * jQuery JavaScript Library v1.11.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-17T15:27Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.2",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement("a");
      originAnchor.href = location.href;
      var urlAnchor = document.createElement("a");

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // Make sure that the browser parses the URL and that the protocols and hosts match.
        return !urlAnchor.protocol || !urlAnchor.host ||
          (originAnchor.protocol + "//" + originAnchor.host !==
            urlAnchor.protocol + "//" + urlAnchor.host);
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on("pageshow.rails", function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data("ujs:enable-with")) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data("ujs:enable-with")) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/* ========================================================================
 * Bootstrap: transition.js v3.1.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition'    : 'transitionend',
      'OTransition'      : 'oTransitionEnd otransitionend',
      'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.1.1
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.1.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal', '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.1.1
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role=menu]' + desc + ', [role=listbox]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).focus()
  }

  function clearMenus(e) {
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu], [role=listbox]', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.1.1
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.1.1
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.1.1
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return
      var that = this;

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.hoverState = null

      var complete = function() {
        that.$element.trigger('shown.bs.' + that.type)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one($.support.transition.end, complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth,
      height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.1.1
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.1.1
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.1.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.1.1
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return this.sliding = false

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })
    this.$element.trigger(e)
    if (e.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid.bs.carousel', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid.bs.carousel') }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid.bs.carousel')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.1.1
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$window.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (this.affixed == 'top') position.top += scrollTop

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({ top: scrollHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(jQuery);












(function() {
  jQuery(function() {
    $("a[rel~=popover], .has-popover").popover();
    return $("a[rel~=tooltip], .has-tooltip").tooltip();
  });

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function () {
    var script = document.createElement("script");

    script.type = "text/javascript";
    script.async = true;
    script.src = "//sd.toneden.io/production/toneden.loader.js";

    var entry = document.getElementsByTagName("script")[0];
    entry.parentNode.insertBefore(script, entry);
}());


function removeSong() {
    $('tr.track-info').append($("<span class='delete-song'><i class='fa fa-times fa-lg'></i></span>"));

    $('.delete-song').click(function (event) {
        event.preventDefault();
        var $index = $(this).closest('.track-info').data('index');
        ToneDen.player.getInstanceByDom("#player").removeTracks($index, 1);
        var songParams = {
            song: {
                song_index: $(this).closest('.track-info').data('index'),
                party_path: window.location.href
            }
        };

        $.ajax({
            type: 'DELETE',
            url: '/api/v1/remove_song',
            data: songParams,
            success: function () {
                alert("succeeded!");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
//                          console.log(xhr.responseText);
//                          console.log(thrownError);
            }
        })
    });

}
;
jQuery(document).ready(function ($) {

    $("#search").keyup(function () {
        var searchData = $("#search").val();

        $('#sc-results').html('');

        SC.get('/tracks', {q: searchData, limit: '6'}, function (tracks) {

            for (var i = 0, len = tracks.length; i < len; i++) {
                $('#sc-results').append(
                    '<br><div>'
                    + "<a class='search-result' href='' data-url='"
                    + tracks[i].permalink_url
                    + "'>"
                    + tracks[i].title
                    + "</a>"
                    + "</div>"
                );
            }

            $('a.search-result').on('click', function () {
                var songParams = {
                    post: {
                        permalink_url: this.getAttribute("data-url"),
                        party_path: window.location.href
                    }
                };

                $.ajax({
                    type: 'POST',
                    url: '/api/v1/add_song',
                    data: songParams,
                    success: function (newSong) {
                        addNewSong(newSong.permalink_url);
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(xhr.responseText);
                        console.log(thrownError);
                    }
                })
            });
        });

        return false;
    });

    function addNewSong(song_url) {
        ToneDen.player.getInstanceByDom("#player").addTracks([song_url]);
    }

});
(function() {


}).call(this);
(function() {


}).call(this);
!function () {
    var t;
    Function && Function.prototype && Function.prototype.bind && (/MSIE [678]/.test(navigator.userAgent) || !function e(t, n, i) {
        function r(s, a) {
            if (!n[s]) {
                if (!t[s]) {
                    var c = "function" == typeof require && require;
                    if (!a && c)return c(s, !0);
                    if (o)return o(s, !0);
                    var u = new Error("Cannot find module '" + s + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var l = n[s] = {exports: {}};
                t[s][0].call(l.exports, function (e) {
                    var n = t[s][1][e];
                    return r(n ? n : e)
                }, l, l.exports, e, t, n, i)
            }
            return n[s].exports
        }

        for (var o = "function" == typeof require && require, s = 0; s < i.length; s++)r(i[s]);
        return r
    }({
        1: [function (e, n, i) {
            (function () {
                "use strict";
                function i(t) {
                    return "function" == typeof t || "object" == typeof t && null !== t
                }

                function r(t) {
                    return "function" == typeof t
                }

                function o(t) {
                    return "object" == typeof t && null !== t
                }

                function s(t) {
                    B = t
                }

                function a(t) {
                    J = t
                }

                function c() {
                    var t = process.nextTick, e = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
                    return Array.isArray(e) && "0" === e[1] && "10" === e[2] && (t = setImmediate), function () {
                        t(f)
                    }
                }

                function u() {
                    return function () {
                        z(f)
                    }
                }

                function l() {
                    var t = 0, e = new Q(f), n = document.createTextNode("");
                    return e.observe(n, {characterData: !0}), function () {
                        n.data = t = ++t % 2
                    }
                }

                function d() {
                    var t = new MessageChannel;
                    return t.port1.onmessage = f, function () {
                        t.port2.postMessage(0)
                    }
                }

                function h() {
                    return function () {
                        setTimeout(f, 1)
                    }
                }

                function f() {
                    for (var t = 0; $ > t; t += 2) {
                        var e = tt[t], n = tt[t + 1];
                        e(n), tt[t] = void 0, tt[t + 1] = void 0
                    }
                    $ = 0
                }

                function p() {
                    try {
                        var t = e, n = t("vertx");
                        return z = n.runOnLoop || n.runOnContext, u()
                    } catch (i) {
                        return h()
                    }
                }

                function m() {
                }

                function g() {
                    return new TypeError("You cannot resolve a promise with itself")
                }

                function v() {
                    return new TypeError("A promises callback cannot return that same promise.")
                }

                function y(t) {
                    try {
                        return t.then
                    } catch (e) {
                        return rt.error = e, rt
                    }
                }

                function w(t, e, n, i) {
                    try {
                        t.call(e, n, i)
                    } catch (r) {
                        return r
                    }
                }

                function b(t, e, n) {
                    J(function (t) {
                        var i = !1, r = w(n, e, function (n) {
                            i || (i = !0, e !== n ? A(t, n) : x(t, n))
                        }, function (e) {
                            i || (i = !0, I(t, e))
                        }, "Settle: " + (t._label || " unknown promise"));
                        !i && r && (i = !0, I(t, r))
                    }, t)
                }

                function _(t, e) {
                    e._state === nt ? x(t, e._result) : e._state === it ? I(t, e._result) : S(e, void 0, function (e) {
                        A(t, e)
                    }, function (e) {
                        I(t, e)
                    })
                }

                function E(t, e) {
                    if (e.constructor === t.constructor)_(t, e); else {
                        var n = y(e);
                        n === rt ? I(t, rt.error) : void 0 === n ? x(t, e) : r(n) ? b(t, e, n) : x(t, e)
                    }
                }

                function A(t, e) {
                    t === e ? I(t, g()) : i(e) ? E(t, e) : x(t, e)
                }

                function T(t) {
                    t._onerror && t._onerror(t._result), D(t)
                }

                function x(t, e) {
                    t._state === et && (t._result = e, t._state = nt, 0 !== t._subscribers.length && J(D, t))
                }

                function I(t, e) {
                    t._state === et && (t._state = it, t._result = e, J(T, t))
                }

                function S(t, e, n, i) {
                    var r = t._subscribers, o = r.length;
                    t._onerror = null, r[o] = e, r[o + nt] = n, r[o + it] = i, 0 === o && t._state && J(D, t)
                }

                function D(t) {
                    var e = t._subscribers, n = t._state;
                    if (0 !== e.length) {
                        for (var i, r, o = t._result, s = 0; s < e.length; s += 3)i = e[s], r = e[s + n], i ? P(n, i, r, o) : r(o);
                        t._subscribers.length = 0
                    }
                }

                function N() {
                    this.error = null
                }

                function C(t, e) {
                    try {
                        return t(e)
                    } catch (n) {
                        return ot.error = n, ot
                    }
                }

                function P(t, e, n, i) {
                    var o, s, a, c, u = r(n);
                    if (u) {
                        if (o = C(n, i), o === ot ? (c = !0, s = o.error, o = null) : a = !0, e === o)return void I(e, v())
                    } else o = i, a = !0;
                    e._state !== et || (u && a ? A(e, o) : c ? I(e, s) : t === nt ? x(e, o) : t === it && I(e, o))
                }

                function R(t, e) {
                    try {
                        e(function (e) {
                            A(t, e)
                        }, function (e) {
                            I(t, e)
                        })
                    } catch (n) {
                        I(t, n)
                    }
                }

                function L(t, e) {
                    var n = this;
                    n._instanceConstructor = t, n.promise = new t(m), n._validateInput(e) ? (n._input = e, n.length = e.length, n._remaining = e.length, n._init(), 0 === n.length ? x(n.promise, n._result) : (n.length = n.length || 0, n._enumerate(), 0 === n._remaining && x(n.promise, n._result))) : I(n.promise, n._validationError())
                }

                function k(t) {
                    return new st(this, t).promise
                }

                function O(t) {
                    function e(t) {
                        A(r, t)
                    }

                    function n(t) {
                        I(r, t)
                    }

                    var i = this, r = new i(m);
                    if (!V(t))return I(r, new TypeError("You must pass an array to race.")), r;
                    for (var o = t.length, s = 0; r._state === et && o > s; s++)S(i.resolve(t[s]), void 0, e, n);
                    return r
                }

                function M(t) {
                    var e = this;
                    if (t && "object" == typeof t && t.constructor === e)return t;
                    var n = new e(m);
                    return A(n, t), n
                }

                function H(t) {
                    var e = this, n = new e(m);
                    return I(n, t), n
                }

                function W() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }

                function U() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                }

                function j(t) {
                    this._id = dt++, this._state = void 0, this._result = void 0, this._subscribers = [], m !== t && (r(t) || W(), this instanceof j || U(), R(this, t))
                }

                function q() {
                    var t;
                    if ("undefined" != typeof global)t = global; else if ("undefined" != typeof self)t = self; else try {
                        t = Function("return this")()
                    } catch (e) {
                        throw new Error("polyfill failed because global object is unavailable in this environment")
                    }
                    var n = t.Promise;
                    (!n || "[object Promise]" !== Object.prototype.toString.call(n.resolve()) || n.cast) && (t.Promise = ht)
                }

                var F;
                F = Array.isArray ? Array.isArray : function (t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                };
                var z, B, G, V = F, $ = 0, J = ({}.toString, function (t, e) {
                    tt[$] = t, tt[$ + 1] = e, $ += 2, 2 === $ && (B ? B(f) : G())
                }), K = "undefined" != typeof window ? window : void 0, Y = K || {}, Q = Y.MutationObserver || Y.WebKitMutationObserver, X = "undefined" != typeof process && "[object process]" === {}.toString.call(process), Z = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel, tt = new Array(1e3);
                G = X ? c() : Q ? l() : Z ? d() : void 0 === K && "function" == typeof e ? p() : h();
                var et = void 0, nt = 1, it = 2, rt = new N, ot = new N;
                L.prototype._validateInput = function (t) {
                    return V(t)
                }, L.prototype._validationError = function () {
                    return new Error("Array Methods must be provided an Array")
                }, L.prototype._init = function () {
                    this._result = new Array(this.length)
                };
                var st = L;
                L.prototype._enumerate = function () {
                    for (var t = this, e = t.length, n = t.promise, i = t._input, r = 0; n._state === et && e > r; r++)t._eachEntry(i[r], r)
                }, L.prototype._eachEntry = function (t, e) {
                    var n = this, i = n._instanceConstructor;
                    o(t) ? t.constructor === i && t._state !== et ? (t._onerror = null, n._settledAt(t._state, e, t._result)) : n._willSettleAt(i.resolve(t), e) : (n._remaining--, n._result[e] = t)
                }, L.prototype._settledAt = function (t, e, n) {
                    var i = this, r = i.promise;
                    r._state === et && (i._remaining--, t === it ? I(r, n) : i._result[e] = n), 0 === i._remaining && x(r, i._result)
                }, L.prototype._willSettleAt = function (t, e) {
                    var n = this;
                    S(t, void 0, function (t) {
                        n._settledAt(nt, e, t)
                    }, function (t) {
                        n._settledAt(it, e, t)
                    })
                };
                var at = k, ct = O, ut = M, lt = H, dt = 0, ht = j;
                j.all = at, j.race = ct, j.resolve = ut, j.reject = lt, j._setScheduler = s, j._setAsap = a, j._asap = J, j.prototype = {
                    constructor: j,
                    then: function (t, e) {
                        var n = this, i = n._state;
                        if (i === nt && !t || i === it && !e)return this;
                        var r = new this.constructor(m), o = n._result;
                        if (i) {
                            var s = arguments[i - 1];
                            J(function () {
                                P(i, r, s, o)
                            })
                        } else S(n, r, t, e);
                        return r
                    },
                    "catch": function (t) {
                        return this.then(null, t)
                    }
                };
                var ft = q, pt = {Promise: ht, polyfill: ft};
                "function" == typeof t && t.amd ? t(function () {
                    return pt
                }) : "undefined" != typeof n && n.exports && (n.exports = pt)
            }).call(this)
        }, {}],
        2: [function (t, e, n) {
            function i(t, e) {
                var n;
                return e = e || s, (n = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.msRequestAnimationFrame || e.oRequestAnimationFrame || function () {
                        e.setTimeout(function () {
                            t(+new Date)
                        }, 1e3 / 60)
                    })(t)
            }

            function r(t, e) {
                return Math.sin(Math.PI / 2 * e) * t
            }

            function o(t, e, n, r, o) {
                function s() {
                    var c = +new Date, u = c - a, l = Math.min(u / n, 1), d = r ? r(e, l) : e * l, h = 1 == l;
                    t(d, h), h || i(s, o)
                }

                var a = +new Date;
                i(s)
            }

            var s = t(16);
            e.exports = {animate: o, requestAnimationFrame: i, easeOut: r}
        }, {16: 16}],
        3: [function (t, e, n) {
            function i() {
                return a.builtUrl(u)
            }

            function r(t) {
                return "dark" === t ? "dark" : "light"
            }

            function o(t, e, n) {
                var i, o;
                return n = r(n), i = s.isRtlLang(e) ? "rtl" : "ltr", o = [t, c.css, n, i, "css"].join("."), a.base() + "/css/" + o
            }

            var s = t(23), a = t(44), c = t(83), u = "embed/timeline.css";
            e.exports = {
                tweet: o.bind(null, "tweet"),
                timeline: i,
                video: o.bind(null, "video"),
                grid: o.bind(null, "grid")
            }
        }, {23: 23, 44: 44, 83: 83}],
        4: [function (t, e, n) {
            function i(t) {
                return {success: !0, resp: t}
            }

            e.exports = i
        }, {}],
        5: [function (t, e, n) {
            function i() {
                return l + d++
            }

            function r(t, e, n, r) {
                var l, d, h;
                return r = r || i(), l = s.fullPath(["callbacks", r]), d = o.createElement("script"), h = new a, e = c.aug({}, e, {
                    callback: l,
                    suppress_response_codes: !0
                }), s.set(["callbacks", r], function (t) {
                    var e, i;
                    e = n(t || !1), t = e.resp, i = e.success, i ? h.resolve(t) : h.reject(t), d.onload = d.onreadystatechange = null, d.parentNode && d.parentNode.removeChild(d), s.unset(["callbacks", r])
                }), d.onerror = function () {
                    h.reject(new Error("failed to fetch " + d.src))
                }, d.src = u.url(t, e), d.async = "async", o.body.appendChild(d), h.promise
            }

            var o = t(13), s = t(20), a = t(71), c = t(80), u = t(74), l = "cb", d = 0;
            e.exports = {fetch: r}
        }, {13: 13, 20: 20, 71: 71, 74: 74, 80: 80}],
        6: [function (t, e, n) {
            function i(t) {
                var e, n;
                return e = t.headers && t.headers.status, n = t && !t.error && 200 === e, !n && t.headers && t.headers.message && r.warn(t.headers.message), {
                    success: n,
                    resp: t
                }
            }

            var r = t(68);
            e.exports = i
        }, {68: 68}],
        7: [function (t, e, n) {
            function i(t) {
                return 10 > t ? "0" + t : t
            }

            function r(t) {
                function e(t, e) {
                    return n && n[t] && (t = n[t]), t.replace(/%\{([\w_]+)\}/g, function (t, n) {
                        return void 0 !== e[n] ? e[n] : t
                    })
                }

                var n = t && t.phrases, o = t && t.months || c, s = t && t.formats || u;
                this.timeAgo = function (t) {
                    var n, i = r.parseDate(t), a = +new Date, c = a - i;
                    return i ? isNaN(c) || 2 * l > c ? e("now") : d > c ? (n = Math.floor(c / l), e(s.abbr, {
                        number: n,
                        symbol: e(p, {abbr: e("s"), expanded: e(n > 1 ? "seconds" : "second")})
                    })) : h > c ? (n = Math.floor(c / d), e(s.abbr, {
                        number: n,
                        symbol: e(p, {abbr: e("m"), expanded: e(n > 1 ? "minutes" : "minute")})
                    })) : f > c ? (n = Math.floor(c / h), e(s.abbr, {
                        number: n,
                        symbol: e(p, {abbr: e("h"), expanded: e(n > 1 ? "hours" : "hour")})
                    })) : 365 * f > c ? e(s.shortdate, {
                        day: i.getDate(),
                        month: e(o[i.getMonth()])
                    }) : e(s.longdate, {
                        day: i.getDate(),
                        month: e(o[i.getMonth()]),
                        year: i.getFullYear().toString().slice(2)
                    }) : ""
                }, this.localTimeStamp = function (t) {
                    var n = r.parseDate(t), a = n && n.getHours();
                    return n ? e(s.full, {
                        day: n.getDate(),
                        month: e(o[n.getMonth()]),
                        year: n.getFullYear(),
                        hours24: i(a),
                        hours12: 13 > a ? a ? a : "12" : a - 12,
                        minutes: i(n.getMinutes()),
                        seconds: i(n.getSeconds()),
                        amPm: e(12 > a ? "AM" : "PM")
                    }) : ""
                }
            }

            var o = /(\d{4})-?(\d{2})-?(\d{2})T(\d{2}):?(\d{2}):?(\d{2})(Z|[\+\-]\d{2}:?\d{2})/, s = /[a-z]{3,4} ([a-z]{3}) (\d{1,2}) (\d{1,2}):(\d{2}):(\d{2}) ([\+\-]\d{2}:?\d{2}) (\d{4})/i, a = /^\d+$/, c = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], u = {
                abbr: "%{number}%{symbol}",
                shortdate: "%{day} %{month}",
                longdate: "%{day} %{month} %{year}",
                full: "%{hours12}:%{minutes} %{amPm} - %{day} %{month} %{year}"
            }, l = 1e3, d = 60 * l, h = 60 * d, f = 24 * h, p = '<abbr title="%{expanded}">%{abbr}</abbr>';
            r.parseDate = function (t) {
                var e, n, i = t || "", r = i.toString();
                return (e = function () {
                    var t;
                    return a.test(r) ? parseInt(r, 10) : (t = r.match(s)) ? Date.UTC(t[7], c.indexOf(t[1]), t[2], t[3], t[4], t[5]) : (t = r.match(o)) ? Date.UTC(t[1], t[2] - 1, t[3], t[4], t[5], t[6]) : void 0
                }()) ? (n = new Date(e), !isNaN(n.getTime()) && n) : !1
            }, e.exports = r
        }, {}],
        8: [function (t, e, n) {
            function i(t) {
                return new RegExp("\\b" + t + "\\b", "g")
            }

            function r(t, e) {
                return t.classList ? void t.classList.add(e) : void(i(e).test(t.className) || (t.className += " " + e))
            }

            function o(t, e) {
                return t.classList ? void t.classList.remove(e) : void(t.className = t.className.replace(i(e), " "))
            }

            function s(t, e, n) {
                return void 0 === n && t.classList && t.classList.toggle ? t.classList.toggle(e, n) : (n ? r(t, e) : o(t, e), n)
            }

            function a(t, e, n) {
                return t.classList && c(t, e) ? (o(t, e), void r(t, n)) : void(t.className = t.className.replace(i(e), n))
            }

            function c(t, e) {
                return t.classList ? t.classList.contains(e) : i(e).test(t.className)
            }

            e.exports = {add: r, remove: o, replace: a, toggle: s, present: c}
        }, {}],
        9: [function (t, e, n) {
            function i(t) {
                var e = t.getAttribute("data-twitter-event-id");
                return e ? e : (t.setAttribute("data-twitter-event-id", ++m), m)
            }

            function r(t, e, n) {
                var i = 0, r = t && t.length || 0;
                for (i = 0; r > i; i++)t[i].call(e, n, e)
            }

            function o(t, e, n) {
                for (var i = n || t.target || t.srcElement, s = i.className.split(" "), a = 0, c = s.length; c > a; a++)r(e["." + s[a]], i, t);
                r(e[i.tagName], i, t), t.cease || i !== this && o.call(this, t, e, i.parentElement || i.parentNode)
            }

            function s(t, e, n, i) {
                function r(i) {
                    o.call(t, i, n[e])
                }

                a(t, r, e, i), t.addEventListener(e, r, !1)
            }

            function a(t, e, n, i) {
                t.id && (g[t.id] = g[t.id] || [], g[t.id].push({el: t, listener: e, type: n, rootId: i}))
            }

            function c(t) {
                var e = g[t];
                e && (e.forEach(function (t) {
                    t.el.removeEventListener(t.type, t.listener, !1), delete p[t.rootId]
                }), delete g[t])
            }

            function u(t, e, n, r) {
                var o = i(t);
                p[o] = p[o] || {}, p[o][e] || (p[o][e] = {}, s(t, e, p[o], o)), p[o][e][n] = p[o][e][n] || [], p[o][e][n].push(r)
            }

            function l(t, e, n) {
                var r = i(e), s = p[r] && p[r];
                o.call(e, {target: n}, s[t])
            }

            function d(t) {
                return f(t), h(t), !1
            }

            function h(t) {
                t && t.preventDefault ? t.preventDefault() : t.returnValue = !1
            }

            function f(t) {
                t && (t.cease = !0) && t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
            }

            var p = {}, m = -1, g = {};
            e.exports = {
                stop: d,
                stopPropagation: f,
                preventDefault: h,
                delegate: u,
                simulate: l,
                removeDelegatesForWidget: c
            }
        }, {}],
        10: [function (t, e, n) {
            function i(t) {
                var e = t.charAt(0);
                return "." === e ? function (e) {
                    var n = e.className ? e.className.split(/\s+/) : [];
                    return o.contains(n, t.slice(1))
                } : "#" === e ? function (e) {
                    return e.id === t.slice(1)
                } : function (e) {
                    return e.tagName === t.toUpperCase()
                }
            }

            function r(t, e, n) {
                var s;
                if (e)return n = n || e && e.ownerDocument, s = o.isType("function", t) ? t : i(t), e === n ? s(e) ? e : void 0 : s(e) ? e : r(s, e.parentNode, n)
            }

            var o = t(80);
            e.exports = {closest: r}
        }, {80: 80}],
        11: [function (t, e, n) {
            function i(t) {
                return t = t || o, t.getSelection && t.getSelection()
            }

            function r(t) {
                var e = i(t);
                return e ? e.toString() : ""
            }

            var o = t(16);
            e.exports = {getSelection: i, getSelectedText: r}
        }, {16: 16}],
        12: [function (t, e, n) {
            function i(t) {
                return t && 1 === t.nodeType ? t.offsetWidth || i(t.parentNode) : 0
            }

            e.exports = {effectiveWidth: i}
        }, {}],
        13: [function (t, e, n) {
            e.exports = document
        }, {}],
        14: [function (t, e, n) {
            e.exports = location
        }, {}],
        15: [function (t, e, n) {
            e.exports = navigator
        }, {}],
        16: [function (t, e, n) {
            e.exports = window
        }, {}],
        17: [function (t, e, n) {
            function i(t, e, n) {
                e.ready = t.then.bind(t), n && Array.isArray(e[n]) && (e[n].forEach(t.then.bind(t)), delete e[n])
            }

            e.exports = {exposeReadyPromise: i}
        }, {}],
        18: [function (t, e, n) {
            function i(t) {
                return a.isType("string", t) ? t.split(".") : a.isType("array", t) ? t : []
            }

            function r(t, e) {
                var n = i(e), r = n.slice(0, -1);
                return r.reduce(function (t, e, n) {
                    if (t[e] = t[e] || {}, !a.isObject(t[e]))throw new Error(r.slice(0, n + 1).join(".") + " is already defined with a value.");
                    return t[e]
                }, t)
            }

            function o(t, e) {
                e = e || s, e[t] = e[t] || {}, Object.defineProperty(this, "base", {value: e[t]}), Object.defineProperty(this, "name", {value: t})
            }

            var s = t(16), a = t(80);
            a.aug(o.prototype, {
                get: function (t) {
                    var e = i(t);
                    return e.reduce(function (t, e) {
                        return a.isObject(t) ? t[e] : void 0
                    }, this.base)
                }, set: function (t, e, n) {
                    var o = i(t), s = r(this.base, t), a = o.slice(-1);
                    return n && a in s ? s[a] : s[a] = e
                }, init: function (t, e) {
                    return this.set(t, e, !0)
                }, unset: function (t) {
                    var e = i(t), n = this.get(e.slice(0, -1));
                    n && delete n[e.slice(-1)]
                }, aug: function (t) {
                    var e = this.get(t), n = a.toRealArray(arguments).slice(1);
                    if (e = "undefined" != typeof e ? e : {}, n.unshift(e), !n.every(a.isObject))throw new Error("Cannot augment non-object.");
                    return this.set(t, a.aug.apply(null, n))
                }, call: function (t) {
                    var e = this.get(t), n = a.toRealArray(arguments).slice(1);
                    if (!a.isType("function", e))throw new Error("Function " + t + "does not exist.");
                    return e.apply(null, n)
                }, fullPath: function (t) {
                    var e = i(t);
                    return e.unshift(this.name), e.join(".")
                }
            }), e.exports = o
        }, {16: 16, 80: 80}],
        19: [function (t, e, n) {
            function i(t) {
                var e, n, i, r = 0;
                for (o = {}, t = t || s, e = t.getElementsByTagName("meta"); n = e[r]; r++)/^twitter:/.test(n.name) && (i = n.name.replace(/^twitter:/, ""), o[i] = n.content)
            }

            function r(t) {
                return o[t]
            }

            var o, s = t(13);
            i(), e.exports = {init: i, val: r}
        }, {13: 13}],
        20: [function (t, e, n) {
            var i = t(18);
            e.exports = new i("__twttr")
        }, {18: 18}],
        21: [function (t, e, n) {
            var i = t(18);
            e.exports = new i("twttr")
        }, {18: 18}],
        22: [function (t, e, n) {
            e.exports = ["hi", "zh-cn", "fr", "zh-tw", "msa", "fil", "fi", "sv", "pl", "ja", "ko", "de", "it", "pt", "es", "ru", "id", "tr", "da", "no", "nl", "hu", "fa", "ar", "ur", "he", "th", "cs", "uk", "vi", "ro", "bn"]
        }, {}],
        23: [function (t, e, n) {
            function i(t) {
                return t = String(t).toLowerCase(), r.contains(o, t)
            }

            var r = t(80), o = ["ar", "fa", "he", "ur"];
            e.exports = {isRtlLang: i}
        }, {80: 80}],
        24: [function (t, e, n) {
            function i(t) {
                var e = ~s.host.indexOf("poptip.com") ? "https://poptip.com" : s.href, n = "original_referer=" + e;
                return [t, n].join(-1 == t.indexOf("?") ? "?" : "&")
            }

            function r(t) {
                var e, n;
                t.altKey || t.metaKey || t.shiftKey || (e = c.closest(function (t) {
                    return "A" === t.tagName || "AREA" === t.tagName
                }, t.target), e && l.isIntentURL(e.href) && (n = i(e.href), n = n.replace(/^http[:]/, "https:"), n = n.replace(/^\/\//, "https://"), u.open(n, e), a.preventDefault(t)))
            }

            function o(t) {
                t.addEventListener("click", r, !1)
            }

            var s = t(14), a = t(9), c = t(10), u = t(53), l = t(76);
            e.exports = {attachTo: o}
        }, {10: 10, 14: 14, 53: 53, 76: 76, 9: 9}],
        25: [function (t, e, n) {
            function i(t) {
                var e = [];
                return h.forIn(t, function (t, n) {
                    e.push(t + "=" + n)
                }), e.join(",")
            }

            function r() {
                return f + d.generate()
            }

            function o(t, e) {
                function n(t) {
                    return Math.round(t / 2)
                }

                return t > e ? {coordinate: 0, size: e} : {coordinate: n(e) - n(t), size: t}
            }

            function s(t, e, n) {
                var r, s;
                e = a.parse(e), n = n || {}, r = o(e.width, n.width || p), e.left = r.coordinate, e.width = r.size, s = o(e.height, n.height || m), e.top = s.coordinate, e.height = s.size, this.win = t, this.features = i(e)
            }

            var a, c = t(16), u = t(69), l = t(76), d = t(78), h = t(80), f = "intent_", p = c.screen.width, m = c.screen.height;
            a = (new u).defaults({
                width: 550,
                height: 520,
                personalbar: "0",
                toolbar: "0",
                location: "1",
                scrollbars: "1",
                resizable: "1"
            }), s.prototype.open = function (t) {
                return l.isTwitterURL(t) ? (this.name = r(), this.popup = this.win.open(t, this.name, this.features), this) : void 0
            }, s.open = function (t, e) {
                var n = new s(c, e);
                return n.open(t)
            }, e.exports = s
        }, {16: 16, 69: 69, 76: 76, 78: 78, 80: 80}],
        26: [function (t, e, n) {
            function i(t) {
                u[t] = +new Date
            }

            function r(t) {
                return u[t] ? +new Date - u[t] : null
            }

            function o(t, e, n, i, o) {
                var a = r(e);
                a && s(t, n, i, a, o)
            }

            function s(t, e, n, i, r) {
                var o, s = void 0 === r ? l : r;
                100 * Math.random() > s || (n = c.aug(n || {}, {duration_ms: i}), o = {
                    page: e,
                    component: "performance",
                    action: t
                }, a.clientEvent(o, n, !0))
            }

            var a = t(39), c = t(80), u = {}, l = 1;
            e.exports = {start: i, end: r, track: s, endAndTrack: o}
        }, {39: 39, 80: 80}],
        27: [function (t, e, n) {
            function i(t) {
                if (!t)throw new Error("JsonRpcClient requires a dispatcher");
                this.idIterator = 0, this.dispatcher = t, this.idPrefix = String(+new Date) + a++
            }

            function r(t) {
                var e = {jsonrpc: s, method: t};
                return arguments.length > 1 && (e.params = [].slice.call(arguments, 1)), e
            }

            var o = t(72), s = "2.0", a = 0;
            i.prototype._generateId = function () {
                return this.idPrefix + this.idIterator++
            }, i.prototype.notify = function () {
                this.dispatcher.send(r.apply(null, arguments))
            }, i.prototype.request = function () {
                var t = r.apply(null, arguments);
                return t.id = this._generateId(), this.dispatcher.send(t).then(function (t) {
                    return "result"in t ? t.result : o.reject(t.error)
                })
            }, e.exports = i
        }, {72: 72}],
        28: [function (t, e, n) {
            e.exports = {
                PARSE_ERROR: {code: -32700, message: "Parse error"},
                INVALID_REQUEST: {code: -32600, message: "Invalid Request"},
                INVALID_PARAMS: {code: -32602, message: "Invalid params"},
                METHOD_NOT_FOUND: {code: -32601, message: "Method not found"},
                INTERNAL_ERROR: {code: -32603, message: "Internal error"}
            }
        }, {}],
        29: [function (t, e, n) {
            function i(t) {
                this.registry = t || {}
            }

            function r(t) {
                return h.isType("string", t) ? JSON.parse(t) : t
            }

            function o(t) {
                var e, n, i;
                return h.isObject(t) ? (e = t.jsonrpc === m, n = h.isType("string", t.method), i = !("id"in t) || s(t.id), e && n && i) : !1
            }

            function s(t) {
                var e, n, i;
                return e = h.isType("string", t), n = h.isType("number", t), i = null === t, e || n || i
            }

            function a(t) {
                return h.isObject(t) && !h.isType("function", t)
            }

            function c(t, e) {
                return {jsonrpc: m, id: t, result: e}
            }

            function u(t, e) {
                return {jsonrpc: m, id: s(t) ? t : null, error: e}
            }

            function l(t) {
                return f.all(t).then(function (t) {
                    return t = t.filter(function (t) {
                        return void 0 !== t
                    }), t.length ? t : void 0
                })
            }

            var d = t(28), h = t(80), f = t(72), p = t(73), m = "2.0";
            i.prototype._invoke = function (t, e) {
                var n, i, r;
                n = this.registry[t.method], i = t.params || [], i = h.isType("array", i) ? i : [i];
                try {
                    r = n.apply(e.source || null, i)
                } catch (o) {
                    r = f.reject(o.message)
                }
                return p.isPromise(r) ? r : f.resolve(r)
            }, i.prototype._processRequest = function (t, e) {
                function n(e) {
                    return c(t.id, e)
                }

                function i() {
                    return u(t.id, d.INTERNAL_ERROR)
                }

                var r;
                return o(t) ? (r = "params"in t && !a(t.params) ? f.resolve(u(t.id, d.INVALID_PARAMS)) : this.registry[t.method] ? this._invoke(t, {source: e}).then(n, i) : f.resolve(u(t.id, d.METHOD_NOT_FOUND)), null != t.id ? r : f.resolve()) : f.resolve(u(t.id, d.INVALID_REQUEST))
            }, i.prototype.attachReceiver = function (t) {
                return t.attachTo(this), this
            }, i.prototype.bind = function (t, e) {
                return this.registry[t] = e, this
            }, i.prototype.receive = function (t, e) {
                var n, i, o, s = this;
                try {
                    t = r(t)
                } catch (a) {
                    return f.resolve(u(null, d.PARSE_ERROR))
                }
                return e = e || null, n = h.isType("array", t), i = n ? t : [t], o = i.map(function (t) {
                    return s._processRequest(t, e)
                }), n ? l(o) : o[0]
            }, e.exports = i
        }, {28: 28, 72: 72, 73: 73, 80: 80}],
        30: [function (t, e, n) {
            function i(t, e, n) {
                var i;
                t && t.postMessage && (m ? i = (n || "") + JSON.stringify(e) : n ? (i = {}, i[n] = e) : i = e, t.postMessage(i, "*"))
            }

            function r(t) {
                return f.isType("string", t) ? t : "JSONRPC"
            }

            function o(t, e) {
                return e ? f.isType("string", t) && 0 === t.indexOf(e) ? t.substring(e.length) : t[e] ? t[e] : void 0 : t
            }

            function s(t, e) {
                var n = t.document;
                this.filter = r(e), this.server = null, this.isTwitterFrame = p.isTwitterURL(n.location.href), t.addEventListener("message", this._onMessage.bind(this), !1)
            }

            function a(t, e) {
                this.pending = {}, this.target = t, this.isTwitterHost = p.isTwitterURL(u.href), this.filter = r(e), l.addEventListener("message", this._onMessage.bind(this), !1)
            }

            function c(t) {
                return arguments.length > 0 && (m = !!t), m
            }

            var u = t(14), l = t(16), d = t(71), h = t(63), f = t(80), p = t(76), m = h.ie9();
            f.aug(s.prototype, {
                _onMessage: function (t) {
                    var e, n = this;
                    this.server && (!this.isTwitterFrame || p.isTwitterURL(t.origin)) && (e = o(t.data, this.filter), e && this.server.receive(e, t.source).then(function (e) {
                        e && i(t.source, e, n.filter)
                    }))
                }, attachTo: function (t) {
                    this.server = t
                }, detach: function () {
                    this.server = null
                }
            }), f.aug(a.prototype, {
                _processResponse: function (t) {
                    var e = this.pending[t.id];
                    e && (e.resolve(t), delete this.pending[t.id])
                }, _onMessage: function (t) {
                    var e;
                    if ((!this.isTwitterHost || p.isTwitterURL(t.origin)) && (e = o(t.data, this.filter))) {
                        if (f.isType("string", e))try {
                            e = JSON.parse(e)
                        } catch (n) {
                            return
                        }
                        e = f.isType("array", e) ? e : [e], e.forEach(this._processResponse.bind(this))
                    }
                }, send: function (t) {
                    var e = new d;
                    return t.id ? this.pending[t.id] = e : e.resolve(), i(this.target, t, this.filter), e.promise
                }
            }), e.exports = {Receiver: s, Dispatcher: a, _stringifyPayload: c}
        }, {14: 14, 16: 16, 63: 63, 71: 71, 76: 76, 80: 80}],
        31: [function (t, e, n) {
            function i(t, e, n, i) {
                var s, u = this;
                this.readyDeferred = new o, this.attrs = t || {}, this.styles = e || {}, this.appender = n || function (t) {
                        r.body.appendChild(t)
                    }, this.layout = i || function (t) {
                        return c.resolve(t())
                    }, this.frame = s = a(this.attrs, this.styles), s.onreadystatechange = s.onload = this.getCallback(this.onLoad), this.layout(function () {
                    u.appender(s)
                })
            }

            var r = t(13), o = t(71), s = t(63), a = t(66), c = t(72), u = t(20), l = 0;
            i.prototype.getCallback = function (t) {
                var e = this, n = !1;
                return function () {
                    n || (n = !0, t.call(e))
                }
            }, i.prototype.registerCallback = function (t) {
                var e = "cb" + l++;
                return u.set(["sandbox", e], t), e
            }, i.prototype.onLoad = function () {
                try {
                    this.document = this.frame.contentWindow.document
                } catch (t) {
                    return void this.setDocDomain()
                }
                this.writeStandardsDoc(), this.readyDeferred.resolve(this)
            }, i.prototype.ready = function () {
                return this.readyDeferred.promise
            }, i.prototype.setDocDomain = function () {
                var t = this, e = a(this.attrs, this.styles), n = this.registerCallback(this.getCallback(this.onLoad));
                e.src = ["javascript:", 'document.write("");', "try { window.parent.document; }", "catch (e) {", 'document.domain="' + r.domain + '";', "}", "window.parent." + u.fullPath(["sandbox", n]) + "();"].join(""), this.layout(function () {
                    t.frame.parentNode.removeChild(t.frame), t.frame = null, t.appender ? t.appender(e) : r.body.appendChild(e), t.frame = e
                })
            }, i.prototype.writeStandardsDoc = function () {
                if (s.anyIE() && !s.cspEnabled()) {
                    var t = ["<!DOCTYPE html>", "<html>", "<head>", "<scr", "ipt>", "try { window.parent.document; }", 'catch (e) {document.domain="' + r.domain + '";}', "</scr", "ipt>", "</head>", "<body></body>", "</html>"].join("");
                    this.document.write(t), this.document.close()
                }
            }, e.exports = i
        }, {13: 13, 20: 20, 63: 63, 66: 66, 71: 71, 72: 72}],
        32: [function (t, e, n) {
            function i() {
                var t, e;
                y = {}, s || (t = a.body.offsetHeight, e = a.body.offsetWidth, (t != b || e != w) && (v.forEach(function (t) {
                    t.dispatchFrameResize(w, b)
                }), b = t, w = e))
            }

            function r(t) {
                var e;
                return t.id ? t.id : (e = t.getAttribute("data-twttr-id")) ? e : (e = "twttr-sandbox-" + g++, t.setAttribute("data-twttr-id", e), e)
            }

            function o(t, e) {
                var n = this;
                l.apply(this, [t, e]), this._resizeHandlers = [], v = v.filter(function (t) {
                    var e = t._frame.parentElement;
                    return e || f.async(function () {
                        p.removeDelegatesForWidget(t._frame.id)
                    }), e
                }), v.push(this), this._win.addEventListener("resize", function () {
                    n.dispatchFrameResize()
                }, !1)
            }

            var s, a = t(13), c = t(16), u = t(31), l = t(33), d = t(63), h = t(72), f = t(80), p = t(9), m = t(8), g = 0, v = [], y = {}, w = 0, b = 0;
            c.addEventListener("resize", i, !1), o.prototype = new l, f.aug(o.prototype, {
                _addStyleSheet: function (t, e, n) {
                    function i() {
                        var t = o._head.children[0];
                        return t ? o._head.insertBefore(s, t) : o._head.appendChild(s)
                    }

                    function r() {
                        return o._head.appendChild(s)
                    }

                    var o = this, s = this._doc.createElement("link");
                    return s.type = "text/css", s.rel = "stylesheet", s.href = t, n && (s.onload = n), this.layout(e ? i : r)
                }, dispatchFrameResize: function () {
                    var t = this._frame.parentNode, e = r(t), n = y[e];
                    s = !0, this._resizeHandlers.length && (n || (n = y[e] = {
                        w: this._frame.offsetWidth,
                        h: this._frame.offsetHeight
                    }), (this._frameWidth != n.w || this._frameHeight != n.h) && (this._frameWidth = n.w, this._frameHeight = n.h, this._resizeHandlers.forEach(function (t) {
                        t(n.w, n.h)
                    }), c.setTimeout(function () {
                        y = {}
                    }, 50)))
                }, addClass: function (t) {
                    var e = this._doc.documentElement;
                    return this.layout(function () {
                        m.add(e, t)
                    })
                }, prependStyleSheet: function (t, e) {
                    return this._addStyleSheet(t, !0, e)
                }, appendStyleSheet: function (t, e) {
                    return this._addStyleSheet(t, !1, e)
                }, removeStyleSheet: function (t) {
                    var e, n = this;
                    return e = 'link[rel="stylesheet"][href="' + t + '"]', this.layout(function () {
                        var t = n._doc.querySelector(e);
                        return t && n._head.removeChild(t)
                    })
                }, appendCss: function (t) {
                    var e, n = this;
                    return d.cspEnabled() ? h.reject("CSP enabled; cannot embed inline styles.") : (e = this._doc.createElement("style"), e.type = "text/css", e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(this._doc.createTextNode(t)), this.layout(function () {
                        return n._head.appendChild(e)
                    }))
                }, style: function (t, e) {
                    var n = this;
                    return this.layout(function () {
                        e && (n._frame.style.cssText = ""), f.forIn(t, function (t, e) {
                            n._frame.style[t] = e
                        })
                    })
                }, onresize: function (t) {
                    this._resizeHandlers.push(t)
                }, width: function (t) {
                    return void 0 !== t && (this._frame.style.width = t + "px"), d.ios() ? Math.min(this._frame.parentNode.offsetWidth, this._frame.offsetWidth) : this._frame.offsetWidth
                }, height: function (t) {
                    return void 0 !== t && (this._frame.height = t), this._frame.offsetHeight
                }, contentHeight: function () {
                    return this._doc.body.firstChild.offsetHeight
                }, hasContent: function () {
                    return !!this._doc.body.firstChild
                }, resizeToContent: function () {
                    var t = this;
                    return this.layout(function () {
                        return t.height(t.contentHeight())
                    })
                }
            }), o.createSandbox = function (t, e, n, i) {
                var r = new u(t, e, n, i);
                return r.ready().then(function (t) {
                    return new o(t.frame, t.layout)
                })
            }, e.exports = o
        }, {13: 13, 16: 16, 31: 31, 33: 33, 63: 63, 72: 72, 8: 8, 80: 80, 9: 9}],
        33: [function (t, e, n) {
            function i(t, e) {
                t && (this._frame = t, this._win = t.contentWindow, this._doc = this._win.document, this._body = this._doc.body, this._head = this._body.parentNode.children[0], this.layout = e, this.root = this._doc.documentElement, this.root.className = "SandboxRoot")
            }

            var r = t(31), o = t(80);
            o.aug(i.prototype, {
                createElement: function (t) {
                    return this._doc.createElement(t)
                }, createDocumentFragment: function () {
                    return this._doc.createDocumentFragment()
                }, appendChild: function (t) {
                    var e = this;
                    return this.layout(function () {
                        return e._body.appendChild(t)
                    })
                }, setBaseTarget: function (t) {
                    var e = this, n = this._doc.createElement("base");
                    return n.target = t, this.layout(function () {
                        return e._head.appendChild(n)
                    })
                }, setTitle: function (t) {
                    t && (this._frame.title = t)
                }, element: function () {
                    return this._frame
                }, document: function () {
                    return this._doc
                }
            }), i.createSandbox = function (t, e, n, o) {
                var s = new r(t, e, n, o);
                return s.ready().then(function (t) {
                    return new i(t.frame, t.layout)
                })
            }, e.exports = i
        }, {31: 31, 80: 80}],
        34: [function (t, e, n) {
            function i(t, e) {
                u[t.id] = e
            }

            function r(t) {
                l[t.id] = t
            }

            function o(t) {
                return u[t]
            }

            function s(t) {
                var e = l[t];
                return e && e.element
            }

            function a(t) {
                return o(t) || s(t)
            }

            function c() {
                l = {}
            }

            var u = {}, l = {};
            e.exports = {add: i, addClassic: r, getSandboxElement: a, resetClassic: c}
        }, {}],
        35: [function (t, e, n) {
            function i() {
                return l.formatGenericEventData("syndicated_impression", {})
            }

            function r() {
                c("tweet")
            }

            function o() {
                c("timeline")
            }

            function s() {
                c("video")
            }

            function a() {
                c("partnertweet")
            }

            function c(t) {
                d.isHostPageSensitive() || h[t] || (h[t] = !0, u.scribe(l.formatClientEventNamespace({
                    page: t,
                    action: "impression"
                }), i(), l.AUDIENCE_ENDPOINT))
            }

            var u = t(39), l = t(40), d = t(75), h = {};
            e.exports = {
                scribeAudienceImpression: c,
                scribePartnerTweetAudienceImpression: a,
                scribeTweetAudienceImpression: r,
                scribeTimelineAudienceImpression: o,
                scribeVideoAudienceImpression: s
            }
        }, {39: 39, 40: 40, 75: 75}],
        36: [function (t, e, n) {
            function i(t) {
                return t ? (t = Array.isArray(t) ? t : [t], t.reduce(function (t, e) {
                    var n = e.getAttribute("data-tweet-id"), i = e.getAttribute("data-rendered-tweet-id") || n;
                    return n === i ? t[i] = {item_type: r.TWEET} : n && (t[i] = {
                        item_type: r.RETWEET,
                        target_type: r.TWEET,
                        target_id: n
                    }), t
                }, {})) : {}
            }

            var r = t(38);
            e.exports = i
        }, {38: 38}],
        37: [function (t, e, n) {
            function i() {
                return x ? I.promise : (m.createSandbox({id: "rufous-sandbox"}, {display: "none"}).then(function (t) {
                    h = t, l = c(), d = u(), I.resolve([l, d])
                }), x = !0, I.promise)
            }

            function r(t, e) {
                var n, i, r;
                w.isObject(t) && w.isObject(e) && (r = y.flattenClientEventPayload(t, e), n = l.firstChild, n.value = +(+n.value || r.dnt || 0), i = h.createElement("input"), i.type = "hidden", i.name = "l", i.value = y.stringify(r), l.appendChild(i))
            }

            function o(t, e, n) {
                var i = !w.isObject(t), o = e ? !w.isObject(e) : !1;
                i || o || I.promise.then(function () {
                    r(y.formatClientEventNamespace(t), y.formatClientEventData(e, n))
                })
            }

            function s() {
                return I.promise.then(function () {
                    if (l.children.length <= 2)return v.reject();
                    var t = v.all([h.appendChild(l), h.appendChild(d)]).then(function (t) {
                        var e = t[0], n = t[1];
                        return n.addEventListener("load", function () {
                            a(e, n)(), b.get("events").trigger("logFlushed")
                        }), e.submit(), t
                    });
                    return l = c(), d = u(), t
                })
            }

            function a(t, e) {
                return function () {
                    var n = t.parentNode;
                    n && (n.removeChild(t), n.removeChild(e))
                }
            }

            function c() {
                var t = h.createElement("form"), e = h.createElement("input"), n = h.createElement("input");
                return T++, t.action = y.CLIENT_EVENT_ENDPOINT, t.method = "POST", t.target = E + T, t.id = A + T, e.type = "hidden", e.name = "dnt", e.value = p.enabled(), n.type = "hidden", n.name = "tfw_redirect", n.value = y.RUFOUS_REDIRECT, t.appendChild(e), t.appendChild(n), t
            }

            function u() {
                var t = E + T;
                return f({id: t, name: t, width: 0, height: 0, border: 0}, {display: "none"}, h.document())
            }

            var l, d, h, f = t(66), p = t(62), m = t(33), g = t(71), v = t(72), y = t(40), w = t(80), b = t(21), _ = Math.floor(1e3 * Math.random()) + "_", E = "rufous-frame-" + _ + "-", A = "rufous-form-" + _ + "-", T = 0, x = !1, I = new g;
            e.exports = {clientEvent: o, flush: s, init: i}
        }, {21: 21, 33: 33, 40: 40, 62: 62, 66: 66, 71: 71, 72: 72, 80: 80}],
        38: [function (t, e, n) {
            e.exports = {TWEET: 0, RETWEET: 10, CUSTOM_TIMELINE: 17}
        }, {}],
        39: [function (t, e, n) {
            function i(t, e, n) {
                return r(t, e, n, 2)
            }

            function r(t, e, n, i) {
                var r = !p.isObject(t), o = e ? !p.isObject(e) : !1;
                r || o || s(f.formatClientEventNamespace(t), f.formatClientEventData(e, n, i), f.CLIENT_EVENT_ENDPOINT)
            }

            function o(t, e, n, i) {
                var o = f.extractTermsFromDOM(t.target || t.srcElement);
                o.action = i || "click", r(o, e, n)
            }

            function s(t, e, n) {
                var i, r;
                n && p.isObject(t) && p.isObject(e) && (i = f.flattenClientEventPayload(t, e), r = {l: f.stringify(i)}, i.dnt && (r.dnt = 1), l(h.url(n, r)))
            }

            function a(t, e, n, i) {
                var r, o = !p.isObject(t), s = e ? !p.isObject(e) : !1;
                if (!o && !s)return r = f.flattenClientEventPayload(f.formatClientEventNamespace(t), f.formatClientEventData(e, n, i)), c(r)
            }

            function c(t) {
                return g.push(t), g
            }

            function u() {
                var t, e, n = h.url(f.CLIENT_EVENT_ENDPOINT, {dnt: 0, l: ""}), i = encodeURIComponent(n).length;
                return g.length > 1 && a({
                    page: "widgets_js",
                    component: "scribe_pixel",
                    action: "batch_log"
                }, {}), t = g, g = [], e = t.reduce(function (e, n, r) {
                    var o, s, a = e.length, c = a && e[a - 1], u = r + 1 == t.length;
                    return u && n.event_namespace && "batch_log" == n.event_namespace.action && (n.message = ["entries:" + r, "requests:" + a].join("/")), o = f.stringify(n), s = encodeURIComponent(o).length + 3, i + s > m ? e : ((!c || c.urlLength + s > m) && (c = {
                        urlLength: i,
                        items: []
                    }, e.push(c)), c.urlLength += s, c.items.push(o), e)
                }, []), e.map(function (t) {
                    var e = {l: t.items};
                    return d.enabled() && (e.dnt = 1), l(h.url(f.CLIENT_EVENT_ENDPOINT, e))
                })
            }

            function l(t) {
                var e = new Image;
                return e.src = t
            }

            var d = t(62), h = t(74), f = t(40), p = t(80), m = 2083, g = [];
            e.exports = {
                _enqueueRawObject: c,
                scribe: s,
                clientEvent: r,
                clientEvent2: i,
                enqueueClientEvent: a,
                flushClientEvents: u,
                interaction: o
            }
        }, {40: 40, 62: 62, 74: 74, 80: 80}],
        40: [function (t, e, n) {
            function i(t, e) {
                var n;
                return e = e || {}, t && t.nodeType === Node.ELEMENT_NODE ? ((n = t.getAttribute("data-scribe")) && n.split(" ").forEach(function (t) {
                    var n = t.trim().split(":"), i = n[0], r = n[1];
                    i && r && !e[i] && (e[i] = r)
                }), i(t.parentNode, e)) : e
            }

            function r(t) {
                return d.aug({
                    client: "tfw"
                }, t || {})
            }

            function o(t, e, n) {
                var i = t && t.widget_origin || u.referrer;
                return t = s("tfw_client_event", t, i), t.client_version = p, t.format_version = void 0 !== n ? n : 1, e || (t.widget_origin = i), t
            }

            function s(t, e, n) {
                return e = e || {}, d.aug({}, e, {
                    _category_: t,
                    triggered_on: e.triggered_on || +new Date,
                    dnt: l.enabled(n)
                })
            }

            function a(t, e) {
                return d.aug({}, e, {event_namespace: t})
            }

            function c(t) {
                var e, n = Array.prototype.toJSON;
                return delete Array.prototype.toJSON, e = JSON.stringify(t), n && (Array.prototype.toJSON = n), e
            }

            var u = t(13), l = t(62), d = t(80), h = t(82), f = t(20), p = h.version, m = f.get("endpoints.rufous") || "https://syndication.twitter.com/i/jot", g = f.get("endpoints.rufousAudience") || "https://syndication.twitter.com/i/jot/syndication", v = f.get("endpoints.rufousRedirect") || "https://platform.twitter.com/jot.html";
            e.exports = {
                extractTermsFromDOM: i,
                flattenClientEventPayload: a,
                formatGenericEventData: s,
                formatClientEventData: o,
                formatClientEventNamespace: r,
                stringify: c,
                AUDIENCE_ENDPOINT: g,
                CLIENT_EVENT_ENDPOINT: m,
                RUFOUS_REDIRECT: v
            }
        }, {13: 13, 20: 20, 62: 62, 80: 80, 82: 82}],
        41: [function (t, e, n) {
            function i(t, e, n, i) {
                return t = t || [], n = n || {}, function () {
                    var r, o, c, l, d = Array.prototype.slice.apply(arguments, [0, t.length]), h = Array.prototype.slice.apply(arguments, [t.length]);
                    return h.forEach(function (t) {
                        return t ? 1 === t.nodeType ? void(c = t) : s.isType("function", t) ? void(r = t) : void(s.isType("object", t) && (o = t)) : void 0
                    }), d.length != t.length || 0 === h.length ? (r && s.async(function () {
                        r(!1)
                    }), a.reject("Not enough parameters")) : c ? (o = s.aug(o || {}, n), o.targetEl = c, t.forEach(function (t) {
                        o[t] = d.shift()
                    }), l = new e(o), u.doLayout(), l.render(), i && i(), r && l.completed().then(r, function () {
                        r(!1)
                    }), l.completed()) : (r && s.async(function () {
                        r(!1)
                    }), a.reject("No target specified"))
                }
            }

            function r(t) {
                var e;
                t.linkColor = t.linkColor || t.previewParams.link_color, t.theme = t.theme || t.previewParams.theme, t.height = t.height || t.previewParams.height, e = new p(t), this.render = e.render.bind(e), this.completed = e.completed.bind(e)
            }

            var o = t(16), s = t(80), a = t(72), c = t(76), u = t(50), l = t(56), d = t(52), h = t(51), f = t(57), p = t(55), m = i(["url"], l, {type: "share"}), g = i(["hashtag"], l, {type: "hashtag"}), v = i(["screenName"], l, {type: "mention"}), y = i(["screenName"], d), w = i(["tweetId"], h, {}, h.fetchAndRender), b = i(["tweetId"], f, {}, f.fetchAndRender), _ = i(["widgetId"], p), E = i(["previewParams"], r), A = {
                createShareButton: m,
                createMentionButton: v,
                createHashtagButton: g,
                createFollowButton: y,
                createTweet: w,
                createVideo: b,
                createTweetEmbed: w,
                createTimeline: _
            };
            c.isTwitterURL(o.location.href) && (A.createTimelinePreview = E), e.exports = A
        }, {16: 16, 50: 50, 51: 51, 52: 52, 55: 55, 56: 56, 57: 57, 72: 72, 76: 76, 80: 80}],
        42: [function (t, e, n) {
            function i(t, e) {
                var n = u.connect({
                    src: t,
                    iframe: {name: e, style: "position:absolute;top:-9999em;width:10px;height:10px"}
                });
                return l(n).expose({
                    trigger: function (t, e, n) {
                        e = e || {};
                        var i = e.region;
                        delete e.region, h.get("events").trigger(t, {
                            target: f.getSandboxElement(n),
                            data: e,
                            region: i,
                            type: t
                        })
                    }, initXPHub: function () {
                        o(!0)
                    }
                }), n
            }

            function r(t) {
                return t ? d.secureHubId : d.contextualHubId
            }

            function o(t) {
                var e = c.base(t) + "/widgets/hub.9192a585a56fcc7a63116950f3203cad.html", n = r(t);
                if (!a.getElementById(n))return i(e, n)
            }

            function s(t, e) {
                var n = u.connect({window: {width: 550, height: 450}, src: t});
                l(n).expose({
                    trigger: function (t, n) {
                        h.get("events").trigger(t, {target: e, region: "intent", type: t, data: n})
                    }
                })
            }

            var a = t(13), c = t(44), u = t(91), l = t(90), d = t(81), h = t(21), f = t(34);
            e.exports = {init: o, openIntent: s}
        }, {13: 13, 21: 21, 34: 34, 44: 44, 81: 81, 90: 90, 91: 91}],
        43: [function (t, e, n) {
            function i() {
                return o !== o.top ? r.request(d).then(function (t) {
                    s.rootDocumentLocation(t.url), t.dnt && a.setOn()
                }) : void 0
            }

            var r, o = t(16), s = t(60), a = t(62), c = t(29), u = t(27), l = t(30), d = "twttr.private.requestArticleUrl", h = "twttr.article";
            o === o.top ? (new c).attachReceiver(new l.Receiver(o, h)).bind(d, function () {
                return {url: s.rootDocumentLocation(), dnt: a.enabled()}
            }) : r = new u(new l.Dispatcher(o.top, h)), e.exports = {requestArticleUrl: i}
        }, {16: 16, 27: 27, 29: 29, 30: 30, 60: 60, 62: 62}],
        44: [function (t, e, n) {
            function i(t, e) {
                var n, i = u[t];
                return "embed/timeline.css" === t && c.contains(o.href, "localhost.twitter.com") ? "/node_modules/syndication-templates/lib/css/index.css" : (n = a.retina() ? "2x" : "default", e && (n += ".rtl"), r() + "/" + i[n])
            }

            function r(t) {
                var e = s.get("host");
                return l(t) + "://" + e
            }

            var o = t(14), s = t(20), a = t(63), c = t(80), u = {
                "embed/timeline.css": {
                    "default": "embed/timeline.b67ffafa652943d0ebac45e422e410f7.default.css",
                    "2x": "embed/timeline.b67ffafa652943d0ebac45e422e410f7.2x.css",
                    gif: "embed/timeline.b67ffafa652943d0ebac45e422e410f7.gif.css",
                    "default.rtl": "embed/timeline.b67ffafa652943d0ebac45e422e410f7.default.rtl.css",
                    "2x.rtl": "embed/timeline.b67ffafa652943d0ebac45e422e410f7.2x.rtl.css",
                    "gif.rtl": "embed/timeline.b67ffafa652943d0ebac45e422e410f7.gif.rtl.css"
                }
            }, l = function () {
                return /^http\:$/.test(o.protocol) ? function (t) {
                    return t ? "https" : "http"
                } : function () {
                    return "https"
                }
            }();
            e.exports = {builtUrl: i, base: r}
        }, {14: 14, 20: 20, 63: 63, 80: 80}],
        45: [function (t, e, n) {
            var i = t(14), r = t(20), o = t(80), s = t(5), a = t(4), c = t(6), u = {}, l = o.aug({
                tweets: "https://syndication.twitter.com/tweets.json",
                timeline: "https://cdn.syndication.twimg.com/widgets/timelines/",
                timelinePoll: "https://syndication.twitter.com/widgets/timelines/paged/",
                timelinePreview: "https://syndication.twitter.com/widgets/timelines/preview/",
                videos: "https://syndication.twitter.com/widgets/video/"
            }, r.get("endpoints") || {});
            u.tweets = function (t) {
                var e = {ids: t.ids.join(","), lang: t.lang, new_html: !0};
                return s.fetch(l.tweets, e, a)
            }, u.videos = function (t) {
                return s.fetch(l.videos, {ids: t.ids.join(","), lang: t.lang}, a)
            }, u.timeline = function (t) {
                var e = "tl_" + t.id + "_" + t.instanceId, n = 9e5, r = Math.floor(+new Date / n), a = {
                    lang: t.lang,
                    t: r,
                    domain: i.host,
                    dnt: t.dnt,
                    override_type: t.overrideType,
                    override_id: t.overrideId,
                    override_name: t.overrideName,
                    override_owner_id: t.overrideOwnerId,
                    override_owner_name: t.overrideOwnerName,
                    with_replies: t.withReplies
                };
                return o.compact(a), s.fetch(l.timeline + t.id, a, c, e)
            }, u.timelinePoll = function (t) {
                var e = t.sinceId || t.maxId || t.maxPosition || t.minPosition, n = "tlPoll_" + t.id + "_" + t.instanceId + "_" + e, r = {
                    lang: t.lang,
                    since_id: t.sinceId,
                    max_id: t.maxId,
                    min_position: t.minPosition,
                    max_position: t.maxPosition,
                    domain: i.host,
                    dnt: t.dnt,
                    override_type: t.overrideType,
                    override_id: t.overrideId,
                    override_name: t.overrideName,
                    override_owner_id: t.overrideOwnerId,
                    override_owner_name: t.overrideOwnerName,
                    with_replies: t.withReplies
                };
                return o.compact(r), s.fetch(l.timelinePoll + t.id, r, c, n)
            }, u.timelinePreview = function (t) {
                return s.fetch(l.timelinePreview, t.params, c)
            }, e.exports = u
        }, {14: 14, 20: 20, 4: 4, 5: 5, 6: 6, 80: 80}],
        46: [function (t, e, n) {
            function i() {
                var t = 36e5, e = s.combined(o)._;
                return void 0 !== r ? r : (r = !1, e && /^\d+$/.test(e) && (r = +new Date - parseInt(e) < t), r)
            }

            var r, o = t(14), s = t(70);
            e.exports = {isDynamicWidget: i}
        }, {14: 14, 70: 70}],
        47: [function (t, e, n) {
            function i(t) {
                var e = t.split(" ");
                this.url = decodeURIComponent(e[0].trim()), this.width = +e[1].replace(/w$/, "").trim()
            }

            function r(t, e, n) {
                var r, o, s, a;
                if (t = p.devicePixelRatio ? t * p.devicePixelRatio : t, o = e.split(",").map(function (t) {
                        return new i(t.trim())
                    }), n)for (a = 0; a < o.length; a++)o[a].url === n && (r = o[a]);
                return s = o.reduce(function (e, n) {
                    return n.width < e.width && n.width >= t ? n : e
                }, o[0]), r && r.width > s.width ? r : s
            }

            function o(t, e) {
                var n, i = t.getAttribute("data-srcset"), o = t.src;
                i && (n = r(e, i, o), t.src = n.url)
            }

            function s(t, e) {
                e = void 0 !== e ? !!e : g.retina(), m.toRealArray(t.getElementsByTagName("IMG")).forEach(function (t) {
                    var n = t.getAttribute("data-src-1x") || t.getAttribute("src"), i = t.getAttribute("data-src-2x");
                    e && i ? t.src = i : n && (t.src = n)
                })
            }

            function a(t, e, n) {
                t && (m.toRealArray(t.querySelectorAll(".NaturalImage-image")).forEach(function (t) {
                    n(function () {
                        o(t, e)
                    })
                }), m.toRealArray(t.querySelectorAll(".CroppedImage-image")).forEach(function (t) {
                    n(function () {
                        o(t, e / 2)
                    })
                }), m.toRealArray(t.querySelectorAll("img.autosized-media")).forEach(function (t) {
                    n(function () {
                        o(t, e), t.removeAttribute("width"), t.removeAttribute("height")
                    })
                }))
            }

            function c(t, e, n, i) {
                t && ((g.ios() || g.android()) && m.toRealArray(t.querySelectorAll(".FilledIframe")).forEach(function (t) {
                    i(function () {
                        d(t, {width: t.offsetWidth, height: t.offsetHeight})
                    })
                }), m.toRealArray(t.querySelectorAll("iframe.autosized-media")).forEach(function (t) {
                    var r = l(t.getAttribute("data-width"), t.getAttribute("data-height"), y.effectiveWidth(t.parentElement) || e, n);
                    i(function () {
                        t.width = r.width, t.height = r.height, d(t, r)
                    })
                }))
            }

            function u(t, e, n, i) {
                a(t, e, i), c(t, e, n, i)
            }

            function l(t, e, n, i, r, o) {
                return n = n || t, i = i || e, r = r || 0, o = o || 0, t > n && (e *= n / t, t = n), e > i && (t *= i / e, e = i), r > t && (e *= r / t, t = r), o > e && (t *= o / e, e = o), {
                    width: Math.floor(t),
                    height: Math.floor(e)
                }
            }

            function d(t, e) {
                function n() {
                    var t = {name: "tfw:resize", dimensions: e};
                    r.postMessage(t, "*")
                }

                var i, r, o, s, a;
                t && (r = t.contentWindow, i = t.ownerDocument && t.ownerDocument.defaultView, o = g.ios() || g.android(), s = v.isTwitterURL(t.src), a = r && g.canPostMessage(r), o && s && a && (n(), i && i.addEventListener("message", function (t) {
                    "tfw:requestsize" === t.data && n()
                }, !1)))
            }

            function h(t, e, n, i) {
                m.toRealArray(t.querySelectorAll(e)).forEach(function (t) {
                    var e = t.getAttribute("style") || t.getAttribute("data-style"), r = i.test(e) && RegExp.$1;
                    r && (t.setAttribute("data-csp-fix", !0), t.style[n] = r)
                })
            }

            function f(t) {
                g.cspEnabled() && (h(t, ".MediaCard-widthConstraint", "maxWidth", w), h(t, ".MediaCard-mediaContainer", "paddingBottom", E), h(t, ".CroppedImage-image", "top", b), h(t, ".CroppedImage-image", "left", _))
            }

            var p = t(16), m = t(80), g = t(63), v = t(76), y = t(12), w = /max-width:\s*([\d\.]+px)/, b = /top:\s*(\-?[\d\.]+%)/, _ = /left:\s*(\-?[\d\.]+%)/, E = /padding-bottom:\s*([\d\.]+%)/;
            e.exports = {
                scaleDimensions: l,
                retinize: s,
                setSrcForImgs: a,
                sizeIframes: c,
                constrainMedia: u,
                fixMediaCardLayout: f,
                __setSrcFromSet: o
            }
        }, {12: 12, 16: 16, 63: 63, 76: 76, 80: 80}],
        48: [function (t, e, n) {
            var i = t(74), r = t(76);
            e.exports = function (t, e) {
                return function (n) {
                    var o, s, a = "data-tw-params";
                    if (n && r.isTwitterURL(n.href) && !n.getAttribute(a)) {
                        if (n.setAttribute(a, !0), "function" == typeof e) {
                            o = e.call(this, n);
                            for (s in o)o.hasOwnProperty(s) && (t[s] = o[s])
                        }
                        n.href = i.url(n.href, t)
                    }
                }
            }
        }, {74: 74, 76: 76}],
        49: [function (t, e, n) {
            function i(t) {
                (new o).attachReceiver(new s.Receiver(r, "twttr.resize")).bind("twttr.private.resizeButton", function (e) {
                    var n = c(this), i = n && n.id, r = a.asInt(e.width), o = a.asInt(e.height);
                    i && r && o && t(i, r, o)
                })
            }

            var r = t(16), o = t(29), s = t(30), a = t(77), c = t(65);
            e.exports = i
        }, {16: 16, 29: 29, 30: 30, 65: 65, 77: 77}],
        50: [function (t, e, n) {
            function i(t) {
                var e;
                t && (t.ownerDocument ? (this.srcEl = t, this.classAttr = t.className.split(" ")) : (this.srcOb = t, this.classAttr = []), e = this.params(), this.id = this.generateId(), this.setLanguage(), this.related = e.related || this.dataAttr("related"), this.partner = e.partner || this.dataAttr("partner") || y.val("partner"), this.styleAttr = [], this.targetEl = t.targetEl, g.asBoolean(e.dnt || this.dataAttr("dnt")) && w.setOn(), this.add(this), this.completeDeferred = new d, this.completed().then(function (t) {
                    t && t != a.body && E.get("events").trigger("rendered", {target: t})
                }))
            }

            function r() {
                S.forEach(function (t) {
                    t()
                }), i.doLayout()
            }

            function o(t) {
                return t ? t.lang ? t.lang : o(t.parentNode) : void 0
            }

            var s, a = t(13), c = t(16), u = t(44), l = t(26), d = t(71), h = t(66), f = t(67), p = t(72), m = t(74), g = t(77), v = t(80), y = t(19), w = t(62), b = t(68), _ = t(60), E = t(21), A = t(22), T = t(34), x = 0, I = {}, S = [], D = new f, N = "data-twttr-rendered";
            v.aug(i.prototype, {
                setLanguage: function (t) {
                    var e;
                    return t || (t = this.params().lang || this.dataAttr("lang") || o(this.srcEl)), (t = t && t.toLowerCase()) ? v.contains(A, t) ? this.lang = t : (e = t.replace(/[\-_].*/, ""), v.contains(A, e) ? this.lang = e : void(this.lang = "en")) : this.lang = "en"
                }, ringo: function (t, e, n) {
                    return n = n || /\{\{([\w_]+)\}\}/g, t.replace(n, function (t, n) {
                        return void 0 !== e[n] ? e[n] : t
                    })
                }, makeIframeSource: function () {
                    if (this.iframeSource) {
                        var t = m.encode(this.widgetUrlParams());
                        return [u.base(), "/", this.ringo(this.iframeSource, {lang: this.lang}), "#", t].join("")
                    }
                }, add: function (t) {
                    I[this.id] = t, T.addClassic(t)
                }, create: function (t, e) {
                    var n, i = this;
                    return e[N] = !0, n = h(v.aug({
                        id: this.id,
                        src: t,
                        "class": this.classAttr.join(" ")
                    }, e), {
                        position: "absolute",
                        visibility: "hidden"
                    }, this.targetEl && this.targetEl.ownerDocument), this.srcEl ? this.layout(function () {
                        return i.srcEl.parentNode.replaceChild(n, i.srcEl), n
                    }) : this.targetEl ? this.layout(function () {
                        return i.targetEl.appendChild(n), n
                    }) : p.reject("Did not append widget")
                }, setInitialSize: function (t, e) {
                    var n = this, i = this.element;
                    return i ? void this.layout(function () {
                        n.width = t, n.height = e, i.style.width = t + "px", i.style.height = e + "px", i.style.position = "static", i.style.visibility = "visible"
                    }).then(function () {
                        n.completeDeferred.resolve(i)
                    }) : !1
                }, params: function () {
                    var t, e;
                    return this.srcOb ? e = this.srcOb : (t = this.srcEl && this.srcEl.href && this.srcEl.href.split("?")[1], e = t ? m.decode(t) : {}), this.params = function () {
                        return e
                    }, e
                }, widgetUrlParams: function () {
                    return {}
                }, dataAttr: function (t) {
                    return this.srcEl && this.srcEl.getAttribute("data-" + t)
                }, attr: function (t) {
                    return this.srcEl && this.srcEl.getAttribute(t)
                }, layout: function (t) {
                    return D.enqueue(t)
                }, generateId: function () {
                    return this.srcEl && this.srcEl.id || "twitter-widget-" + x++
                }, completed: function () {
                    return this.completeDeferred ? this.completeDeferred.promise : void 0
                }
            }), i.afterLoad = function (t) {
                S.push(t)
            }, i.doLayout = function () {
                D.exec()
            }, i.doLayoutAsync = function () {
                D.delayedExec()
            }, i.init = function (t) {
                s = t
            }, i.reset = function () {
                I = {}, T.resetClassic()
            }, i.findInstance = function (t) {
                return t && I[t] ? I[t] : null
            }, i.embed = function (t) {
                var e = [], n = [], o = [];
                g.isArray(t) || (t = [t || a]), b.time("sandboxes"), t.forEach(function (t) {
                    v.forIn(s, function (n, i) {
                        var r = t.querySelectorAll(n);
                        v.toRealArray(r).forEach(function (t) {
                            var n;
                            t.getAttribute(N) || (t.setAttribute(N, "true"), n = new i(t), e.push(n), o.push(n.sandboxCreated))
                        })
                    })
                }), p.all(o).then(function () {
                    b.timeEnd("sandboxes")
                }), i.doLayout(), e.forEach(function (t) {
                    n.push(t.completed()), t.render()
                }), p.all(n).then(function (t) {
                    t = t.filter(function (t) {
                        return t
                    }), t.length && (E.get("events").trigger("loaded", {widgets: t}), b.timeEnd("load"))
                }).then(i.trackRender), i.doLayoutAsync(), r()
            }, i.trackRender = function () {
                l.endAndTrack("render", "widgets-js-load", "page", {
                    widget_origin: _.rootDocumentLocation(),
                    widget_frame: _.isFramed() && _.currentDocumentLocation()
                })
            }, c.setInterval(function () {
                i.doLayout()
            }, 500), e.exports = i
        }, {
            13: 13,
            16: 16,
            19: 19,
            21: 21,
            22: 22,
            26: 26,
            34: 34,
            44: 44,
            60: 60,
            62: 62,
            66: 66,
            67: 67,
            68: 68,
            71: 71,
            72: 72,
            74: 74,
            77: 77,
            80: 80
        }],
        51: [function (t, e, n) {
            function i(t, e) {
                var n = t.querySelector("blockquote.subject"), i = t.querySelector("blockquote.reply"), r = n && n.getAttribute("data-tweet-id"), o = i && i.getAttribute("data-tweet-id"), s = {}, a = {};
                r && (s[r] = {item_type: 0}, A.clientEvent({
                    page: "tweet",
                    section: "subject",
                    component: "tweet",
                    action: "results"
                }, w.aug({}, e, {
                    item_ids: [r],
                    item_details: s
                }), !0), E.scribeTweetAudienceImpression(), o && (a[o] = {item_type: 0}, A.clientEvent({
                    page: "tweet",
                    section: "conversation",
                    component: "tweet",
                    action: "results"
                }, w.aug({}, e, {
                    item_ids: [o],
                    item_details: a,
                    associations: {4: {association_id: r, association_type: 4}}
                }), !0)))
            }

            function r(t, e) {
                var n = {};
                t && (n[t] = {item_type: 0}, A.clientEvent({
                    page: "tweet",
                    section: "subject",
                    component: "rawembedcode",
                    action: "no_results"
                }, {
                    widget_origin: x.rootDocumentLocation(),
                    widget_frame: x.isFramed() && x.currentDocumentLocation(),
                    message: e,
                    item_ids: [t],
                    item_details: n
                }, !0), E.scribeTweetAudienceImpression())
            }

            function o(t, e, n, i) {
                P[t] = P[t] || [], P[t].push({s: n, f: i, lang: e})
            }

            function s(t) {
                if (t) {
                    var e, n, i;
                    d.apply(this, [t]), e = this.params(), n = this.srcEl && this.srcEl.getElementsByTagName("A"), i = n && n[n.length - 1], this.hideThread = "none" == (e.conversation || this.dataAttr("conversation")) || w.contains(this.classAttr, "tw-hide-thread"), this.hideCard = "hidden" == (e.cards || this.dataAttr("cards")) || w.contains(this.classAttr, "tw-hide-media"), "left" == (e.align || this.attr("align")) || w.contains(this.classAttr, "tw-align-left") ? this.align = "left" : "right" == (e.align || this.attr("align")) || w.contains(this.classAttr, "tw-align-right") ? this.align = "right" : ("center" == (e.align || this.attr("align")) || w.contains(this.classAttr, "tw-align-center")) && (this.align = "center", this.containerWidth > this.dimensions.MIN_WIDTH * (1 / .7) && this.width > .7 * this.containerWidth && (this.width = .7 * this.containerWidth)), this.narrow = e.narrow || this.width <= this.dimensions.NARROW_WIDTH, this.tweetId = e.tweetId || i && b.status(i.href)
                }
            }

            var a = t(3), c = t(16), u = t(11), l = t(50), d = t(54), h = t(7), f = t(48), p = t(8), m = t(10), g = t(26), v = t(72), y = t(73), w = t(80), b = t(76), _ = t(45), E = t(35), A = t(37), T = t(47), x = t(60), I = t(84), S = t(21), D = t(9), N = t(39), C = "tweetembed", P = {}, R = [];
            s.prototype = new d, w.aug(s.prototype, {
                renderedClassNames: "twitter-tweet twitter-tweet-rendered",
                dimensions: {
                    DEFAULT_HEIGHT: "0",
                    DEFAULT_WIDTH: "500",
                    NARROW_WIDTH: "350",
                    maxHeight: "375",
                    FULL_BLEED_PHOTO_MAX_HEIGHT: "600",
                    MIN_WIDTH: "220",
                    MIN_HEIGHT: "0",
                    MARGIN: "10px 0",
                    WIDE_MEDIA_PADDING: 32,
                    NARROW_MEDIA_PADDING: 32,
                    BORDERS: 0
                },
                linkColorSelectors: ["a", "a:visited"],
                linkStateColorSelectors: ["a:hover", "a:focus", "a:active"],
                bgColorSelectors: [],
                borderColorSelectors: [],
                styleSheetUrl: a.tweet,
                addSiteStylesPrefix: function (t) {
                    return t
                },
                onStyleSheetLoad: function () {
                    var t = this;
                    this.sandbox.hasContent() && (l.doLayoutAsync(), this.sandbox.resizeToContent().then(function (e) {
                        t.height = e
                    }))
                },
                scribeCardShown: function (t) {
                    var e, n;
                    e = {
                        page: "tweet",
                        component: "card",
                        action: "shown"
                    }, n = {card_details: {card_name: t.getAttribute("data-card-name")}}, N.clientEvent2(e, n, !1)
                },
                loadCardCss: function (t) {
                    function e() {
                        r && (l.doLayoutAsync(), n.sandbox.resizeToContent().then(function (t) {
                            n.height = t
                        }))
                    }

                    var n = this, i = t && t.getAttribute("data-css"), r = !1;
                    i && (w.toRealArray(t.querySelectorAll("img")).forEach(function (t) {
                        t.addEventListener("load", e, !1)
                    }), this.sandbox.prependStyleSheet(i, function () {
                        p.add(t, "is-ready"), n.scribeCardShown(t), l.doLayoutAsync(), n.sandbox.resizeToContent().then(function (t) {
                            r = !0, n.height = t
                        })
                    }))
                },
                create: function (t) {
                    var e, n, r, o = this, s = this.sandbox.createElement("div");
                    return s.innerHTML = t, (e = s.children[0] || !1) ? ("dark" == this.theme && this.classAttr.push("thm-dark"), this.linkColor && this.addSiteStyles(), p.present(e, "media-forward") && (this.fullBleedPhoto = !0, this.dimensions.maxHeight = this.dimensions.FULL_BLEED_PHOTO_MAX_HEIGHT), n = e.querySelector(".GifPlayer"), n && (this.gifPlayer = new I({
                        rootEl: n,
                        videoEl: n.querySelector(".GifPlayer-video"),
                        playButtonEl: n.querySelector(".GifPlayer-playButton"),
                        fallbackUrl: this.extractPermalinkUrl(this.getTweetElement(e))
                    })), T.retinize(e), T.fixMediaCardLayout(e), e.id = this.id, e.className += " " + this.classAttr.join(" "), e.lang = this.lang, this.sandbox.setTitle(e.getAttribute("data-iframe-title") || "Tweet"), this.loadCardCss(e.querySelector(".PrerenderedCard")), this.sandbox.appendChild(e).then(function () {
                        o.renderedDeferred.resolve(o.sandbox)
                    }), r = this.layout(function () {
                        o.predefinedWidth = o.width, o.width = o.sandbox.width(o.width), o.collapseRegions()
                    }), r.then(function () {
                        o.constrainMedia(e, o.contentWidth(o.width)), o.setNarrow().then(function () {
                            o.layout(function () {
                                o.completeDeferred.resolve(o.sandbox.element())
                            })
                        })
                    }), i(e, this.baseScribeData(), this.partner), e) : void 0
                },
                render: function () {
                    var t = this, e = "", n = this.tweetId;
                    return n ? (this.hideCard && (e += "c"), this.hideThread && (e += "t"), e && (n += "-" + e), this.rendered().then(function (e) {
                        var n = t.srcEl;
                        n && n.parentNode && t.layout(function () {
                            n && n.parentNode && n.parentNode.removeChild(n)
                        }), "center" == t.align ? e.style({
                            margin: "7px auto",
                            cssFloat: "none"
                        }) : t.align && (t.width == t.dimensions.DEFAULT_WIDTH && (t.predefinedWidth = t.width = t.dimensions.NARROW_WIDTH), e.style({cssFloat: t.align})), t.sandbox.resizeToContent().then(function (e) {
                            return t.height = e, l.doLayoutAsync(), t.sandbox.resizeToContent().then(function (e) {
                                t.height = e
                            })
                        }).then(function () {
                            e.onresize(t.handleResize.bind(t))
                        }), e.style({position: "static", visibility: "visible"}), l.doLayoutAsync()
                    }), o(n, this.lang, function (e) {
                        t.ready().then(function () {
                            t.element = t.create(e), t.readTimestampTranslations(), t.updateTimeStamps(), t.bindIntentHandlers(), t.bindUIHandlers(), t.bindPermalinkHandler(), l.doLayoutAsync()
                        })
                    }, function () {
                        r(t.tweetId, t.partner), t.completeDeferred.resolve(t.srcEl)
                    }), R.push(this.completed()), this.completed().then(this.scribePerformance.bind(this)), this.completed()) : (this.completeDeferred.resolve(this.srcEl), this.completed())
                },
                bindPermalinkHandler: function () {
                    var t = this;
                    D.delegate(this.element, "click", "A", function (t) {
                        D.stopPropagation(t)
                    }), D.delegate(this.element, "click", ".twitter-tweet", function (e) {
                        var n = t.getTweetElement();
                        u.getSelectedText(t.sandbox._win) || (t.openPermalink(n), t.scribePermalinkClick(n, e), D.stopPropagation(e))
                    })
                },
                scribePermalinkClick: function (t, e) {
                    var n = this.createScribeData(t);
                    N.interaction(e, n, !1)
                },
                getTweetElement: function (t) {
                    var e;
                    return t = t || this.element, t ? (e = t.querySelectorAll("blockquote.tweet"), e[e.length - 1]) : void 0
                },
                extractPermalinkUrl: function (t) {
                    var e = t && t.cite;
                    return b.isStatus(e) && e
                },
                openPermalink: function (t) {
                    var e = this.extractPermalinkUrl(t);
                    e && c.open(e)
                },
                scribePerformance: function () {
                    g.endAndTrack("render", "widgets-js-load", "tweet", this.baseScribeData())
                },
                addUrlParams: function (t) {
                    var e = this, n = {
                        related: this.related,
                        partner: this.partner,
                        original_referer: x.rootDocumentLocation(),
                        tw_p: C
                    };
                    return this.addUrlParams = f(n, function (t) {
                        var n = m.closest(".tweet", t, e.element);
                        return {tw_i: n.getAttribute("data-tweet-id")}
                    }), this.addUrlParams(t)
                },
                baseScribeData: function () {
                    return {
                        widget_origin: x.rootDocumentLocation(),
                        widget_frame: x.isFramed() && x.currentDocumentLocation(),
                        message: this.partner
                    }
                },
                handleResize: function (t) {
                    var e = this;
                    t != this.width && (this.width = t, this.setNarrow(), this.constrainMedia(this.element, this.contentWidth(t)), this.collapseRegions(), this.sandbox.resizeToContent().then(function (t) {
                        e.height = t, S.get("events").trigger("resize", {target: e.sandbox.element()})
                    }), l.doLayoutAsync())
                },
                readTimestampTranslations: function () {
                    var t = this.element, e = "data-dt-", n = t.getAttribute(e + "months") || "";
                    this.datetime = new h(w.compact({
                        phrases: {
                            AM: t.getAttribute(e + "am"),
                            PM: t.getAttribute(e + "pm")
                        }, months: n.split("|"), formats: {full: t.getAttribute(e + "full")}
                    }))
                },
                updateTimeStamps: function () {
                    var t = this.element.querySelector(".long-permalink"), e = t.getAttribute("data-datetime"), n = e && this.datetime.localTimeStamp(e), i = t.getElementsByTagName("TIME")[0];
                    n && (this.layout(function () {
                        return i && i.innerHTML ? void(i.innerHTML = n) : void(t.innerHTML = n)
                    }, "Update Timestamp"), l.doLayoutAsync())
                }
            }), s.fetchAndRender = function () {
                function t(t) {
                    w.forIn(t, function (t, e) {
                        var n = i[t];
                        n.forEach(function (t) {
                            t.s && t.s.call(this, e)
                        }), delete i[t]
                    }), l.doLayout(), w.forIn(i, function (t, e) {
                        e.forEach(function (e) {
                            e.f && e.f.call(this, t)
                        })
                    }), l.doLayout()
                }

                var e, n, i = P, r = [];
                if (P = {}, i.keys)r = i.keys(); else for (e in i)i.hasOwnProperty(e) && r.push(e);
                r.length && (A.init(), n = i[r[0]][0].lang, y.always(_.tweets({
                    ids: r.sort(),
                    lang: n
                }), t), v.all(R).then(function () {
                    A.flush()
                }), R = [])
            }, l.afterLoad(s.fetchAndRender), e.exports = s
        }, {
            10: 10,
            11: 11,
            16: 16,
            21: 21,
            26: 26,
            3: 3,
            35: 35,
            37: 37,
            39: 39,
            45: 45,
            47: 47,
            48: 48,
            50: 50,
            54: 54,
            60: 60,
            7: 7,
            72: 72,
            73: 73,
            76: 76,
            8: 8,
            80: 80,
            84: 84,
            9: 9
        }],
        52: [function (t, e, n) {
            function i(t) {
                if (t) {
                    var e, n, i, r;
                    s.apply(this, [t]), e = this.params(), n = e.size || this.dataAttr("size"), i = e.showScreenName || this.dataAttr("show-screen-name"), r = e.count || this.dataAttr("count"), this.classAttr.push("twitter-follow-button"), this.showScreenName = "false" != i, this.showCount = !(e.showCount === !1 || "false" == this.dataAttr("show-count")), "none" == r && (this.showCount = !1), this.explicitWidth = e.width || this.dataAttr("width") || "", this.screenName = e.screen_name || e.screenName || a.screenName(this.attr("href")), this.preview = e.preview || this.dataAttr("preview") || "", this.align = e.align || this.dataAttr("align") || "", this.size = "large" == n ? "l" : "m"
                }
            }

            var r = t(62), o = t(80), s = t(50), a = t(76), c = t(72);
            i.prototype = new s, o.aug(i.prototype, {
                iframeSource: "widgets/follow_button.ae36744a06482b14f4c1ab8ab6ea765e.{{lang}}.html",
                widgetUrlParams: function () {
                    return o.compact({
                        screen_name: this.screenName,
                        lang: this.lang,
                        show_count: this.showCount,
                        show_screen_name: this.showScreenName,
                        align: this.align,
                        id: this.id,
                        preview: this.preview,
                        size: this.size,
                        partner: this.partner,
                        dnt: r.enabled(),
                        _: +new Date
                    })
                },
                render: function () {
                    if (!this.screenName)return c.reject("Missing Screen Name");
                    var t = this, e = this.makeIframeSource(), n = this.create(e, {title: "Twitter Follow Button"}).then(function (e) {
                        return t.element = e
                    });
                    return n
                }
            }), e.exports = i
        }, {50: 50, 62: 62, 72: 72, 76: 76, 80: 80}],
        53: [function (t, e, n) {
            function i(t) {
                u.open(t)
            }

            function r(e, n) {
                var i = t(42);
                i.openIntent(e, n)
            }

            function o(t, e) {
                c.isTwitterURL(t) && (d.get("eventsHub") && e ? (h.add(a.generate(), e), r(t, e), l.get("events").trigger("click", {
                    target: e,
                    region: "intent",
                    type: "click",
                    data: {}
                })) : i(t))
            }

            function s(t) {
                this.srcEl = [], this.element = t
            }

            var a = t(78), c = t(76), u = t(25), l = t(21), d = t(20), h = t(34);
            s.open = o, e.exports = s
        }, {20: 20, 21: 21, 25: 25, 34: 34, 42: 42, 76: 76, 78: 78}],
        54: [function (t, e, n) {
            function i() {
                s = r.VALID_COLOR.test(h.val("widgets:link-color")) && RegExp.$1, c = r.VALID_COLOR.test(h.val("widgets:border-color")) && RegExp.$1, a = h.val("widgets:theme")
            }

            function r(t) {
                if (t) {
                    var e, n = this;
                    this.readyDeferred = new A, this.renderedDeferred = new A, l.apply(this, [t]), e = this.params(), this.targetEl = this.srcEl && this.srcEl.parentNode || e.targetEl || u.body, this.predefinedWidth = r.VALID_UNIT.test(e.width || this.attr("width")) && RegExp.$1, this.layout(function () {
                        return n.containerWidth = b.effectiveWidth(n.targetEl)
                    }).then(function (t) {
                        var i = n.predefinedWidth || t || n.dimensions.DEFAULT_WIDTH;
                        n.height = r.VALID_UNIT.test(e.height || n.attr("height")) && RegExp.$1, n.width = Math.max(n.dimensions.MIN_WIDTH, Math.min(i, n.dimensions.DEFAULT_WIDTH))
                    }), r.VALID_COLOR.test(e.linkColor || this.dataAttr("link-color")) ? this.linkColor = RegExp.$1 : this.linkColor = s, r.VALID_COLOR.test(e.borderColor || this.dataAttr("border-color")) ? this.borderColor = RegExp.$1 : this.borderColor = c, this.theme = e.theme || this.attr("data-theme") || a, this.theme = /(dark|light)/.test(this.theme) ? this.theme : "", T.ie9() && this.classAttr.push("ie9"), this.sandboxCreated = _.createSandbox({
                        "class": this.renderedClassNames,
                        id: this.id,
                        allowfullscreen: ""
                    }, {position: "absolute", visibility: "hidden"}, function (t) {
                        n.modifyFrame && (t = n.modifyFrame(t)), n.srcEl ? n.targetEl.insertBefore(t, n.srcEl) : n.targetEl.appendChild(t)
                    }, this.layout).then(function (t) {
                        n.setupSandbox(t), new g(t.element().contentWindow)
                    }), this.rendered().then(function (t) {
                        n.applyVisibleSandboxStyles(t)
                    })
                }
            }

            function o(t, e) {
                return t + e
            }

            var s, a, c, u = t(13), l = t(50), d = t(53), h = t(19), f = t(47), p = t(39), m = t(36), g = t(86), v = t(8), y = t(10), w = t(9), b = t(12), _ = t(32), E = t(58), A = t(71), T = t(63), x = t(72), I = t(76), S = t(77), D = t(80), N = t(73), C = [".timeline-header h1.summary", ".timeline-header h1.summary a:link", ".timeline-header h1.summary a:visited"];
            r.prototype = new l, D.aug(r.prototype, {
                dimensions: {},
                linkColorSelectors: [".customisable", ".customisable:link", ".customisable:visited"],
                linkStateColorSelectors: [".customisable:hover", ".customisable:focus", ".customisable:active", ".customisable-highlight:hover", ".customisable-highlight:focus", "a:hover .customisable-highlight", "a:focus .customisable-highlight"],
                bgColorSelectors: ["a:hover .ic-mask", "a:focus .ic-mask"],
                borderColorSelectors: [".customisable-border"],
                styleSheetUrl: function () {
                    throw new Error("must set styleSheetUrl")
                },
                onStyleSheetLoad: function () {
                },
                setupSandbox: function (t) {
                    var e, n, i = this;
                    this.sandbox = t, T.ios() && v.add(this.sandbox.root, "env-ios"), T.touch() && v.add(this.sandbox.root, "is-touch"), e = this.styleSheetUrl(this.lang, this.theme), n = this.onStyleSheetLoad.bind(this), N.some([i.applyInitialSandboxStyles(t), t.appendCss(".SandboxRoot { display:none }"), t.setBaseTarget("_blank"), t.appendStyleSheet(e, n)]).then(function () {
                        i.readyDeferred.resolve(t)
                    })
                },
                ready: function () {
                    return this.readyDeferred.promise
                },
                rendered: function () {
                    return this.renderedDeferred.promise
                },
                contentWidth: function (t) {
                    var e = this.dimensions, n = this.borderless ? 0 : e.BORDERS, i = this.fullBleedPhoto ? 0 : this.chromeless && this.narrow ? e.NARROW_MEDIA_PADDING_CL : this.chromeless ? e.WIDE_MEDIA_PADDING_CL : this.narrow ? e.NARROW_MEDIA_PADDING : e.WIDE_MEDIA_PADDING;
                    return (t || this.width) - (i + n)
                },
                applyInitialSandboxStyles: function (t) {
                    var e = this;
                    return t.style({
                        border: "none",
                        maxWidth: "100%",
                        minWidth: e.dimensions.MIN_WIDTH + "px",
                        margin: e.dimensions.MARGIN,
                        padding: "0",
                        display: "block",
                        position: "absolute",
                        visibility: "hidden"
                    }, !0)
                },
                applyVisibleSandboxStyles: function (t) {
                    return t.style({position: "static", visibility: "visible"})
                },
                addSiteStylesPrefix: function (t) {
                    return ("dark" == this.theme ? ".thm-dark " : "") + t
                },
                addSiteStyles: function () {
                    var t = [], e = this.addSiteStylesPrefix.bind(this);
                    return this.headingStyle && t.push(C.map(e).join(",") + "{" + this.headingStyle + "}"), this.linkColor && (t.push(this.linkColorSelectors.map(e).join(",") + "{color:" + this.linkColor + "}"), t.push(this.bgColorSelectors.map(e).join(",") + "{background-color:" + this.linkColor + "}"), t.push(this.linkStateColorSelectors.map(e).join(",") + "{color:" + E.lighten(this.linkColor, .2) + "}")), this.borderColor && t.push(this.borderColorSelectors.map(e).concat("dark" == this.theme ? [".thm-dark.customisable-border"] : []).join(",") + "{border-color:" + this.borderColor + "}"), t.length ? this.sandbox.appendCss(t.join("")) : void 0
                },
                setNarrow: function () {
                    var t = this, e = this.narrow;
                    return this.narrow = this.width < this.dimensions.NARROW_WIDTH, e != this.narrow ? this.layout(function () {
                        v.toggle(t.sandbox.root, "env-narrow", t.narrow)
                    }) : x.resolve(this.narrow)
                },
                createScribeData: function (t) {
                    var e = D.aug({}, this.baseScribeData(), {
                        item_ids: [],
                        item_details: this.extractTweetScribeDetails(t)
                    });
                    return D.forIn(e.item_details, function (t) {
                        e.item_ids.push(t)
                    }), e
                },
                bindUIHandlers: function () {
                    var t = this.element;
                    w.delegate(t, "click", ".MediaCard-dismissNsfw", function () {
                        var e = y.closest(".MediaCard", this, t);
                        v.remove(e, "is-nsfw")
                    })
                },
                bindIntentHandlers: function () {
                    function t(t) {
                        var i = y.closest(".tweet", this, n), r = e.createScribeData(i);
                        p.interaction(t, r, !0)
                    }

                    var e = this, n = this.element;
                    w.delegate(n, "click", "A", t), w.delegate(n, "click", "BUTTON", t), w.delegate(n, "click", ".profile", function () {
                        e.addUrlParams(this)
                    }), w.delegate(n, "click", ".follow-button", function (t) {
                        var n;
                        t.altKey || t.metaKey || t.shiftKey || T.ios() || T.android() || S.asBoolean(this.getAttribute("data-age-gate")) || (n = I.intentForFollowURL(this.href, !0), n && (d.open(n, e.sandbox.element()), w.preventDefault(t)))
                    }), w.delegate(n, "click", ".web-intent", function (t) {
                        e.addUrlParams(this), t.altKey || t.metaKey || t.shiftKey || (d.open(this.href, e.sandbox.element()), w.preventDefault(t))
                    })
                },
                baseScribeData: function () {
                    return {}
                },
                extractTweetScribeDetails: m,
                constrainMedia: function (t, e, n) {
                    return f.constrainMedia(t || this.element, e || this.contentWidth(), this.dimensions.maxHeight, n || this.layout)
                },
                collapseRegions: function () {
                    var t = this;
                    D.toRealArray(this.element.querySelectorAll(".collapsible-container")).forEach(function (e) {
                        var n, i, r = D.toRealArray(e.children), s = r.length && e.offsetWidth, a = r.length && r.map(function (t) {
                                return t.offsetWidth
                            }), c = r.length;
                        if (r.length)for (; c > 0;) {
                            if (c--, n = a.reduce(o, 0), !s || !n)return;
                            if (s > n)return;
                            i = r[c].getAttribute("data-collapsed-class"), i && (v.add(t.element, i), a[c] = r[c].offsetWidth)
                        }
                    })
                }
            }), r.VALID_UNIT = /^([0-9]+)( ?px)?$/, r.VALID_COLOR = /^(#(?:[0-9a-f]{3}|[0-9a-f]{6}))$/i, i(), e.exports = r
        }, {
            10: 10,
            12: 12,
            13: 13,
            19: 19,
            32: 32,
            36: 36,
            39: 39,
            47: 47,
            50: 50,
            53: 53,
            58: 58,
            63: 63,
            71: 71,
            72: 72,
            73: 73,
            76: 76,
            77: 77,
            8: 8,
            80: 80,
            86: 86,
            9: 9
        }],
        55: [function (t, e, n) {
            function i(t) {
                if (t) {
                    var e, n, i, r, o, s, c, u;
                    a.apply(this, [t]), e = this.params(), n = (e.chrome || this.dataAttr("chrome") || "").split(" "), this.preview = e.previewParams, this.widgetId = e.widgetId || this.dataAttr("widget-id"), this.instanceId = ++B, this.cursors = {
                        maxPosition: 0,
                        minPosition: 0
                    }, (r = e.screenName || this.dataAttr("screen-name")) || (o = e.userId || this.dataAttr("user-id")) ? this.override = {
                        overrideType: "user",
                        overrideId: o,
                        overrideName: r,
                        withReplies: y.asBoolean(e.showReplies || this.dataAttr("show-replies")) ? "true" : "false"
                    } : (r = e.favoritesScreenName || this.dataAttr("favorites-screen-name")) || (o = e.favoritesUserId || this.dataAttr("favorites-user-id")) ? this.override = {
                        overrideType: "favorites",
                        overrideId: o,
                        overrideName: r
                    } : ((r = e.listOwnerScreenName || this.dataAttr("list-owner-screen-name")) || (o = e.listOwnerId || this.dataAttr("list-owner-id"))) && ((s = e.listId || this.dataAttr("list-id")) || (c = e.listSlug || this.dataAttr("list-slug"))) ? this.override = {
                        overrideType: "list",
                        overrideOwnerId: o,
                        overrideOwnerName: r,
                        overrideId: s,
                        overrideName: c
                    } : (u = e.customTimelineId || this.dataAttr("custom-timeline-id")) ? this.override = {
                        overrideType: "custom",
                        overrideId: u
                    } : this.override = {}, this.tweetLimit = y.asInt(e.tweetLimit || this.dataAttr("tweet-limit")), this.staticTimeline = this.tweetLimit > 0, n.length && (i = w.contains(n, "none"), this.chromeless = i || w.contains(n, "transparent"), this.headerless = i || w.contains(n, "noheader"), this.footerless = i || w.contains(n, "nofooter"), this.borderless = i || w.contains(n, "noborders"), this.noscrollbar = w.contains(n, "noscrollbar")), this.headingStyle = g.sanitize(e.headingStyle || this.dataAttr("heading-style"), void 0, !0), this.classAttr.push("twitter-timeline-rendered"), this.ariaPolite = e.ariaPolite || this.dataAttr("aria-polite")
                }
            }

            var r = t(16), o = t(3), s = t(50), a = t(54), c = t(7), u = t(2), l = t(26), d = t(45), h = t(47), f = t(35), p = t(37), m = t(48), g = t(59), v = t(63), y = t(77), w = t(80), b = t(9), _ = t(8), E = t(10), A = t(62), T = t(60), x = t(21), I = t(20), S = t(38), D = {
                CLIENT_SIDE_USER: 0, CLIENT_SIDE_APP: 2
            }, N = ".timeline", C = ".new-tweets-bar", P = ".timeline-header", R = ".timeline-footer", L = ".stream", k = ".h-feed", O = ".tweet", M = ".detail-expander", H = ".expand", W = ".permalink", U = ".no-more-pane", j = "expanded", q = "pending-scroll-in", F = "pending-new-tweet-display", z = "pending-new-tweet", B = 0;
            i.prototype = new a, w.aug(i.prototype, {
                renderedClassNames: "twitter-timeline twitter-timeline-rendered",
                dimensions: {
                    DEFAULT_HEIGHT: "600",
                    DEFAULT_WIDTH: "520",
                    NARROW_WIDTH: "320",
                    maxHeight: "375",
                    MIN_WIDTH: "180",
                    MIN_HEIGHT: "200",
                    MARGIN: "0",
                    WIDE_MEDIA_PADDING: 81,
                    NARROW_MEDIA_PADDING: 16,
                    WIDE_MEDIA_PADDING_CL: 60,
                    NARROW_MEDIA_PADDING_CL: 12,
                    BORDERS: 2
                },
                styleSheetUrl: o.timeline,
                create: function (t) {
                    var e, n, i, r, o = this, s = this.sandbox.createElement("div"), a = [];
                    return s.innerHTML = t.body, (e = s.children[0] || !1) ? (this.reconfigure(t.config), this.discardStaticOverflow(e), this.sandbox.setTitle(e.getAttribute("data-iframe-title") || "Timeline"), h.retinize(e), this.constrainMedia(e), this.searchQuery = e.getAttribute("data-search-query"), this.profileId = e.getAttribute("data-profile-id"), this.timelineType = e.getAttribute("data-timeline-type"), this.collectionId = e.getAttribute("data-collection-id"), r = this.getTweetDetails(s.querySelector(k)), w.forIn(r, function (t) {
                        a.push(t)
                    }), i = this.baseScribeData(), i.item_ids = a, i.item_details = r, this.collectionId && (i.item_ids.push(this.collectionId), i.item_details[this.collectionId] = {item_type: S.CUSTOM_TIMELINE}), this.timelineType && p.clientEvent({
                        page: this.timelineType + "_timeline",
                        component: "timeline",
                        element: "initial",
                        action: a.length ? "results" : "no_results"
                    }, i, !0), p.clientEvent({
                        page: "timeline",
                        component: "timeline",
                        element: "initial",
                        action: a.length ? "results" : "no_results"
                    }, i, !0), f.scribeTimelineAudienceImpression(), p.flush(), "assertive" == this.ariaPolite && (n = e.querySelector(C), n.setAttribute("aria-polite", "assertive")), e.id = this.id, e.className += " " + this.classAttr.join(" "), e.lang = this.lang, this.ready().then(function (t) {
                        t.appendChild(e).then(function () {
                            o.renderedDeferred.resolve(o.sandbox)
                        }), t.style({display: "inline-block"}), o.layout(function () {
                            o.srcEl && o.srcEl.parentNode && o.srcEl.parentNode.removeChild(o.srcEl), o.predefinedWidth = o.width, o.predefinedHeight = o.height, o.width = t.width(o.width), o.height = t.height(o.height)
                        }).then(function () {
                            o.setNarrow(), o.sandbox.onresize(o.handleResize.bind(o)), o.completeDeferred.resolve(o.sandbox.element())
                        })
                    }), e) : void 0
                },
                render: function () {
                    var t = this;
                    return this.preview || this.widgetId ? (this.staticTimeline ? this.rendered().then(function (t) {
                        t.resizeToContent(), s.doLayoutAsync()
                    }) : this.rendered().then(function () {
                        t.recalculateStreamHeight(), s.doLayoutAsync()
                    }), this.preview ? this.getPreviewTimeline() : this.getTimeline(), this.completed().then(this.scribePerformance.bind(this)), this.completed()) : (this.completeDeferred.reject(400), this.completed())
                },
                scribePerformance: function () {
                    l.endAndTrack("render", "widgets-js-load", "timeline", this.baseScribeData())
                },
                getPreviewTimeline: function () {
                    function t(t) {
                        n.ready().then(function () {
                            n.element = n.create(t), n.readTranslations(), n.bindInteractions(), n.updateCursors(t.headers, {initial: !0}), s.doLayoutAsync()
                        })
                    }

                    function e(t) {
                        return t && t.headers ? void n.completeDeferred.reject(t.headers.status) : void n.completeDeferred.resolve(n.srcEl)
                    }

                    var n = this;
                    d.timelinePreview({params: this.preview}).then(t, e)
                },
                getTimeline: function () {
                    function t(t) {
                        n.ready().then(function () {
                            n.element = n.create(t), n.readTranslations(), n.bindInteractions(), n.updateTimeStamps(), n.updateCursors(t.headers, {initial: !0}), t.headers.xPolling && /\d/.test(t.headers.xPolling) && (n.pollInterval = 1e3 * t.headers.xPolling), n.staticTimeline || n.schedulePolling(), s.doLayoutAsync()
                        })
                    }

                    function e(t) {
                        return t && t.headers ? void n.completeDeferred.reject(t.headers.status) : void n.completeDeferred.resolve(n.srcEl)
                    }

                    var n = this;
                    p.init(), d.timeline(w.aug({
                        id: this.widgetId,
                        instanceId: this.instanceId,
                        dnt: A.enabled(),
                        lang: this.lang
                    }, this.override)).then(t, e)
                },
                reconfigure: function (t) {
                    this.lang = t.lang, this.theme || (this.theme = t.theme), "dark" == this.theme && this.classAttr.push("thm-dark"), this.chromeless && this.classAttr.push("var-chromeless"), this.borderless && this.classAttr.push("var-borderless"), this.headerless && this.classAttr.push("var-headerless"), this.footerless && this.classAttr.push("var-footerless"), this.staticTimeline && this.classAttr.push("var-static"), !this.linkColor && t.linkColor && a.VALID_COLOR.test(t.linkColor) && (this.linkColor = RegExp.$1), !this.height && a.VALID_UNIT.test(t.height) && (this.height = RegExp.$1), this.height = Math.max(this.dimensions.MIN_HEIGHT, this.height ? this.height : this.dimensions.DEFAULT_HEIGHT), this.preview && this.classAttr.push("var-preview"), this.narrow = this.width <= this.dimensions.NARROW_WIDTH, this.narrow && _.add(this.sandbox.root, "env-narrow"), this.addSiteStyles()
                },
                getTweetDetails: function (t) {
                    var e, n = this, i = {};
                    return e = t && t.children || [], w.toRealArray(e).forEach(function (t) {
                        w.aug(i, n.extractTweetScribeDetails(t))
                    }), i
                },
                baseScribeData: function () {
                    return {
                        widget_id: this.widgetId,
                        widget_origin: T.rootDocumentLocation(),
                        widget_frame: T.isFramed() && T.currentDocumentLocation(),
                        message: this.partner,
                        query: this.searchQuery,
                        profile_id: this.profileId
                    }
                },
                bindInteractions: function () {
                    var t = this, e = this.element, n = !0;
                    this.bindIntentHandlers(), this.bindUIHandlers(), b.delegate(e, "click", ".load-tweets", function (e) {
                        n && (n = !1, t.forceLoad(), b.stop(e))
                    }), b.delegate(e, "click", ".display-sensitive-image", function (n) {
                        t.showNSFW(E.closest(O, this, e)), b.stop(n)
                    }), b.delegate(e, "mouseover", N, function () {
                        t.mouseOver = !0
                    }), b.delegate(e, "mouseout", N, function () {
                        t.mouseOver = !1
                    }), b.delegate(e, "mouseover", C, function () {
                        t.mouseOverNotifier = !0
                    }), b.delegate(e, "mouseout", C, function () {
                        t.mouseOverNotifier = !1, r.setTimeout(function () {
                            t.hideNewTweetNotifier()
                        }, 3e3)
                    }), this.staticTimeline || (b.delegate(e, "click", H, function (n) {
                        n.altKey || n.metaKey || n.shiftKey || (t.toggleExpando(E.closest(O, this, e)), b.stop(n))
                    }), b.delegate(e, "click", "A", function (t) {
                        b.stopPropagation(t)
                    }), b.delegate(e, "click", ".with-expansion", function (e) {
                        t.toggleExpando(this), b.stop(e)
                    }), b.delegate(e, "click", ".load-more", function () {
                        t.loadMore()
                    }), b.delegate(e, "click", C, function () {
                        t.scrollToTop(), t.hideNewTweetNotifier(!0)
                    }))
                },
                scrollToTop: function () {
                    var t = this.element.querySelector(L);
                    t.scrollTop = 0, t.focus()
                },
                update: function () {
                    var t = this, e = this.element.querySelector(k), n = e && e.children[0], i = n && n.getAttribute("data-tweet-id");
                    this.updateTimeStamps(), this.requestTweets(i, !0, function (e) {
                        e.childNodes.length > 0 && t.insertNewTweets(e)
                    })
                },
                loadMore: function () {
                    var t = this, e = w.toRealArray(this.element.querySelectorAll(O)).pop(), n = e && e.getAttribute("data-tweet-id");
                    this.requestTweets(n, !1, function (e) {
                        var i = t.element.querySelector(U), r = e.childNodes[0];
                        return i.style.cssText = "", r && r.getAttribute("data-tweet-id") == n && e.removeChild(r), e.childNodes.length > 0 ? void t.appendTweets(e) : (_.add(t.element, "no-more"), void i.focus())
                    })
                },
                forceLoad: function () {
                    var t = this, e = !!this.element.querySelectorAll(k).length;
                    this.requestTweets(1, !0, function (n) {
                        n.childNodes.length && (t[e ? "insertNewTweets" : "appendTweets"](n), _.add(t.element, "has-tweets"))
                    })
                },
                schedulePolling: function (t) {
                    var e = this;
                    null !== this.pollInterval && (t = I.get("timeline.pollInterval") || t || this.pollInterval || 1e4, t > -1 && r.setTimeout(function () {
                        e.isUpdating || e.update(), e.schedulePolling()
                    }, t))
                },
                updateCursors: function (t, e) {
                    (e || {}).initial ? (this.cursors.maxPosition = t.maxPosition, this.cursors.minPosition = t.minPosition) : (e || {}).newer ? this.cursors.maxPosition = t.maxPosition || this.cursors.maxPosition : this.cursors.minPosition = t.minPosition || this.cursors.minPosition
                },
                requestTweets: function (t, e, n) {
                    function i(t) {
                        if (o.isUpdating = !1, t && t.headers) {
                            if ("404" == t.headers.status)return void(o.pollInterval = null);
                            if ("503" == t.headers.status)return void(o.pollInterval *= 1.5)
                        }
                    }

                    function r(t) {
                        var i, r, s = o.sandbox.createDocumentFragment(), a = o.sandbox.createElement("ol"), c = [];
                        if (o.isUpdating = !1, o.updateCursors(t.headers, {newer: e}), t && t.headers && t.headers.xPolling && /\d+/.test(t.headers.xPolling) && (o.pollInterval = 1e3 * t.headers.xPolling), t && void 0 !== t.body) {
                            if (a.innerHTML = t.body, a.children[0] && "LI" != a.children[0].tagName)return;
                            for (r = o.getTweetDetails(a), w.forIn(r, function (t) {
                                c.push(t)
                            }), c.length && (i = o.baseScribeData(), i.item_ids = c, i.item_details = r, i.event_initiator = e ? D.CLIENT_SIDE_APP : D.CLIENT_SIDE_USER, o.timelineType && p.clientEvent({
                                page: o.timelineType + "_timeline",
                                component: "timeline",
                                element: "initial",
                                action: c.length ? "results" : "no_results"
                            }, i, !0), p.clientEvent({
                                page: "timeline",
                                component: "timeline",
                                element: e ? "newer" : "older",
                                action: "results"
                            }, i, !0), p.flush()), h.retinize(a), o.constrainMedia(a); a.children[0];)s.appendChild(a.children[0]);
                            n(s)
                        }
                    }

                    var o = this, s = {
                        id: this.widgetId,
                        instanceId: this.instanceId,
                        screenName: this.widgetScreenName,
                        userId: this.widgetUserId,
                        withReplies: this.widgetShowReplies,
                        dnt: A.enabled(),
                        lang: this.lang
                    };
                    e && this.cursors.maxPosition ? s.minPosition = this.cursors.maxPosition : !e && this.cursors.minPosition ? s.maxPosition = this.cursors.minPosition : e ? s.sinceId = t : s.maxId = t, d.timelinePoll(w.aug(s, this.override)).then(r, i)
                },
                insertNewTweets: function (t) {
                    var e, n = this, i = this.element.querySelector(L), o = i.querySelector(k), s = o.offsetHeight;
                    return o.insertBefore(t, o.firstChild), e = o.offsetHeight - s, x.get("events").trigger("timelineUpdated", {
                        target: this.sandbox.element(),
                        region: "newer"
                    }), i.scrollTop > 40 || this.mouseIsOver() ? (i.scrollTop = i.scrollTop + e, this.updateTimeStamps(), void this.showNewTweetNotifier()) : (_.remove(this.element, q), o.style.cssText = "margin-top: -" + e + "px", r.setTimeout(function () {
                        i.scrollTop = 0, _.add(n.element, q), v.cssTransitions() ? o.style.cssText = "" : u.animate(function (t) {
                            e > t ? o.style.cssText = "margin-top: -" + (e - t) + "px" : o.style.cssText = ""
                        }, e, 500, u.easeOut)
                    }, 500), this.updateTimeStamps(), void("custom" != this.timelineType && this.gcTweets(50)))
                },
                appendTweets: function (t) {
                    var e = this.element.querySelector(k);
                    e.appendChild(t), this.updateTimeStamps(), x.get("events").trigger("timelineUpdated", {
                        target: this.sandbox.element(),
                        region: "older"
                    })
                },
                gcTweets: function (t) {
                    var e, n = this.element.querySelector(k), i = n.children.length;
                    for (t = t || 50; i > t && (e = n.children[i - 1]); i--)n.removeChild(e)
                },
                showNewTweetNotifier: function () {
                    var t = this, e = this.element.querySelector(C), n = e.children[0];
                    e.style.cssText = "", e.removeChild(n), e.appendChild(n), _.add(this.element, F), r.setTimeout(function () {
                        _.add(t.element, z)
                    }, 10), this.newNoticeDisplayTime = +new Date, r.setTimeout(function () {
                        t.hideNewTweetNotifier()
                    }, 5e3)
                },
                hideNewTweetNotifier: function (t) {
                    var e = this;
                    (t || !this.mouseOverNotifier) && (_.remove(this.element, z), r.setTimeout(function () {
                        _.remove(e.element, F)
                    }, 500))
                },
                discardStaticOverflow: function (t) {
                    var e, n = t.querySelector(k);
                    if (this.staticTimeline)for (this.height = 0; e = n.children[this.tweetLimit];)n.removeChild(e)
                },
                hideStreamScrollBar: function () {
                    var t, e = this.element.querySelector(L), n = this.element.querySelector(k);
                    e.style.width = "", t = this.element.offsetWidth - n.offsetWidth, t > 0 && (e.style.width = this.element.offsetWidth + t + "px")
                },
                readTranslations: function () {
                    var t = this.element, e = "data-dt-";
                    this.datetime = new c(w.compact({
                        phrases: {
                            now: t.getAttribute(e + "now"),
                            s: t.getAttribute(e + "s"),
                            m: t.getAttribute(e + "m"),
                            h: t.getAttribute(e + "h"),
                            second: t.getAttribute(e + "second"),
                            seconds: t.getAttribute(e + "seconds"),
                            minute: t.getAttribute(e + "minute"),
                            minutes: t.getAttribute(e + "minutes"),
                            hour: t.getAttribute(e + "hour"),
                            hours: t.getAttribute(e + "hours")
                        },
                        months: t.getAttribute(e + "months").split("|"),
                        formats: {
                            abbr: t.getAttribute(e + "abbr"),
                            shortdate: t.getAttribute(e + "short"),
                            longdate: t.getAttribute(e + "long")
                        }
                    }))
                },
                updateTimeStamps: function () {
                    for (var t, e, n, i, r = this.element.querySelectorAll(W), o = 0; t = r[o]; o++)n = t.getAttribute("data-datetime"), i = n && this.datetime.timeAgo(n, this.i18n), e = t.getElementsByTagName("TIME")[0], i && (e && e.innerHTML ? e.innerHTML = i : t.innerHTML = i)
                },
                mouseIsOver: function () {
                    return this.mouseOver
                },
                addUrlParams: function (t) {
                    var e = this, n = {
                        tw_w: this.widgetId,
                        related: this.related,
                        partner: this.partner,
                        query: this.searchQuery,
                        profile_id: this.profileId,
                        original_referer: T.rootDocumentLocation(),
                        tw_p: "embeddedtimeline"
                    };
                    return this.addUrlParams = m(n, function (t) {
                        var n = E.closest(O, t, e.element);
                        return n && {tw_i: n.getAttribute("data-tweet-id")}
                    }), this.addUrlParams(t)
                },
                showNSFW: function (t) {
                    var e, n, i, r, o, s, a = t.querySelector(".nsfw"), c = 0;
                    a && (n = h.scaleDimensions(a.getAttribute("data-width"), a.getAttribute("data-height"), this.contentWidth(), a.getAttribute("data-height")), e = !!(r = a.getAttribute("data-player")), e ? o = this.sandbox.createElement("iframe") : (o = this.sandbox.createElement("img"), r = a.getAttribute(v.retina() ? "data-image-2x" : "data-image"), o.alt = a.getAttribute("data-alt"), s = this.sandbox.createElement("a"), s.href = a.getAttribute("data-href"), s.appendChild(o)), o.title = a.getAttribute("data-title"), o.src = r, o.width = n.width, o.height = n.height, i = E.closest(M, a, t), c = n.height - a.offsetHeight, a.parentNode.replaceChild(e ? o : s, a))
                },
                toggleExpando: function (t) {
                    var e, n = this, i = t.querySelector(M), r = i && i.children[0], o = r && r.getAttribute("data-expanded-media"), a = t.querySelector(H), c = a && a.getElementsByTagName("B")[0], u = c && (c.innerText || c.textContent);
                    if (c) {
                        if (this.layout(function () {
                                c.innerHTML = a.getAttribute("data-toggled-text"), a.setAttribute("data-toggled-text", u)
                            }), _.present(t, j))return this.layout(function () {
                            _.remove(t, j)
                        }), i ? (this.layout(function () {
                            i.style.cssText = "", r.innerHTML = ""
                        }), void s.doLayout()) : void s.doLayout();
                        o && (e = this.sandbox.createElement("DIV"), e.innerHTML = o, h.retinize(e), this.layout(function () {
                            r.appendChild(e), n.constrainMedia(e, null, function (t) {
                                t()
                            })
                        })), i && this.layout(function () {
                            i.style.maxHeight = "500px"
                        }), this.layout(function () {
                            _.add(t, j)
                        }), s.doLayout()
                    }
                },
                recalculateStreamHeight: function (t) {
                    var e = this, n = this.element.querySelector(P), i = this.element.querySelector(R), r = this.element.querySelector(L);
                    this.layout(function () {
                        var o = n.offsetHeight + (i ? i.offsetHeight : 0), s = t || e.sandbox.height();
                        r.style.cssText = "height:" + (s - o - 2) + "px", e.noscrollbar && e.hideStreamScrollBar()
                    })
                },
                handleResize: function (t, e) {
                    var n = this, i = Math.min(this.dimensions.DEFAULT_WIDTH, Math.max(this.dimensions.MIN_WIDTH, Math.min(this.predefinedWidth || this.dimensions.DEFAULT_WIDTH, t)));
                    (i != this.width || e != this.height) && (this.width = i, this.height = e, this.setNarrow(), this.constrainMedia(this.element, this.contentWidth(i)), this.staticTimeline ? this.layout(function () {
                        n.height = n.element.offsetHeight, n.sandbox.height(n.height), x.get("events").trigger("resize", {target: n.sandbox.element()})
                    }) : (this.recalculateStreamHeight(e), x.get("events").trigger("resize", {target: this.sandbox.element()})), s.doLayoutAsync())
                }
            }), e.exports = i
        }, {
            10: 10,
            16: 16,
            2: 2,
            20: 20,
            21: 21,
            26: 26,
            3: 3,
            35: 35,
            37: 37,
            38: 38,
            45: 45,
            47: 47,
            48: 48,
            50: 50,
            54: 54,
            59: 59,
            60: 60,
            62: 62,
            63: 63,
            7: 7,
            77: 77,
            8: 8,
            80: 80,
            9: 9
        }],
        56: [function (t, e, n) {
            function i(t) {
                s.apply(this, [t]);
                var e = this.params(), n = e.count || this.dataAttr("count"), i = e.size || this.dataAttr("size"), r = u.getScreenNameFromPage(), o = "" + (e.shareWithRetweet || this.dataAttr("share-with-retweet") || a.val("share-with-retweet"));
                this.classAttr.push("twitter-tweet-button"), "hashtag" == e.type || c.contains(this.classAttr, "twitter-hashtag-button") ? (this.type = "hashtag", this.classAttr.push("twitter-hashtag-button")) : "mention" == e.type || c.contains(this.classAttr, "twitter-mention-button") ? (this.type = "mention", this.classAttr.push("twitter-mention-button")) : this.classAttr.push("twitter-share-button"), this.text = e.text || this.dataAttr("text"), this.text && /\+/.test(this.text) && !/ /.test(this.text) && (this.text = this.text.replace(/\+/g, " ")), this.counturl = e.counturl || this.dataAttr("counturl"), this.searchlink = e.searchlink || this.dataAttr("searchlink"), this.button_hashtag = l.hashTag(e.button_hashtag || e.hashtag || this.dataAttr("button-hashtag"), !1), this.size = "large" == i ? "l" : "m", this.align = e.align || this.dataAttr("align") || "", this.via = e.via || this.dataAttr("via"), this.hashtags = e.hashtags || this.dataAttr("hashtags"), this.screen_name = l.screenName(e.screen_name || e.screenName || this.dataAttr("button-screen-name")), this.url = e.url || this.dataAttr("url"), this.type ? (this.count = "none", this.shareWithRetweet = "never", r && (this.related = this.related ? r + "," + this.related : r)) : (this.text = this.text || h, this.url = this.url || u.getCanonicalURL() || f, this.count = c.contains(p, n) ? n : "horizontal", this.via = this.via || r, o && c.contains(m, o) && (this.shareWithRetweet = o.replace("-", "_")))
            }

            var r = t(13), o = t(14), s = t(50), a = t(19), c = t(80), u = t(79), l = t(76), d = t(62), h = r.title, f = o.href, p = ["vertical", "horizontal", "none"], m = ["never", "publisher-first", "publisher-only", "author-first", "author-only"];
            i.prototype = new s, c.aug(i.prototype, {
                iframeSource: "widgets/tweet_button.b4a367eaaf8727457b2c58a20f015188.{{lang}}.html",
                widgetUrlParams: function () {
                    return c.compact({
                        text: this.text,
                        url: this.url,
                        via: this.via,
                        related: this.related,
                        count: this.count,
                        lang: this.lang,
                        counturl: this.counturl,
                        searchlink: this.searchlink,
                        placeid: this.placeid,
                        original_referer: o.href,
                        id: this.id,
                        size: this.size,
                        type: this.type,
                        screen_name: this.screen_name,
                        share_with_retweet: this.shareWithRetweet,
                        button_hashtag: this.button_hashtag,
                        hashtags: this.hashtags,
                        align: this.align,
                        partner: this.partner,
                        dnt: d.enabled(),
                        _: +new Date
                    })
                },
                render: function () {
                    var t, e = this, n = this.makeIframeSource();
                    return this.count && this.classAttr.push("twitter-count-" + this.count), t = this.create(n, {title: "Twitter Tweet Button"}).then(function (t) {
                        return e.element = t
                    })
                }
            }), e.exports = i
        }, {13: 13, 14: 14, 19: 19, 50: 50, 62: 62, 76: 76, 79: 79, 80: 80}],
        57: [function (t, e, n) {
            function i(t, e, n, i) {
                b[t] = b[t] || [], b[t].push({s: n, f: i, lang: e})
            }

            function r(t, e) {
                var n = {};
                n[t] = {item_type: 0}, v.clientEvent({
                    page: "video",
                    component: "tweet",
                    action: "results"
                }, f.aug({}, e, {item_ids: [t], item_details: n}), !0), g.scribeVideoAudienceImpression()
            }

            function o(t, e) {
                var n = {};
                n[t] = {item_type: 0}, v.clientEvent({
                    page: "video",
                    component: "rawembedcode",
                    action: "no_results"
                }, {
                    widget_origin: p.rootDocumentLocation(),
                    widget_frame: p.isFramed() && p.currentDocumentLocation(),
                    message: e,
                    item_ids: [t],
                    item_details: n
                }, !0), g.scribeVideoAudienceImpression()
            }

            function s(t) {
                if (t) {
                    u.apply(this, [t]);
                    var e = this.srcEl && this.srcEl.getElementsByTagName("A"), n = e && e[e.length - 1], i = this.params();
                    this.hideStatus = "hidden" === (i.status || this.dataAttr("status")), this.tweetId = i.tweetId || n && y.status(n.href)
                }
            }

            var a = t(3), c = t(50), u = t(54), l = t(7), d = t(72), h = t(73), f = t(80), p = t(60), m = t(45), g = t(35), v = t(37), y = t(76), w = t(13), b = {}, _ = [];
            s.prototype = new u, f.aug(s.prototype, {
                renderedClassNames: "twitter-video twitter-video-rendered",
                videoPlayer: !0,
                dimensions: {
                    DEFAULT_HEIGHT: "0",
                    DEFAULT_WIDTH: "0",
                    maxHeight: "500",
                    MIN_WIDTH: "320",
                    MIN_HEIGHT: "180",
                    MARGIN: "10px 0",
                    WIDE_MEDIA_PADDING: 0,
                    NARROW_MEDIA_PADDING: 0,
                    BORDERS: 0
                },
                styleSheetUrl: a.video,
                applyVisibleSandboxStyles: function (t) {
                    return t.style({visibility: "visible"})
                },
                applyInitialSandboxStyles: function (t) {
                    return t.style({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        visiblity: "hidden"
                    })
                },
                modifyFrame: function (t) {
                    return this.constrainingWrapper = w.createElement("div"), this.constrainingWrapper.style.minWidth = this.dimensions.MIN_WIDTH + "px", this.constrainingWrapper.style.margin = this.dimensions.MARGIN, this.wrapper = w.createElement("div"), this.wrapper.style.position = "relative", this.wrapper.style.height = 0, this.constrainingWrapper.appendChild(this.wrapper), this.wrapper.appendChild(t), this.constrainingWrapper
                },
                create: function (t) {
                    var e, n, i = this, o = this.sandbox.createElement("div");
                    if (o.innerHTML = t, e = o.children[0]) {
                        n = e.children[0], this.playerConfig = JSON.parse(e.getAttribute("data-player-config")), this.sandbox.setTitle(e.getAttribute("data-iframe-title") || "Video"), this.sandbox.appendChild(e).then(function () {
                            i.renderedDeferred.resolve(i.sandbox), i.completeDeferred.resolve(i.sandbox.element())
                        });
                        var s = n.getAttribute("data-width"), a = n.getAttribute("data-height"), c = s / a, u = 1 / c * 100 + "%";
                        return this.layout(function () {
                            i.wrapper.style.paddingBottom = u, i.constrainingWrapper.style.maxWidth = parseInt(i.dimensions.maxHeight, 10) * c + "px"
                        }), r(this.tweetId, this.baseScribeData()), e
                    }
                },
                render: function () {
                    var t = this;
                    return this.tweetId ? (this.rendered().then(function () {
                        var e = t.srcEl;
                        e && e.parentNode && t.layout(function () {
                            e.parentNode.removeChild(e)
                        })
                    }), i(this.tweetId, this.lang, function (e) {
                        t.ready().then(function () {
                            t.element = t.create(e), t.readTimestampTranslations(), t.writePlayerConfig()
                        })
                    }, function () {
                        o(t.tweetId, t.partner), t.completeDeferred.resolve(t.srcEl)
                    }), _.push(this.completed()), this.completed()) : (this.completeDeferred.resolve(this.srcEl), this.completed())
                },
                baseScribeData: function () {
                    return {
                        widget_origin: p.rootDocumentLocation(),
                        widget_frame: p.isFramed() && p.currentDocumentLocation(),
                        message: this.partner
                    }
                },
                readTimestampTranslations: function () {
                    var t = this.element, e = "data-dt-", n = t.getAttribute(e + "months") || "";
                    this.datetime = new l(f.compact({
                        phrases: {
                            AM: t.getAttribute(e + "am"),
                            PM: t.getAttribute(e + "pm")
                        }, months: n.split("|"), formats: {full: t.getAttribute(e + "full")}
                    }))
                },
                getTimestamp: function () {
                    var t = this.element.getAttribute("data-datetime"), e = t && this.datetime.localTimeStamp(t);
                    return {local: e}
                },
                writePlayerConfig: function () {
                    this.playerConfig.statusTimestamp = this.getTimestamp(), this.playerConfig.hideStatus = this.hideStatus, this.element.setAttribute("data-player-config", JSON.stringify(this.playerConfig))
                }
            }), s.fetchAndRender = function () {
                function t(t) {
                    f.forIn(t, function (t, n) {
                        var i = e[t];
                        i.forEach(function (t) {
                            t.s && t.s.call(this, n)
                        }), delete e[t]
                    }), f.forIn(e, function (t, e) {
                        e.forEach(function (e) {
                            e.f && e.f.call(this, t)
                        })
                    })
                }

                var e = b, n = [];
                b = {};
                for (var i in e)e.hasOwnProperty(i) && n.push(i);
                n.length && (h.always(m.videos({ids: n.sort(), lang: e[n[0]][0].lang}), t), d.all(_), _ = [])
            }, c.afterLoad(s.fetchAndRender), e.exports = s
        }, {13: 13, 3: 3, 35: 35, 37: 37, 45: 45, 50: 50, 54: 54, 60: 60, 7: 7, 72: 72, 73: 73, 76: 76, 80: 80}],
        58: [function (t, e, n) {
            function i(t) {
                return c.parseInt(t, 16)
            }

            function r(t) {
                return u.isType("string", t) ? (t = t.replace(l, ""), t += 3 === t.length ? t : "") : null
            }

            function o(t, e) {
                var n, o, s, a;
                return t = r(t), e = e || 0, t ? (n = 0 > e ? 0 : 255, e = 0 > e ? -Math.max(e, -1) : Math.min(e, 1), o = i(t.substring(0, 2)), s = i(t.substring(2, 4)), a = i(t.substring(4, 6)), "#" + (16777216 + 65536 * (Math.round((n - o) * e) + o) + 256 * (Math.round((n - s) * e) + s) + (Math.round((n - a) * e) + a)).toString(16).slice(1)) : void 0
            }

            function s(t, e) {
                return o(t, -e)
            }

            function a(t, e) {
                return o(t, e)
            }

            var c = t(16), u = t(80), l = /^#/;
            e.exports = {darken: s, lighten: a}
        }, {16: 16, 80: 80}],
        59: [function (t, e, n) {
            e.exports = {
                sanitize: function (t, e, n) {
                    var i, r = /^[\w ,%\/"'\-_#]+$/, o = t && t.split(";").map(function (t) {
                            return t.split(":").slice(0, 2).map(function (t) {
                                return t.trim()
                            })
                        }), s = 0, a = [], c = n ? "!important" : "";
                    for (e = e || /^(font|text\-|letter\-|color|line\-)[\w\-]*$/; o && (i = o[s]); s++)i[0].match(e) && i[1].match(r) && a.push(i.join(":") + c);
                    return a.join(";")
                }
            }
        }, {}],
        60: [function (t, e, n) {
            function i(t) {
                return t && c.isType("string", t) && (u = t), u
            }

            function r() {
                return l
            }

            function o() {
                return u !== l
            }

            var s = t(14), a = t(79), c = t(80), u = a.getCanonicalURL() || s.href, l = u;
            e.exports = {isFramed: o, rootDocumentLocation: i, currentDocumentLocation: r}
        }, {14: 14, 79: 79, 80: 80}],
        61: [function (t, e, n) {
            function i() {
                u = 1;
                for (var t = 0, e = l.length; e > t; t++)l[t]()
            }

            var r, o, s, a = t(13), c = t(16), u = 0, l = [], d = !1, h = a.createElement("a");
            /^loade|c/.test(a.readyState) && (u = 1), a.addEventListener && a.addEventListener("DOMContentLoaded", o = function () {
                a.removeEventListener("DOMContentLoaded", o, d), i()
            }, d), h.doScroll && a.attachEvent("onreadystatechange", r = function () {
                /^c/.test(a.readyState) && (a.detachEvent("onreadystatechange", r), i())
            }), s = h.doScroll ? function (t) {
                c.self != c.top ? u ? t() : l.push(t) : !function () {
                    try {
                        h.doScroll("left")
                    } catch (e) {
                        return setTimeout(function () {
                            s(t)
                        }, 50)
                    }
                    t()
                }()
            } : function (t) {
                u ? t() : l.push(t)
            }, e.exports = s
        }, {13: 13, 16: 16}],
        62: [function (t, e, n) {
            function i() {
                h = !0
            }

            function r(t, e) {
                return h ? !0 : l.asBoolean(d.val("dnt")) ? !0 : !a || 1 != a.doNotTrack && 1 != a.msDoNotTrack ? u.isUrlSensitive(e || s.host) ? !0 : c.isFramed() && u.isUrlSensitive(c.rootDocumentLocation()) ? !0 : (t = f.test(t || o.referrer) && RegExp.$1, t && u.isUrlSensitive(t) ? !0 : !1) : !0
            }

            var o = t(13), s = t(14), a = t(15), c = t(60), u = t(75), l = t(77), d = t(19), h = !1, f = /https?:\/\/([^\/]+).*/i;
            e.exports = {setOn: i, enabled: r}
        }, {13: 13, 14: 14, 15: 15, 19: 19, 60: 60, 75: 75, 77: 77}],
        63: [function (t, e, n) {
            function i(t) {
                return t = t || g, t.devicePixelRatio ? t.devicePixelRatio >= 1.5 : t.matchMedia ? t.matchMedia("only screen and (min-resolution: 144dpi)").matches : !1
            }

            function r(t) {
                return t = t || A, /(Trident|MSIE \d)/.test(t)
            }

            function o(t) {
                return t = t || A, /MSIE 9/.test(t)
            }

            function s(t) {
                return t = t || A, /(iPad|iPhone|iPod)/.test(t)
            }

            function a(t) {
                return t = t || A, /^Mozilla\/5\.0 \(Linux; (U; )?Android/.test(t)
            }

            function c() {
                return T
            }

            function u(t, e) {
                return t = t || g, e = e || A, t.postMessage && !(r(e) && t.opener)
            }

            function l(t) {
                t = t || m;
                try {
                    return !!t.plugins["Shockwave Flash"] || !!new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
                } catch (e) {
                    return !1
                }
            }

            function d(t, e, n) {
                return t = t || g, e = e || m, n = n || A, "ontouchstart"in t || /Opera Mini/.test(n) || e.msMaxTouchPoints > 0
            }

            function h() {
                var t = p.body.style;
                return void 0 !== t.transition || void 0 !== t.webkitTransition || void 0 !== t.mozTransition || void 0 !== t.oTransition || void 0 !== t.msTransition
            }

            function f() {
                return !!(g.Promise && g.Promise.resolve && g.Promise.reject && g.Promise.all && g.Promise.race && function () {
                    var t;
                    return new g.Promise(function (e) {
                        t = e
                    }), b.isType("function", t)
                }())
            }

            var p = t(13), m = t(15), g = t(16), v = t(61), y = t(68), w = t(77), b = t(80), _ = t(19), E = t(20), A = m.userAgent, T = !1, x = !1, I = "twitter-csp-test";
            E.set("verifyCSP", function (t) {
                var e = p.getElementById(I);
                x = !0, T = !!t, e && e.parentNode.removeChild(e)
            }), v(function () {
                var t;
                return w.asBoolean(_.val("widgets:csp")) ? T = !0 : (t = p.createElement("script"), t.id = I, t.text = E.fullPath("verifyCSP") + "(false);", p.body.appendChild(t), void g.setTimeout(function () {
                    x || (y.warn('TWITTER: Content Security Policy restrictions may be applied to your site. Add <meta name="twitter:widgets:csp" content="on"> to supress this warning.'), y.warn("TWITTER: Please note: Not all embedded timeline and embedded Tweet functionality is supported when CSP is applied."))
                }, 5e3))
            }), e.exports = {
                retina: i,
                anyIE: r,
                ie9: o,
                ios: s,
                android: a,
                cspEnabled: c,
                flashEnabled: l,
                canPostMessage: u,
                touch: d,
                cssTransitions: h,
                hasPromiseSupport: f
            }
        }, {13: 13, 15: 15, 16: 16, 19: 19, 20: 20, 61: 61, 68: 68, 77: 77, 80: 80}],
        64: [function (t, e, n) {
            var i = t(80), r = {
                bind: function (t, e) {
                    return this._handlers = this._handlers || {}, this._handlers[t] = this._handlers[t] || [], this._handlers[t].push(e)
                }, unbind: function (t, e) {
                    if (this._handlers[t])if (e) {
                        var n = this._handlers[t].indexOf(e);
                        n >= 0 && this._handlers[t].splice(n, 1)
                    } else this._handlers[t] = []
                }, trigger: function (t, e) {
                    var n = this._handlers && this._handlers[t];
                    e = e || {}, e.type = t, n && n.forEach(function (t) {
                        i.async(t.bind(this, e))
                    })
                }
            };
            e.exports = {Emitter: r}
        }, {80: 80}],
        65: [function (t, e, n) {
            function i(t) {
                for (var e, n = r.getElementsByTagName("iframe"), i = 0; e = n[i]; i++)if (e.contentWindow === t)return e
            }

            var r = t(13);
            e.exports = i
        }, {13: 13}],
        66: [function (t, e, n) {
            var i = t(13), r = t(80);
            e.exports = function (t, e, n) {
                var o;
                if (n = n || i, t = t || {}, e = e || {}, t.name) {
                    try {
                        o = n.createElement('<iframe name="' + t.name + '"></iframe>')
                    } catch (s) {
                        o = n.createElement("iframe"), o.name = t.name
                    }
                    delete t.name
                } else o = n.createElement("iframe");
                return t.id && (o.id = t.id, delete t.id), o.allowtransparency = "true", o.scrolling = "no", o.setAttribute("frameBorder", 0), o.setAttribute("allowTransparency", !0), r.forIn(t, function (t, e) {
                    o.setAttribute(t, e)
                }), r.forIn(e, function (t, e) {
                    o.style[t] = e
                }), o
            }
        }, {13: 13, 80: 80}],
        67: [function (t, e, n) {
            function i() {
            }

            var r, o = t(16), s = t(71), a = [];
            i.prototype.enqueue = function (t, e) {
                var n = new s;
                return a.push({action: t, deferred: n, note: e}), n.promise
            }, i.prototype.exec = function () {
                var t, e = a;
                if (e.length)for (a = []; e.length;)t = e.shift(), t && t.action ? t.deferred.resolve(t.action()) : t.deferred.reject()
            }, i.prototype.delayedExec = function () {
                r && o.clearTimeout(r), r = o.setTimeout(this.exec, 100)
            }, e.exports = i
        }, {16: 16, 71: 71}],
        68: [function (t, e, n) {
            function i() {
                u("info", h.toRealArray(arguments))
            }

            function r() {
                u("warn", h.toRealArray(arguments))
            }

            function o() {
                u("error", h.toRealArray(arguments))
            }

            function s(t) {
                m && (p[t] = c())
            }

            function a(t) {
                var e;
                m && (p[t] ? (e = c(), i("_twitter", t, e - p[t])) : o("timeEnd() called before time() for id: ", t))
            }

            function c() {
                return d.performance && +d.performance.now() || +new Date
            }

            function u(t, e) {
                if (d[f] && d[f][t])switch (e.length) {
                    case 1:
                        d[f][t](e[0]);
                        break;
                    case 2:
                        d[f][t](e[0], e[1]);
                        break;
                    case 3:
                        d[f][t](e[0], e[1], e[2]);
                        break;
                    case 4:
                        d[f][t](e[0], e[1], e[2], e[3]);
                        break;
                    case 5:
                        d[f][t](e[0], e[1], e[2], e[3], e[4]);
                        break;
                    default:
                        0 !== e.length && d[f].warn && d[f].warn("too many params passed to logger." + t)
                }
            }

            var l = t(14), d = t(16), h = t(80), f = ["con", "sole"].join(""), p = {}, m = h.contains(l.href, "tw_debug=true");
            e.exports = {info: i, warn: r, error: o, time: s, timeEnd: a}
        }, {14: 14, 16: 16, 80: 80}],
        69: [function (t, e, n) {
            function i(t) {
                return function (e) {
                    return o.hasValue(e[t])
                }
            }

            function r() {
                this.assertions = [], this._defaults = {}
            }

            var o = t(77), s = t(80);
            r.prototype.assert = function (t, e) {
                return this.assertions.push({fn: t, msg: e || "assertion failed"}), this
            }, r.prototype.defaults = function (t) {
                return this._defaults = t || this._defaults, this
            }, r.prototype.require = function (t) {
                var e = this;
                return t = Array.isArray(t) ? t : s.toRealArray(arguments), t.forEach(function (t) {
                    e.assert(i(t), "required: " + t)
                }), this
            }, r.prototype.parse = function (t) {
                var e, n;
                if (e = s.aug({}, this._defaults, t || {}), n = this.assertions.reduce(function (t, n) {
                        return n.fn(e) || t.push(n.msg), t
                    }, []), n.length > 0)throw new Error(n.join("\n"));
                return e
            }, e.exports = r
        }, {77: 77, 80: 80}],
        70: [function (t, e, n) {
            var i, r, o, s = t(74);
            i = function (t) {
                var e = t.search.substr(1);
                return s.decode(e)
            }, r = function (t) {
                var e = t.href, n = e.indexOf("#"), i = 0 > n ? "" : e.substring(n + 1);
                return s.decode(i)
            }, o = function (t) {
                var e, n = {}, o = i(t), s = r(t);
                for (e in o)o.hasOwnProperty(e) && (n[e] = o[e]);
                for (e in s)s.hasOwnProperty(e) && (n[e] = s[e]);
                return n
            }, e.exports = {combined: o, fromQuery: i, fromFragment: r}
        }, {74: 74}],
        71: [function (t, e, n) {
            function i() {
                var t = this;
                this.promise = new r(function (e, n) {
                    t.resolve = e, t.reject = n
                })
            }

            var r = t(72);
            e.exports = i
        }, {72: 72}],
        72: [function (t, e, n) {
            var i = t(1).Promise, r = t(16), o = t(63);
            e.exports = o.hasPromiseSupport() ? r.Promise : i
        }, {1: 1, 16: 16, 63: 63}],
        73: [function (t, e, n) {
            function i(t, e) {
                return t.then(e, e)
            }

            function r(t) {
                var e;
                return t = t || [], e = t.length, t = t.filter(o), e ? e !== t.length ? s.reject("non-Promise passed to .some") : new s(function (e, n) {
                    function i() {
                        r += 1, r === t.length && n()
                    }

                    var r = 0;
                    t.forEach(function (t) {
                        t.then(e, i)
                    })
                }) : s.reject("no promises passed to .some")
            }

            function o(t) {
                return t instanceof s
            }

            var s = t(72);
            e.exports = {always: i, some: r, isPromise: o}
        }, {72: 72}],
        74: [function (t, e, n) {
            function i(t) {
                return encodeURIComponent(t).replace(/\+/g, "%2B").replace(/'/g, "%27")
            }

            function r(t) {
                return decodeURIComponent(t)
            }

            function o(t) {
                var e = [];
                return l.forIn(t, function (t, n) {
                    var r = i(t);
                    l.isType("array", n) || (n = [n]), n.forEach(function (t) {
                        u.hasValue(t) && e.push(r + "=" + i(t))
                    })
                }), e.sort().join("&")
            }

            function s(t) {
                var e, n = {};
                return t ? (e = t.split("&"), e.forEach(function (t) {
                    var e = t.split("="), i = r(e[0]), o = r(e[1]);
                    return 2 == e.length ? l.isType("array", n[i]) ? void n[i].push(o) : i in n ? (n[i] = [n[i]], void n[i].push(o)) : void(n[i] = o) : void 0
                }), n) : {}
            }

            function a(t, e) {
                var n = o(e);
                return n.length > 0 ? l.contains(t, "?") ? t + "&" + o(e) : t + "?" + o(e) : t
            }

            function c(t) {
                var e = t && t.split("?");
                return 2 == e.length ? s(e[1]) : {}
            }

            var u = t(77), l = t(80);
            e.exports = {url: a, decodeURL: c, decode: s, encode: o, encodePart: i, decodePart: r}
        }, {77: 77, 80: 80}],
        75: [function (t, e, n) {
            function i(t) {
                return t in a ? a[t] : a[t] = s.test(t)
            }

            function r() {
                return i(o.host)
            }

            var o = t(14), s = /^[^#?]*\.(gov|mil)(:\d+)?([#?].*)?$/i, a = {};
            e.exports = {isUrlSensitive: i, isHostPageSensitive: r}
        }, {14: 14}],
        76: [function (t, e, n) {
            function i(t) {
                return "string" == typeof t && m.test(t) && RegExp.$1.length <= 20
            }

            function r(t) {
                return i(t) ? RegExp.$1 : void 0
            }

            function o(t, e) {
                var n = p.decodeURL(t);
                return e = e || !1, n.screen_name = r(t), n.screen_name ? p.url("https://twitter.com/intent/" + (e ? "follow" : "user"), n) : void 0
            }

            function s(t) {
                return o(t, !0)
            }

            function a(t) {
                return "string" == typeof t && w.test(t)
            }

            function c(t, e) {
                return e = void 0 === e ? !0 : e, a(t) ? (e ? "#" : "") + RegExp.$1 : void 0
            }

            function u(t) {
                return "string" == typeof t && g.test(t)
            }

            function l(t) {
                return u(t) && RegExp.$1
            }

            function d(t) {
                return v.test(t)
            }

            function h(t) {
                return y.test(t)
            }

            function f(t) {
                return b.test(t)
            }

            var p = t(74), m = /(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?(?:\/intent\/(?:follow|user)\/?\?screen_name=|(?:\/#!)?\/))@?([\w]+)(?:\?|&|$)/i, g = /(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?\/(?:#!\/)?[\w_]+\/status(?:es)?\/)(\d+)/i, v = /^http(s?):\/\/(\w+\.)*twitter\.com([\:\/]|$)/i, y = /^http(s?):\/\/pbs\.twimg\.com\//, w = /^#?([^.,<>!\s\/#\-\(\)\'\"]+)$/, b = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/;
            e.exports = {
                isHashTag: a,
                hashTag: c,
                isScreenName: i,
                screenName: r,
                isStatus: u,
                status: l,
                intentForProfileURL: o,
                intentForFollowURL: s,
                isTwitterURL: d,
                isTwimgURL: h,
                isIntentURL: f,
                regexen: {profile: m}
            }
        }, {74: 74}],
        77: [function (t, e, n) {
            function i(t) {
                return void 0 !== t && null !== t && "" !== t
            }

            function r(t) {
                return s(t) && t % 1 === 0
            }

            function o(t) {
                return s(t) && !r(t)
            }

            function s(t) {
                return i(t) && !isNaN(t)
            }

            function a(t) {
                return i(t) && "array" == p.toType(t)
            }

            function c(t) {
                return p.contains(g, t)
            }

            function u(t) {
                return p.contains(m, t)
            }

            function l(t) {
                return i(t) ? u(t) ? !0 : c(t) ? !1 : !!t : !1
            }

            function d(t) {
                return s(t) ? t : void 0
            }

            function h(t) {
                return o(t) ? t : void 0
            }

            function f(t) {
                return r(t) ? t : void 0
            }

            var p = t(80), m = [!0, 1, "1", "on", "ON", "true", "TRUE", "yes", "YES"], g = [!1, 0, "0", "off", "OFF", "false", "FALSE", "no", "NO"];
            e.exports = {
                hasValue: i,
                isInt: r,
                isFloat: o,
                isNumber: s,
                isArray: a,
                isTruthValue: u,
                isFalseValue: c,
                asInt: f,
                asFloat: h,
                asNumber: d,
                asBoolean: l
            }
        }, {80: 80}],
        78: [function (t, e, n) {
            function i() {
                return o + String(+new Date) + Math.floor(1e5 * Math.random()) + s++
            }

            function r() {
                return o + String(a++)
            }

            var o = "i", s = 0, a = 0;
            e.exports = {generate: i, deterministic: r}
        }, {}],
        79: [function (t, e, n) {
            function i(t, e) {
                var n, i;
                return e = e || a, /^https?:\/\//.test(t) ? t : /^\/\//.test(t) ? e.protocol + t : (n = e.host + (e.port.length ? ":" + e.port : ""), 0 !== t.indexOf("/") && (i = e.pathname.split("/"), i.pop(), i.push(t), t = "/" + i.join("/")), [e.protocol, "//", n, t].join(""))
            }

            function r() {
                for (var t, e = s.getElementsByTagName("link"), n = 0; t = e[n]; n++)if ("canonical" == t.rel)return i(t.href)
            }

            function o() {
                for (var t, e, n, i = s.getElementsByTagName("a"), r = s.getElementsByTagName("link"), o = [i, r], a = 0, u = 0, l = /\bme\b/; t = o[a]; a++)for (u = 0; e = t[u]; u++)if (l.test(e.rel) && (n = c.screenName(e.href)))return n
            }

            var s = t(13), a = t(14), c = t(76);
            e.exports = {absolutize: i, getCanonicalURL: r, getScreenNameFromPage: o}
        }, {13: 13, 14: 14, 76: 76}],
        80: [function (t, e, n) {
            function i(t) {
                return d(arguments).slice(1).forEach(function (e) {
                    o(e, function (e, n) {
                        t[e] = n
                    })
                }), t
            }

            function r(t) {
                return o(t, function (e, n) {
                    c(n) && (r(n), u(n) && delete t[e]), (void 0 === n || null === n || "" === n) && delete t[e]
                }), t
            }

            function o(t, e) {
                for (var n in t)(!t.hasOwnProperty || t.hasOwnProperty(n)) && e(n, t[n]);
                return t
            }

            function s(t) {
                return {}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
            }

            function a(t, e) {
                return t == s(e)
            }

            function c(t) {
                return t === Object(t)
            }

            function u(t) {
                if (!c(t))return !1;
                if (Object.keys)return !Object.keys(t).length;
                for (var e in t)if (t.hasOwnProperty(e))return !1;
                return !0
            }

            function l(t, e) {
                f.setTimeout(function () {
                    t.call(e || null)
                }, 0)
            }

            function d(t) {
                return Array.prototype.slice.call(t)
            }

            function h(t, e) {
                return t && t.indexOf ? t.indexOf(e) > -1 : !1
            }

            var f = t(16);
            e.exports = {
                aug: i,
                async: l,
                compact: r,
                contains: h,
                forIn: o,
                isObject: c,
                isEmptyObject: u,
                toType: s,
                isType: a,
                toRealArray: d
            }
        }, {16: 16}],
        81: [function (t, e, n) {
            function i() {
                if (o)return o;
                if (u.isDynamicWidget()) {
                    var t, e = 0, n = c.parent.frames.length;
                    try {
                        if (o = c.parent.frames[h])return o
                    } catch (i) {
                    }
                    if (l.anyIE())for (; n > e; e++)try {
                        if (t = c.parent.frames[e], t && "function" == typeof t.openIntent)return o = t
                    } catch (i) {
                    }
                }
            }

            function r() {
                var t, e, n, o, a, l, d = {};
                if ("function" === (typeof arguments[0]).toLowerCase() ? d.success = arguments[0] : d = arguments[0], t = d.success || function () {
                        }, e = d.timeout || function () {
                        }, n = d.nohub || function () {
                        }, o = d.complete || function () {
                        }, a = void 0 !== d.attempt ? d.attempt : m, !u.isDynamicWidget() || s)return n(), o(), !1;
                l = i(), a--;
                try {
                    if (l && l.trigger)return t(l), void o()
                } catch (h) {
                }
                return 0 >= a ? (s = !0, e(), void o()) : +new Date - f > p * m ? (s = !0, void n()) : void c.setTimeout(function () {
                    r({success: t, timeout: e, nohub: n, attempt: a, complete: o})
                }, p)
            }

            var o, s, a = t(14), c = t(16), u = t(46), l = t(63), d = "twttrHubFrameSecure", h = "http:" == a.protocol ? "twttrHubFrame" : d, f = +new Date, p = 100, m = 20;
            e.exports = {withHub: r, contextualHubId: h, secureHubId: d}
        }, {14: 14, 16: 16, 46: 46, 63: 63}],
        82: [function (t, e, n) {
            e.exports = {version: "PREFLIGHT:363151d:1438802792237"}
        }, {}],
        83: [function (t, e, n) {
            e.exports = {css: "d192d1834720b3d9483d30db3a7cb431"}
        }, {}],
        84: [function (t, e, n) {
            function i(t) {
                t = r.parse(t), this.rootEl = t.rootEl, this.videoEl = t.videoEl, this.playButtonEl = t.playButtonEl, this.fallbackUrl = t.fallbackUrl, this.player = new u({
                    videoEl: this.videoEl,
                    loop: !0,
                    autoplay: !1
                }), this._attachClickListener()
            }

            var r, o = t(8), s = t(9), a = t(16), c = t(69), u = t(85);
            r = (new c).require("rootEl", "videoEl", "playButtonEl").defaults({fallbackUrl: null}), i.prototype._attachClickListener = function () {
                function t(t) {
                    s.stopPropagation(t), e._togglePlayer()
                }

                var e = this;
                this.videoEl.addEventListener("click", t, !1), this.playButtonEl.addEventListener("click", t, !1)
            }, i.prototype._togglePlayer = function () {
                return this.player.hasPlayableSource() ? (this.player.toggle(), void o.toggle(this.rootEl, "is-playing", !this.player.isPaused())) : void(this.fallbackUrl && a.open(this.fallbackUrl))
            }, e.exports = i
        }, {16: 16, 69: 69, 8: 8, 85: 85, 9: 9}],
        85: [function (t, e, n) {
            function i(t) {
                var e;
                t = r.parse(t), this.videoEl = t.videoEl, "loop"in t && (this.videoEl.loop = t.loop), "autoplay"in t && (this.videoEl.autoplay = t.autoplay), "poster"in t && (this.videoEl.poster = t.poster), e = a.toRealArray(this.videoEl.querySelectorAll("source")), this.sourceTypes = e.map(function (t) {
                    return t.type
                })
            }

            var r, o = t(13), s = t(69), a = t(80);
            r = (new s).require("videoEl"), i.prototype.isPaused = function () {
                return this.videoEl.paused
            }, i.prototype.play = function () {
                return this.videoEl.play(), this
            }, i.prototype.pause = function () {
                return this.videoEl.pause(), this
            }, i.prototype.toggle = function () {
                return this.videoEl.paused ? this.play() : this.pause()
            }, i.prototype.addSource = function (t, e) {
                var n = o.createElement("source");
                return n.src = t, n.type = e, this.sourceTypes.push(e), this.videoEl.appendChild(n), this
            }, i.prototype.hasPlayableSource = function () {
                var t = this.videoEl;
                return t.canPlayType ? this.sourceTypes.reduce(function (e, n) {
                    return e || !!t.canPlayType(n).replace("no", "")
                }, !1) : !1
            }, i.prototype.setDimensions = function (t, e) {
                return this.videoEl.width = t, this.videoEl.height = e, this
            }, e.exports = i
        }, {13: 13, 69: 69, 80: 80}],
        86: [function (t, e, n) {
            function i(t, e) {
                return t && t.getAttribute ? t.getAttribute("data-" + e) : void 0
            }

            function r(t, e) {
                return {element: t.element || v, action: t.action || y, page: o(e) ? "video" : void 0}
            }

            function o(t) {
                return d.closest(".embedded-video", t)
            }

            function s(t) {
                var e = d.closest(".tweet", t), n = !e && d.closest(".EmbeddedTweet", t);
                return n && (e = n.querySelector(".tweet.subject")), e
            }

            function a(t) {
                return JSON.parse(i(o(t), "player-config"))
            }

            function c(t, e) {
                var n, r, a, c = o(e);
                return c ? n = l.aug({
                    item_type: m,
                    card_type: g,
                    id: i(c, "tweet-id"),
                    card_name: i(c, "card-name"),
                    publisher_id: i(c, "publisher-id"),
                    content_id: i(c, "content-id")
                }, t.itemData || {}) : (r = d.closest(".cards-multimedia", e), a = s(e), n = l.aug({
                    item_type: m,
                    card_type: g,
                    id: i(a, "tweet-id"),
                    card_name: i(r, "card-name"),
                    publisher_id: i(r, "publisher-id"),
                    content_id: i(r, "video-content-id")
                }, t.itemData || {})), {items: [n]}
            }

            function u(t) {
                var e = this;
                this.global = t, this.server = (new h).attachReceiver(new p.Receiver(t, "")).bind("scribe", function (t) {
                    e.scribe(t, this)
                }).bind("requestPlayerConfig", function () {
                    return e.requestPlayerConfig(this)
                })
            }

            var l = t(80), d = t(10), h = t(29), f = t(39), p = t(30), m = 0, g = 6, v = "amplify_player", y = "undefined";
            u.prototype.findIframeByWindow = function (t) {
                for (var e = this.global.document.getElementsByTagName("iframe"), n = e.length, i = 0; n > i; i++)if (e[i].contentWindow == t)return e[i]
            }, u.prototype.requestPlayerConfig = function (t) {
                var e = this.findIframeByWindow(t);
                if (e)return a(e)
            }, u.prototype.scribe = function (t, e) {
                var n, i, o, s;
                n = t && t.customScribe, i = this.findIframeByWindow(e), n && i && (o = r(n, i), s = c(n, i), f.clientEvent2(o, s, !0))
            }, e.exports = u
        }, {10: 10, 29: 29, 30: 30, 39: 39, 80: 80}],
        87: [function (t, e, n) {
            !function () {
                var e = t(13), n = t(43), i = t(61), r = t(68), o = t(26), s = t(50), a = t(52), c = t(56), u = t(51), l = t(55), d = t(57), h = t(41), f = t(64), p = t(42), m = t(24), g = t(21), v = t(20), y = t(17), w = t(71), b = t(49);
                if (v.init("host", "platform.twitter.com"), o.start("widgets-js-load"), n.requestArticleUrl(), b(function (t, e, n) {
                        var i = t && s.findInstance(t);
                        i && i.setInitialSize(e, n)
                    }), v.get("widgets.loaded"))return g.call("widgets.load"), !1;
                if (v.get("widgets.init"))return !1;
                v.set("widgets.init", !0), g.set("init", !0);
                var _ = new w;
                y.exposeReadyPromise(_.promise, g.base, "_e"), g.set("events", {
                    bind: function (t, e) {
                        _.promise.then(function (n) {
                            n.events.bind(t, e)
                        })
                    }
                }), i(function () {
                    function t() {
                        v.set("eventsHub", p.init()), p.init(!0)
                    }

                    var n, i = {
                        "a.twitter-share-button": c,
                        "a.twitter-mention-button": c,
                        "a.twitter-hashtag-button": c,
                        "a.twitter-follow-button": a,
                        "blockquote.twitter-tweet": u,
                        "a.twitter-timeline": l,
                        "div.twitter-timeline": l,
                        "blockquote.twitter-video": d
                    }, o = v.get("eventsHub") ? g.get("events") : {};
                    g.aug("widgets", h, {
                        load: function (t) {
                            r.time("load"), s.init(i), s.embed(t), v.set("widgets.loaded", !0)
                        }
                    }), g.aug("events", o, f.Emitter), n = g.get("events.bind"), g.set("events.bind", function (e, i) {
                        t(), this.bind = n, this.bind(e, i)
                    }), _.resolve(g.base), m.attachTo(e), g.call("widgets.load")
                })
            }()
        }, {
            13: 13,
            17: 17,
            20: 20,
            21: 21,
            24: 24,
            26: 26,
            41: 41,
            42: 42,
            43: 43,
            49: 49,
            50: 50,
            51: 51,
            52: 52,
            55: 55,
            56: 56,
            57: 57,
            61: 61,
            64: 64,
            68: 68,
            71: 71
        }],
        88: [function (t, e, n) {
            function i() {
            }

            var r = t(80), o = t(64);
            r.aug(i.prototype, o.Emitter, {
                transportMethod: "", init: function () {
                }, send: function (t) {
                    var e;
                    this._ready ? this._performSend(t) : e = this.bind("ready", function () {
                        this.unbind("ready", e), this._performSend(t)
                    })
                }, ready: function () {
                    this.trigger("ready", this), this._ready = !0
                }, isReady: function () {
                    return !!this._ready
                }, receive: function (t) {
                    this.trigger("message", t)
                }
            }), e.exports = {Connection: i}
        }, {64: 64, 80: 80}],
        89: [function (t, e, n) {
            function i(t, e) {
                var n = e || Math.floor(100 * Math.random()), i = ['<object id="xdflashshim' + n + '" name="xdflashshim' + n + '"', 'type="application/x-shockwave-flash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"', 'width="1" height="1" style="position:absolute;left:-9999px;top:-9999px;">', '<param name="movie" value="' + t + "&debug=" + r.__XDDEBUG__ + '">', '<param name="wmode" value="window">', '<param name="allowscriptaccess" value="always">', "</object>"].join(" ");
                return i
            }

            var r = t(16);
            e.exports = {object: i}
        }, {16: 16}],
        90: [function (t, e, n) {
            function i(t) {
                return (JSON.parse || JSON.decode)(t)
            }

            function r(t) {
                this.con = t
            }

            function o() {
                this.id = o.id++
            }

            var s = t(80), a = t(64);
            s.aug(r.prototype, {
                expose: function (t) {
                    this.con.bind("message", this._handleRequest(t))
                }, call: function (t) {
                    var e, n = this;
                    return this._requests || (this._requests = {}, this.con.bind("message", function (t) {
                        var e;
                        try {
                            t = i(t)
                        } catch (r) {
                            return
                        }
                        t.callback && "number" == typeof t.id && (e = n._requests[t.id]) && (t.error ? e.trigger("error", t) : e.trigger("success", t), delete n._requests[t.id])
                    })), e = new o, this._requests[e.id] = e, e.send(this.con, t, Array.prototype.slice.call(arguments, 1))
                }, _handleRequest: function (t) {
                    var e = this;
                    return function (n) {
                        var r, o;
                        try {
                            n = i(n)
                        } catch (s) {
                            return
                        }
                        n.callback || "number" == typeof n.id && "function" == typeof t[n.method] && (o = e._responseCallbacks(n.id), r = t[n.method].apply(t, n.params.concat(o)), "undefined" != typeof r && o[0](r))
                    }
                }, _responseCallbacks: function (t) {
                    var e = this.con;
                    return [function (n) {
                        e.send(JSON.stringify({id: t, result: n, callback: !0}))
                    }, function n(i) {
                        e.send(JSON.stringify({id: t, error: n, callback: i}))
                    }]
                }
            }), o.id = 0, s.aug(o.prototype, a.Emitter, {
                send: function (t, e, n) {
                    return t.send(JSON.stringify({id: this.id, method: e, params: n})), this
                }, success: function (t) {
                    return this.bind("success", t), this
                }, error: function (t) {
                    return this.bind("error", t), this
                }
            }), e.exports = function (t) {
                return new r(t)
            }
        }, {64: 64, 80: 80}],
        91: [function (t, e, n) {
            function i() {
            }

            function r(t) {
                this.transportMethod = "PostMessage", this.options = t, this._createChild()
            }

            function o(t) {
                this.transportMethod = "Flash", this.options = t, this.token = Math.random().toString(16).substring(2), this._setup()
            }

            function s(t) {
                this.transportMethod = "Fallback", this.options = t, this._createChild()
            }

            var a, c = t(13), u = t(16), l = t(88), d = t(80), h = t(63), f = t(25), p = "__ready__", m = 0;
            i.prototype = new l.Connection, d.aug(i.prototype, {
                _createChild: function () {
                    this.options.window ? this._createWindow() : this._createIframe()
                }, _createIframe: function () {
                    function t() {
                        o.child = e.contentWindow, o._ready || o.init()
                    }

                    var e, n, i, r, o = this, s = {
                        allowTransparency: !0,
                        frameBorder: "0",
                        scrolling: "no",
                        tabIndex: "0",
                        name: this._name()
                    }, l = d.aug(d.aug({}, s), this.options.iframe);
                    u.postMessage ? (a || (a = c.createElement("iframe")), e = a.cloneNode(!1)) : e = c.createElement('<iframe name="' + l.name + '">'), e.id = l.name, d.forIn(l, function (t, n) {
                        "style" != t && e.setAttribute(t, n)
                    }), r = e.getAttribute("style"), r && "undefined" != typeof r.cssText ? r.cssText = l.style : e.style.cssText = l.style, e.addEventListener("load", t, !1), e.src = this._source(), (n = this.options.appendTo) ? n.appendChild(e) : (i = this.options.replace) ? (n = i.parentNode, n && n.replaceChild(e, i)) : c.body.insertBefore(e, c.body.firstChild)
                }, _createWindow: function () {
                    var t = f.open(this._source()).popup;
                    t && t.focus(), this.child = t, this.init()
                }, _source: function () {
                    return this.options.src
                }, _name: function () {
                    var t = "_xd_" + m++;
                    return u.parent && u.parent != u && u.name && (t = u.name + t), t
                }
            }), r.prototype = new i, d.aug(r.prototype, {
                init: function () {
                    function t(t) {
                        t.source === e.child && (e._ready || t.data !== p ? e.receive(t.data) : e.ready())
                    }

                    var e = this;
                    u.addEventListener("message", t, !1)
                }, _performSend: function (t) {
                    this.child.postMessage(t, this.options.src)
                }
            }), o.prototype = new i, d.aug(o.prototype, {
                _setup: function () {
                    var e = this, n = t(89);
                    u["__xdcb" + e.token] = {
                        receive: function (t) {
                            e._ready || t !== p ? e.receive(t) : e.ready()
                        }, loaded: function () {
                        }
                    };
                    var i = c.createElement("div");
                    i.innerHTML = n.object("https://platform.twitter.com/xd/ft.swf?&token=" + e.token + "&parent=true&callback=__xdcb" + e.token + "&xdomain=" + e._host(), e.token), c.body.insertBefore(i, c.body.firstChild), e.proxy = i.firstChild, e._createChild()
                }, init: function () {
                }, _performSend: function (t) {
                    this.proxy.send(t)
                }, _host: function () {
                    return this.options.src.replace(/https?:\/\//, "").split(/(:|\/)/)[0]
                }, _source: function () {
                    return this.options.src + (this.options.src.match(/\?/) ? "&" : "?") + "xd_token=" + u.escape(this.token)
                }
            }), s.prototype = new i, d.aug(s.prototype, {
                init: function () {
                }, _performSend: function () {
                }
            }), e.exports = {
                connect: function (t) {
                    return !h.canPostMessage() || h.anyIE() && t.window ? h.anyIE() && h.flashEnabled() ? new o(t) : new s(t) : new r(t)
                }
            }
        }, {13: 13, 16: 16, 25: 25, 63: 63, 80: 80, 88: 88, 89: 89}]
    }, {}, [87]))
}();
// The MIT License (MIT)

// Typed.js | Copyright (c) 2014 Matt Boldt | www.mattboldt.com

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


!function ($) {

    "use strict";

    var Typed = function (el, options) {

        // chosen element to manipulate text
        this.el = $(el);

        // options
        this.options = $.extend({}, $.fn.typed.defaults, options);

        // attribute to type into
        this.isInput = this.el.is('input');
        this.attr = this.options.attr;

        // show cursor
        this.showCursor = this.isInput ? false : this.options.showCursor;

        // text content of element
        this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text()

        // html or plain text
        this.contentType = this.options.contentType;

        // typing speed
        this.typeSpeed = this.options.typeSpeed;

        // add a delay before typing starts
        this.startDelay = this.options.startDelay;

        // backspacing speed
        this.backSpeed = this.options.backSpeed;

        // amount of time to wait before backspacing
        this.backDelay = this.options.backDelay;

        // input strings of text
        this.strings = this.options.strings;

        // character number position of current string
        this.strPos = 0;

        // current array position
        this.arrayPos = 0;

        // number to stop backspacing on.
        // default 0, can change depending on how many chars
        // you want to remove at the time
        this.stopNum = 0;

        // Looping logic
        this.loop = this.options.loop;
        this.loopCount = this.options.loopCount;
        this.curLoop = 0;

        // for stopping
        this.stop = false;

        // custom cursor
        this.cursorChar = this.options.cursorChar;

        // shuffle the strings
        this.shuffle = this.options.shuffle;
        // the order of strings
        this.sequence = [];

        // All systems go!
        this.build();
    };

    Typed.prototype = {

        constructor: Typed

        ,
        init: function () {
            // begin the loop w/ first current string (global self.string)
            // current string will be passed as an argument each time after this
            var self = this;
            self.timeout = setTimeout(function () {
                for (var i = 0; i < self.strings.length; ++i) self.sequence[i] = i;

                // shuffle the array if true
                if (self.shuffle) self.sequence = self.shuffleArray(self.sequence);

                // Start typing
                self.typewrite(self.strings[self.sequence[self.arrayPos]], self.strPos);
            }, self.startDelay);
        }

        ,
        build: function () {
            // Insert cursor
            if (this.showCursor === true) {
                this.cursor = $("<span class=\"typed-cursor\">" + this.cursorChar + "</span>");
                this.el.after(this.cursor);
            }
            this.init();
        }

        // pass current string state to each function, types 1 char per call
        ,
        typewrite: function (curString, curStrPos) {
            // exit when stopped
            if (this.stop === true) {
                return;
            }

            // varying values for setTimeout during typing
            // can't be global since number changes each time loop is executed
            var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
            var self = this;

            // ------------- optional ------------- //
            // backpaces a certain string faster
            // ------------------------------------ //
            // if (self.arrayPos == 1){
            //  self.backDelay = 50;
            // }
            // else{ self.backDelay = 500; }

            // contain typing function in a timeout humanize'd delay
            self.timeout = setTimeout(function () {
                // check for an escape character before a pause value
                // format: \^\d+ .. eg: ^1000 .. should be able to print the ^ too using ^^
                // single ^ are removed from string
                var charPause = 0;
                var substr = curString.substr(curStrPos);
                if (substr.charAt(0) === '^') {
                    var skip = 1; // skip atleast 1
                    if (/^\^\d+/.test(substr)) {
                        substr = /\d+/.exec(substr)[0];
                        skip += substr.length;
                        charPause = parseInt(substr);
                    }

                    // strip out the escape character and pause value so they're not printed
                    curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
                }

                if (self.contentType === 'html') {
                    // skip over html tags while typing
                    var curChar = curString.substr(curStrPos).charAt(0)
                    if (curChar === '<' || curChar === '&') {
                        var tag = '';
                        var endTag = '';
                        if (curChar === '<') {
                            endTag = '>'
                        } else {
                            endTag = ';'
                        }
                        while (curString.substr(curStrPos).charAt(0) !== endTag) {
                            tag += curString.substr(curStrPos).charAt(0);
                            curStrPos++;
                        }
                        curStrPos++;
                        tag += endTag;
                    }
                }

                // timeout for any pause after a character
                self.timeout = setTimeout(function () {
                    if (curStrPos === curString.length) {
                        // fires callback function
                        self.options.onStringTyped(self.arrayPos);

                        // is this the final string
                        if (self.arrayPos === self.strings.length - 1) {
                            // animation that occurs on the last typed string
                            self.options.callback();

                            self.curLoop++;

                            // quit if we wont loop back
                            if (self.loop === false || self.curLoop === self.loopCount)
                                return;
                        }

                        self.timeout = setTimeout(function () {
                            self.backspace(curString, curStrPos);
                        }, self.backDelay);
                    } else {

                        /* call before functions if applicable */
                        if (curStrPos === 0)
                            self.options.preStringTyped(self.arrayPos);

                        // start typing each new char into existing string
                        // curString: arg, self.el.html: original text inside element
                        var nextString = curString.substr(0, curStrPos + 1);
                        if (self.attr) {
                            self.el.attr(self.attr, nextString);
                        } else {
                            if (self.isInput) {
                                self.el.val(nextString);
                            } else if (self.contentType === 'html') {
                                self.el.html(nextString);
                            } else {
                                self.el.text(nextString);
                            }
                        }

                        // add characters one by one
                        curStrPos++;
                        // loop the function
                        self.typewrite(curString, curStrPos);
                    }
                    // end of character pause
                }, charPause);

                // humanized value for typing
            }, humanize);

        }

        ,
        backspace: function (curString, curStrPos) {
            // exit when stopped
            if (this.stop === true) {
                return;
            }

            // varying values for setTimeout during typing
            // can't be global since number changes each time loop is executed
            var humanize = Math.round(Math.random() * (100 - 30)) + this.backSpeed;
            var self = this;

            self.timeout = setTimeout(function () {

                // ----- this part is optional ----- //
                // check string array position
                // on the first string, only delete one word
                // the stopNum actually represents the amount of chars to
                // keep in the current string. In my case it's 14.
                // if (self.arrayPos == 1){
                //  self.stopNum = 14;
                // }
                //every other time, delete the whole typed string
                // else{
                //  self.stopNum = 0;
                // }

                if (self.contentType === 'html') {
                    // skip over html tags while backspacing
                    if (curString.substr(curStrPos).charAt(0) === '>') {
                        var tag = '';
                        while (curString.substr(curStrPos).charAt(0) !== '<') {
                            tag -= curString.substr(curStrPos).charAt(0);
                            curStrPos--;
                        }
                        curStrPos--;
                        tag += '<';
                    }
                }

                // ----- continue important stuff ----- //
                // replace text with base text + typed characters
                var nextString = curString.substr(0, curStrPos);
                if (self.attr) {
                    self.el.attr(self.attr, nextString);
                } else {
                    if (self.isInput) {
                        self.el.val(nextString);
                    } else if (self.contentType === 'html') {
                        self.el.html(nextString);
                    } else {
                        self.el.text(nextString);
                    }
                }

                // if the number (id of character in current string) is
                // less than the stop number, keep going
                if (curStrPos > self.stopNum) {
                    // subtract characters one by one
                    curStrPos--;
                    // loop the function
                    self.backspace(curString, curStrPos);
                }
                // if the stop number has been reached, increase
                // array position to next string
                else if (curStrPos <= self.stopNum) {
                    self.arrayPos++;

                    if (self.arrayPos === self.strings.length) {
                        self.arrayPos = 0;

                        // Shuffle sequence again
                        if (self.shuffle) self.sequence = self.shuffleArray(self.sequence);

                        self.init();
                    } else
                        self.typewrite(self.strings[self.sequence[self.arrayPos]], curStrPos);
                }

                // humanized value for typing
            }, humanize);

        }
        /**
         * Shuffles the numbers in the given array.
         * @param {Array} array
         * @returns {Array}
         */
        , shuffleArray: function (array) {
            var tmp, current, top = array.length;
            if (top) while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
            return array;
        }

        // Start & Stop currently not working

        // , stop: function() {
        //     var self = this;

        //     self.stop = true;
        //     clearInterval(self.timeout);
        // }

        // , start: function() {
        //     var self = this;
        //     if(self.stop === false)
        //        return;

        //     this.stop = false;
        //     this.init();
        // }

        // Reset and rebuild the element
        ,
        reset: function () {
            var self = this;
            clearInterval(self.timeout);
            var id = this.el.attr('id');
            this.el.after('<span id="' + id + '"/>')
            this.el.remove();
            if (typeof this.cursor !== 'undefined') {
                this.cursor.remove();
            }
            // Send the callback
            self.options.resetCallback();
        }

    };

    $.fn.typed = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('typed'),
                options = typeof option == 'object' && option;
            if (!data) $this.data('typed', (data = new Typed(this, options)));
            if (typeof option == 'string') data[option]();
        });
    };

    $.fn.typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        // typing speed
        typeSpeed: 0,
        // time before typing starts
        startDelay: 0,
        // backspacing speed
        backSpeed: 0,
        // shuffle the strings
        shuffle: false,
        // time before backspacing
        backDelay: 500,
        // loop
        loop: false,
        // false = infinite
        loopCount: false,
        // show cursor
        showCursor: true,
        // character for cursor
        cursorChar: "|",
        // attribute to type (null == text)
        attr: null,
        // either html or text
        contentType: 'html',
        // call when done callback function
        callback: function () {
        },
        // starting callback function before each string
        preStringTyped: function () {
        },
        //callback for every typed string
        onStringTyped: function () {
        },
        // callback for reset
        resetCallback: function () {
        }
    };


}(window.jQuery);
$(function () {
    $(".element").typed({
        strings: ["Parties.", "Barbecues.", "Friends."],
        typeSpeed: 200,
        startDelay: 0,
        backSpeed: 0,
        backDelay: 700,
        loop: true,
    });
});
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//




