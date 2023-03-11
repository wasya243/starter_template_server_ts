import os from 'os';
import _ from 'lodash';

const LOG_LEVELS: { [key: string]: string } = {
    DEBUG: "debug",
    ERROR: "error",
    INFO: "info",
    WARNING: "warning",
    LOG: "log",
};

export class Logger {
    private readonly hostname: string;
    private readonly pid: number;
    private boundLog: CallableFunction | null
    private boundError: CallableFunction | null
    private boundInfo: CallableFunction | null
    private boundWarn: CallableFunction | null
    private boundDebug: CallableFunction | null

    constructor() {
        this.hostname = os.hostname();
        this.pid = process.pid;
        this.boundLog = null;
        this.boundError = null;
        this.boundInfo = null;
        this.boundWarn = null;
        this.boundDebug = null;
    }

    _isObject(value: any): boolean {
        return (
            _.isObject(value) &&
            !_.isArray(value) &&
            !_.isError(value) &&
            !_.isFunction(value)
        );
    }

    _getDateString(): string {
        return new Date().toISOString();
    }

    _getMessageFields(additionalFields: object, level: string, msg: string): object {
        return {
            message: msg,
            level: level,
            hostname: this.hostname,
            pid: this.pid,
            time: this._getDateString(),
            ...additionalFields,
        };
    }

    _printFields(fields: any): void {
        if (!this.boundLog) {
            console.error("unable to print without overriding console");
            return;
        }

        let output = JSON.stringify(fields);
        if (fields.level === LOG_LEVELS.LOG) {
            this.boundLog && this.boundLog(output);
        } else if (fields.level === LOG_LEVELS.ERROR) {
            this.boundError && this.boundError(output);
        } else if (fields.level === LOG_LEVELS.DEBUG) {
            this.boundDebug && this.boundDebug(output);
        } else if (fields.level === LOG_LEVELS.INFO) {
            this.boundInfo && this.boundInfo(output);
        } else if (fields.level === LOG_LEVELS.WARNING) {
            this.boundWarn && this.boundWarn(output);
        }
    }

    _processArgs(args: any[] = []): Array<string> {
        return args.map((arg: any) => {
            let processedArg;
            if (typeof arg === "object" && !(arg instanceof Error) && arg !== null) {
                processedArg = JSON.stringify(arg);
            } else if (typeof arg === "undefined") {
                processedArg = "undefined";
            } else if (arg === null) {
                processedArg = "null";
            } else {
                processedArg = arg.toString();
            }

            return processedArg;
        });
    }

    _getFieldsToMergeAndArgsToProcess(args: any[] = []): { fieldsToInclude: any, argsToProcess: any } {
        const isFirstArgObject = this._isObject(args[0]);
        const fieldsToInclude = isFirstArgObject ? args[0] : {};
        const argsToProcess = isFirstArgObject ? args.slice(1) : args;

        return {
            fieldsToInclude,
            argsToProcess,
        };
    }

    log(...args: any[]): void {
        const {fieldsToInclude, argsToProcess} =
            this._getFieldsToMergeAndArgsToProcess(args);

        this._printFields(
            this._getMessageFields(
                fieldsToInclude,
                LOG_LEVELS.LOG,
                this._processArgs(argsToProcess).join(" ")
            )
        );
    }

    error(...args: any[]): void {
        const {fieldsToInclude, argsToProcess} =
            this._getFieldsToMergeAndArgsToProcess(args);

        this._printFields(
            this._getMessageFields(
                fieldsToInclude,
                LOG_LEVELS.ERROR,
                this._processArgs(argsToProcess).join(" ")
            )
        );
    }

    info(...args: any[]): void {
        const {fieldsToInclude, argsToProcess} =
            this._getFieldsToMergeAndArgsToProcess(args);

        this._printFields(
            this._getMessageFields(
                fieldsToInclude,
                LOG_LEVELS.INFO,
                this._processArgs(argsToProcess).join(" ")
            )
        );
    }

    warn(...args: any[]): void {
        const {fieldsToInclude, argsToProcess} =
            this._getFieldsToMergeAndArgsToProcess(args);

        this._printFields(
            this._getMessageFields(
                fieldsToInclude,
                LOG_LEVELS.WARNING,
                this._processArgs(argsToProcess).join(" ")
            )
        );
    }

    debug(...args: any[]): void {
        const {fieldsToInclude, argsToProcess} =
            this._getFieldsToMergeAndArgsToProcess(args);

        this._printFields(
            this._getMessageFields(
                fieldsToInclude,
                LOG_LEVELS.DEBUG,
                this._processArgs(argsToProcess).join(" ")
            )
        );
    }

    setup() {
        if (this.boundLog) {
            console.log("already overrode console");
            return;
        }

        // Override console.log to user our json logger.
        this.boundLog = console.log.bind(console);
        console.log = (...args) => {
            this.log(...args);
        };

        // Override console.error to user our json logger.
        this.boundError = console.error.bind(console);
        console.error = (...args) => {
            this.error(...args);
        };

        // Override console.info to user our json logger.
        this.boundInfo = console.info.bind(console);
        console.info = (...args) => {
            this.info(...args);
        };

        // Override console.warn to user our json logger.
        this.boundWarn = console.warn.bind(console);
        console.warn = (...args) => {
            this.warn(...args);
        };

        // Override console.warn to user our json logger.
        this.boundDebug = console.debug.bind(console);
        console.debug = (...args) => {
            this.debug(...args);
        };
    }
}
