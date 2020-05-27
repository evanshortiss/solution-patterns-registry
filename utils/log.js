'use strict'

const log = require('barelog')

/**
 * Little wrapper to prefix logs with info, error, etc.
 * @param {String} prefix
 * @param {any[]} args
 */
function _log (prefix, args) {
  if (args[0] === 'string') {
    args[0] = `${prefix}:${args[0]}`
  } else {
    args.unshift(`${prefix}:`)
  }

  log.apply(log, args)
}

exports.error = (...args) => _log('ERROR', args)
exports.info = (...args) => _log('INFO', args)
exports.info = (...args) => _log('WARN', args)
