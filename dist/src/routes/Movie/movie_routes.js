"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_controller_1 = __importDefault(require("../../controllers/Movie_controller/movie_controller"));
const user_access_1 = require("../../middleware/user_access");
const route = (0, express_1.Router)();
route.get('/getallmovies', movie_controller_1.default.getmovies);
route.get('/searchid/:id', movie_controller_1.default.searchMovies);
//route.get('/search',movie_controllers.searchMovies)
//route.get('/searchbymoviename',movie_controllers.singleMovie)
route.get('/watchMovie/:id', user_access_1.user_check_role, movie_controller_1.default.watchMovies);
exports.default = route;
