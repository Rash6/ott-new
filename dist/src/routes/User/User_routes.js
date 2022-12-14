"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../controllers/user_controller/user_controller"));
const route = (0, express_1.Router)();
route.get('/getallmovies', user_controller_1.default.getmovies);
route.get('/searchid/:id', user_controller_1.default.searchMovies);
route.put('/changeplan', user_controller_1.default.changeplan);
//route.get('/search',movie_controllers.searchMovies)
//route.get('/searchbymoviename',movie_controllers.singleMovie)
exports.default = route;
