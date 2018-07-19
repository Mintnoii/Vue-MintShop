'use strict';

var util = require('util');

/**
 * Creates a new MongoError
 * @class
 * @augments Error
 * @param {Error|string|object} message The error message
 * @property {string} message The error message
 * @property {string} stack The error call stack
 * @return {MongoError} A MongoError instance
 */
function MongoError(message) {
  var tmp = Error.apply(this, arguments);
  tmp.name = this.name = 'MongoError';

  if (message instanceof Error) {
    this.message = message.message;
    this.stack = message.stack;
  } else {
    if (typeof message === 'string') {
      this.message = message;
    } else {
      this.message = message.message || message.errmsg || message.$err || 'n/a';
      for (var name in message) {
        this[name] = message[name];
      }
    }
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
util.inherits(MongoError, Error);

/**
 * Creates a new MongoError object
 * @method
 * @param {Error|string|object} options The options used to create the error.
 * @return {MongoError} A MongoError instance
 * @deprecated Use `new MongoError()` instead.
 */
MongoError.create = function(options) {
  return new MongoError(options);
};

/**
 * Creates a new MongoNetworkError
 * @class
 * @param {Error|string|object} message The error message
 * @property {string} message The error message
 * @property {string} stack The error call stack
 * @return {MongoNetworkError} A MongoNetworkError instance
 * @extends {MongoError}
 */
var MongoNetworkError = function(message) {
  MongoError.call(this, message);
  this.name = 'MongoNetworkError';
};
util.inherits(MongoNetworkError, MongoError);

/**
 * An error used when attempting to parse a value (like a connection string)
 *
 * @class
 * @param {Error|string|object} message The error message
 * @property {string} message The error message
 * @return {MongoParseError} A MongoNetworkError instance
 * @extends {MongoError}
 */
const MongoParseError = function(message) {
  MongoError.call(this, message);
  this.name = 'MongoParseError';
};
util.inherits(MongoParseError, MongoError);

// see: https://github.com/mongodb/specifications/blob/master/source/retryable-writes/retryable-writes.rst#terms
const RETRYABLE_ERROR_CODES = new Set([
  6, // HostUnreachable
  7, // HostNotFound
  64, // WriteConcernFailed
  89, // NetworkTimeout
  91, // ShutdownInProgress
  189, // PrimarySteppedDown
  9001, // SocketException
  11600, // InterruptedAtShutdown
  11602, // InterruptedDueToReplStateChange
  10107, // NotMaster
  13435, // NotMasterNoSlaveOk
  13436 // NotMasterOrSecondary
]);

function isRetryableError(error) {
  if (
    RETRYABLE_ERROR_CODES.has(error.code) ||
    error instanceof MongoNetworkError ||
    error.message.match(/not master/) ||
    error.message.match(/node is recovering/)
  ) {
    return true;
  }

  return false;
}

module.exports = {
  MongoError,
  MongoNetworkError,
  MongoParseError,
  isRetryableError
};
