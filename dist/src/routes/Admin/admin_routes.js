"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRole = require('../../middleware/user_access');
const admin_controller_1 = __importDefault(require("../../controllers/Admin_controller/admin_controller"));
const route = (0, express_1.Router)();
route.post("/new_content", userRole.check_user_role, admin_controller_1.default);
exports.default = route;
