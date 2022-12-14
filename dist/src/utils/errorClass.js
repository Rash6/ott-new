"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustumError extends Error {
    constructor(errorType, message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.errorType = errorType;
        Error.captureStackTrace(this);
    }
}
exports.default = CustumError;
