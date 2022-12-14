"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_check_role = exports.check_user_role = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const check_user_role = (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        const token = (auth === null || auth === void 0 ? void 0 : auth.split(" ")[1]) || "tpoken";
        const decoded = jsonwebtoken_1.default.verify(token, "plural");
        if (decoded.role === "admin") {
            next();
        }
        else {
            res.status(401).send({ message: "Access denied" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "something went wrong", status: false });
    }
    ;
};
exports.check_user_role = check_user_role;
const user_check_role = (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        const token = (auth === null || auth === void 0 ? void 0 : auth.split(" ")[1]) || "tpoken";
        const decoded = jsonwebtoken_1.default.verify(token, "plural");
        if (decoded.role === "user") {
            next();
        }
        else {
            res.status(401).send({ message: "Access denied" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "something went wrong", status: false });
    }
    ;
};
exports.user_check_role = user_check_role;
