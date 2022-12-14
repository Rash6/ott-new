"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../controllers/user_controller/user_controller"));
const route = (0, express_1.Router)();
route.post("/get_otp", user_controller_1.default.get_otp);
route.post('/verify', user_controller_1.default.login_user);
exports.default = route;
