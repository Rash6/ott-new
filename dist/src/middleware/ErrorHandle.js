"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (Error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    switch (Error.errorType) {
        case "validation_error": {
            res.status(401).json({
                message: Error.message,
            });
            break;
        }
        case "data_not_found": {
            res.status(404).json({
                message: Error.message,
            });
            break;
        }
        case "not_found": {
            res.status(404).json({
                message: Error.message
            });
            break;
        }
        case "authentication": {
            res.status(401).json({
                message: Error.message
            });
            break;
        }
        case "user_id should be unique": {
            res.status(401).json({
                message: Error.message
            });
            break;
        }
        case "invalid_req": {
            res.status(401).json({
                message: Error.message
            });
            break;
        }
        default: {
            res.status(500).json("internal server error");
        }
    }
});
exports.errorHandler = errorHandler;
