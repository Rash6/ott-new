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
// import  userdata  from '../../server/db/connection';
const userdata = require('../../server/db/connection');
function changeplan(email, plan) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield userdata
            .where({ email: email })
            .update({ plan: plan })
            .from('users');
        return data;
    });
}
function get_user_email(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userdata
                .select('*')
                .where('email', email)
                .from('users')
                .first();
            if (!user.email) {
                return { message: 'not found' };
            }
            return Object.assign(Object.assign({}, user), { message: "success" });
        }
        catch (err) {
            return { message: 'unsuccess' };
        }
    });
}
function get_user_role(role) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_role = yield userdata.select('*')
                .where('role', role)
                .from('users')
                .first();
            if (!user_role.role) {
                return { message: 'not found' };
            }
            return Object.assign(Object.assign({}, user_role), { message: "success" });
        }
        catch (err) {
            return { message: "unsuccess" };
        }
    });
}
function update_user_token(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userdata('users')
                .update({ token: token })
                .where('email', email);
            return Object.assign(Object.assign({}, user), { message: 'success' });
        }
        catch (err) {
            return { message: 'unsuccess' };
        }
    });
}
function getMovies() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield userdata.select('*').from('movies');
            return Object.assign(Object.assign({}, data), { message: 'success' });
        }
        catch (err) {
            return { message: 'unsuccess' };
        }
    });
}
function searchMoviesquery(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield userdata('movies')
            .where({ movie_id: query })
            .returning('*');
        return data;
    });
}
exports.default = { get_user_email, update_user_token, get_user_role, getMovies, searchMoviesquery, changeplan };
