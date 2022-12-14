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
//import movies_queries from '../../queries/Movies_queries/movies_queries';
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const movies_queries_1 = __importDefault(require("../../queries/Movies_queries/movies_queries"));
const errorClass_1 = __importDefault(require("../../utils/errorClass"));
//get all movies
function getmovies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const movie_list = yield movies_queries_1.default.getMovies();
        try {
            const movie_list = yield movies_queries_1.default.getMovies();
            res.status(200).send({ message: 'success', movies: movie_list });
        }
        catch (err) {
            res.status(500).send({ message: 'unsuccess' });
        }
    });
}
//get movies by id
function searchMovies(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(req.params)
        // const {q}=req.params;
        // console.log(q)
        try {
            console.log(req.params);
            const { id } = req.params;
            // console.log(id,"qqqqq")
            const single_movie_data = yield movies_queries_1.default.searchMoviesquery(id, "all");
            console.log(single_movie_data, "movieda");
            if (single_movie_data.length > 0) {
                res.status(200).send({ message: 'success', movie_data: single_movie_data });
            }
            else {
                // res.status(500).send({message:"unsuccess"})
                throw new errorClass_1.default("data_not_found", "unsuccess");
            }
        }
        catch (er) {
            console.log(er, "err");
            next(er);
            // res.status(500).send({message:"unsuccess"})
        }
    });
}
function watchMovies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("entered");
            const { id } = req.params;
            const auth = req.headers.authorization;
            const token = (auth === null || auth === void 0 ? void 0 : auth.split(" ")[1]) || "tpoken";
            const decoded = jsonwebtoken_1.default.verify(token, "plural");
            console.log(id, decoded.plan);
            const single_movie_data = yield movies_queries_1.default.searchMoviesquery(id, decoded.plan);
            if (single_movie_data.length > 0) {
                res.status(200).send({ message: 'success', movie_data: single_movie_data });
            }
            else {
                res.status(500).send({ message: "unsuccess" });
            }
        }
        catch (er) {
            res.status(500).send({ message: "unsuccess" });
        }
    });
}
// async function singleMovie(req:Request,res:Response){
//     try{
//         const {q}=req.query
//         const single_movie_data=await movie_query.singleMovie(q)
//         if(single_movie_data.length>0){
//         res.status(200).send({message:'success',movie_data:single_movie_data})
//         }else{
//             res.status(500).send({message:"unsuccess"})
//         }
//     }catch(er){
//         res.status(500).send({message:"unsuccess"})
//     }
// }
exports.default = { getmovies, searchMovies, watchMovies };
