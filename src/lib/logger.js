const os = require('os')
const _ = require('lodash')

const LOG_LEVELS = {
    DEBUG: 'debug',
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning',
    LOG: 'log'
}

class Logger {
    hostname
    pid
    boundLog
    boundError

    constructor() {
        this.hostname = os.hostname()
        this.pid = process.pid
        this.boundLog = null
        this.boundError = null
        this.boundInfo = null
        this.boundWarn = null
        this.boundDebug = null
    }

    _isObject(value) {
        return _.isObject(value) && !_.isArray(value) && !_.isError(value) && !_.isFunction(value)
    }

    _getDateString() {
        return new Date().toISOString()
    }

    _getMessageFields(additionalFields, level, msg) {
        return {
            message: msg,
            name: this.name,
            level: level,
            hostname: this.hostname,
            pid: this.pid,
            time: this._getDateString(),
            ...additionalFields
        }
    }

    _printFields(fields) {
        if (!this.boundLog) {
            console.error('unable to print without overriding console')
            return;
        }

        let output = JSON.stringify(fields)
        if (fields.level === LOG_LEVELS.LOG) {
            this.boundLog(output)
        } else if (fields.level === LOG_LEVELS.ERROR) {
            this.boundError(output)
        } else if (fields.level === LOG_LEVELS.DEBUG) {
            this.boundDebug(output)
        } else if (fields.level === LOG_LEVELS.INFO) {
            this.boundInfo(output)
        } else if (fields.level === LOG_LEVELS.WARNING) {
            this.boundWarn(output)
        }
    }

    _processArgs(args = []) {
        return args.map(arg => {
            let processedArg
            if (typeof arg === 'object' && !(arg instanceof Error) && arg !== null) {
                processedArg = JSON.stringify(arg)
            } else if (typeof arg === 'undefined') {
                processedArg = 'undefined'
            } else if (arg === null) {
                processedArg = 'null'
            } else {
                processedArg = arg.toString()
            }

            return processedArg
        })
    }

    _getFieldsToMergeAndArgsToProcess(args = []) {
        const isFirstArgObject = this._isObject(args[0])
        const fieldsToInclude = isFirstArgObject ? args[0] : {}
        const argsToProcess = isFirstArgObject ? args.slice(1) : args

        return {
            fieldsToInclude,
            argsToProcess
        }
    }

    log(...args) {
        const {fieldsToInclude, argsToProcess} = this._getFieldsToMergeAndArgsToProcess(args);

        this._printFields(this._getMessageFields(fieldsToInclude, LOG_LEVELS.LOG, this._processArgs(argsToProcess).join(' ')));
    }

    error(...args) {
        const {fieldsToInclude, argsToProcess} = this._getFieldsToMergeAndArgsToProcess(args);

        this._printFields(this._getMessageFields(fieldsToInclude, LOG_LEVELS.ERROR, this._processArgs(argsToProcess).join(' ')));
    }

    info(...args) {
        const {fieldsToInclude, argsToProcess} = this._getFieldsToMergeAndArgsToProcess(args);

        this._printFields(this._getMessageFields(fieldsToInclude, LOG_LEVELS.INFO, this._processArgs(argsToProcess).join(' ')));
    }

    warn(...args) {
        const {fieldsToInclude, argsToProcess} = this._getFieldsToMergeAndArgsToProcess(args);

        this._printFields(this._getMessageFields(fieldsToInclude, LOG_LEVELS.WARNING, this._processArgs(argsToProcess).join(' ')));
    }

    debug(...args) {
        const {fieldsToInclude, argsToProcess} = this._getFieldsToMergeAndArgsToProcess(args);

        this._printFields(this._getMessageFields(fieldsToInclude, LOG_LEVELS.DEBUG, this._processArgs(argsToProcess).join(' ')));
    }

    setup() {
        if (this.boundLog) {
            console.log('already overrode console')
            return
        }

        // Override console.log to user our json logger.
        this.boundLog = console.log.bind(console)
        console.log = (...args) => {
            this.log(...args)
        };

        // Override console.error to user our json logger.
        this.boundError = console.error.bind(console)
        console.error = (...args) => {
            this.error(...args)
        };

        // Override console.info to user our json logger.
        this.boundInfo = console.info.bind(console)
        console.info = (...args) => {
            this.info(...args)
        }

        // Override console.warn to user our json logger.
        this.boundWarn = console.warn.bind(console)
        console.warn = (...args) => {
            this.warn(...args);
        }

        // Override console.warn to user our json logger.
        this.boundDebug = console.debug.bind(console)
        console.debug = (...args) => {
            this.debug(...args);
        }
    }
}

module.exports = Logger