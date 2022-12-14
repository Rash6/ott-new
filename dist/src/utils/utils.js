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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan_1 = __importDefault(require("bunyan"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer = require('nodemailer');
const uuid_1 = require("uuid");
const hbs = require('hbs');
require('dotenv').config();
const log = bunyan_1.default.createLogger({ name: 'ott_platform', request_id: (0, uuid_1.v4)() });
function generateJWT(email, otp, role, plan, expiresIn = `1d`) {
    return jsonwebtoken_1.default.sign({ email, otp, role, plan }, process.env.jwt_secret, {
        expiresIn: expiresIn,
    });
}
function verifyJWT(token) {
    return jsonwebtoken_1.default.verify(token, process.env.jwt_secret, (err, decoded) => {
        if (err) {
            return false;
        }
        return decoded;
    });
}
function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
    return false;
}
function sendMail(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(process.env.nodemailer_email, process.env.nodemailer_password);
        try {
            let transport = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.nodemailer_email,
                    pass: process.env.nodemailer_password,
                },
            });
            const content = `
        <div style="margin:auto;">
        <h3>Hello,{{email}}</h3>
        <p>Here is your one time password </p>
        <h1>{{otp}}</h1>
        <p>Note: Please Note that otp is one time use only and it will expires in 2 mins.</p>
        <p>If you did not do this please reset your password immediately.</p>
    </div> `;
            const template = hbs.compile(content);
            let info = yield transport.sendMail({
                from: 'ott ottplatform@gmail.com',
                to: data.email,
                subject: 'login OTP',
                html: template({
                    useremail: data.email,
                    otp: data.otp,
                }),
            });
            return { message: 'success' };
        }
        catch (e) {
            console.log(e);
            return { message: 'unsuccess' };
        }
    });
}
exports.default = { log, generateJWT, verifyJWT, validateEmail, sendMail };
