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
const sinon_1 = __importDefault(require("sinon"));
const utils_1 = __importDefault(require("./utils"));
describe.only('test for utils', () => {
    afterEach(() => {
        sinon_1.default.restore();
    });
    it("jwt should give token", () => {
        const token = utils_1.default.generateJWT('rashmirohini20@gmail.com', 'abcdef', 'user');
        expect(token).toBeDefined();
    });
    it('verify jwt should give true on correct token', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield utils_1.default.verifyJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhc2htaW4yMDk2QGdtYWlsLmNvbSIsIm90cCI6ImdoYXoybCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjcwODM2NTI3LCJleHAiOjE2NzEyNjg1Mjd9.LHIO4kKL5DWGVoqPObSMoFDEkXHr8oKBSqWBvct7Hv4');
        expect(result).toEqual({
            email: "rashmin2096@gmail.com",
            exp: 1671268527,
            iat: 1670836527,
            otp: "ghaz2l",
            role: "user",
        });
    }));
    it("validate email and should give false if its invalid mail", () => {
        const result = utils_1.default.validateEmail('rashmirohini20@gmailcom');
        expect(result).toBe(false);
    });
    it("send mail should give message successful", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield utils_1.default.sendMail({
            email: "rash.u.102022@gmail.com",
            otp: "abcdef"
        });
        expect(result.message).toBe('success');
    }));
    it('send mail should give message unsuccessful on invalid mail', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield utils_1.default.sendMail({
            email: "",
            otp: ""
        });
        expect(result.message).toBe('unsuccess');
    }));
});
