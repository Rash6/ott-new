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
const MoviesDB = require("../../server/db/connection");
function getMovies() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield MoviesDB.select('*').from('movies');
            return Object.assign(Object.assign({}, data), { message: 'success' });
        }
        catch (err) {
            return { message: 'unsuccess' };
        }
    });
}
// async function getMoviesbyid(query:any){
//     console.log(query)
//     const data = await MoviesDB('movies')
//     .where(MoviesDB.raw(`(LOWER(movies.movie_id)) ILIKE ?`, [`%${query}%`]))
//     .returning('*')
//     console.log(data,"shjk")
//     return data
// }
function searchMoviesquery(query, plan) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield MoviesDB('movies')
            .where({ movie_id: query });
        if (plan === "all")
            return data;
        if (data[0].access_plan === "basic")
            return data;
        else if (plan === "premium")
            return data;
        else
            return "Buy premium plan for this movie";
    });
}
function createMovie(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield MoviesDB('movies').insert(payload).returning('*');
        return data;
    });
}
// async function singleMovie(query:any){
//     //console.log(query)
//    const data= await MoviesDB('movies')   
//    .where(MoviesDB.raw(`(LOWER(movies.movie_name)) ILIKE ?`, [`%${query}%`]))
//    .returning('*');
//     return data
// }
exports.default = { getMovies, searchMoviesquery, createMovie };
