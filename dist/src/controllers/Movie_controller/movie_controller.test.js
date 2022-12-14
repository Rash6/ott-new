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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const movies_queries_1 = __importDefault(require("../../queries/Movies_queries/movies_queries"));
describe("testing for get all movies", () => {
    let query;
    beforeEach(() => {
        query = sinon_1.default.stub(movies_queries_1.default, "getMovies");
    });
    afterEach(() => {
        query.restore();
    });
    it("get request success with success status message", () => __awaiter(void 0, void 0, void 0, function* () {
        query.resolves([{
                test: "test"
            }]);
        const res = yield (0, supertest_1.default)(index_1.default).get('/movies/getallmovies');
        console.log(res, "abd");
        expect(res.body.message).toEqual('success');
    }));
});
describe("testing for search movie/by giving any params", () => {
    let query;
    beforeEach(() => {
        query = sinon_1.default.stub(movies_queries_1.default, "searchMoviesquery");
    });
    afterEach(() => {
        query.restore();
    });
    it("get movies search results is successfull then received the status message success  ", () => __awaiter(void 0, void 0, void 0, function* () {
        query.resolves([{
                test: "test"
            }]);
        const res = yield (0, supertest_1.default)(index_1.default).get("/movies/search/?q=Google");
        expect(res.body).toEqual({
            message: "success",
            data: [{
                    test: "test"
                }]
        });
    }));
    it("get movies search results is unsuccessfull then received the status message unsuccess  ", () => __awaiter(void 0, void 0, void 0, function* () {
        query.resolves([]);
        const res = yield (0, supertest_1.default)(index_1.default).get("/movies/search/?q=dell");
        expect(res.body).toEqual({
            message: "unsuccess"
        });
    }));
});
describe("testing for search by only movie name", () => {
    let query;
    beforeEach(() => {
        query = sinon_1.default.stub(movies_queries_1.default, "singleMovie");
    });
    afterEach(() => {
        query.restore();
    });
    it("checking for the movie name serached if result is success ", () => __awaiter(void 0, void 0, void 0, function* () {
        query.resolves([{
                test: "test"
            }]);
        const res = yield (0, supertest_1.default)(index_1.default).get("/movies/searchbymoviename/?q=Google");
        expect(res.body).toEqual({
            message: "success",
            movie_data: [{
                    test: "test"
                }]
        });
    }));
    it("checking for the movie name serached if result is unsuccess ", () => __awaiter(void 0, void 0, void 0, function* () {
        query.resolves([]);
        const res = yield (0, supertest_1.default)(index_1.default).get("/movies/searchbymoviename/?q=dell");
        expect(res.body).toEqual({
            message: "unsuccess"
        });
    }));
    it("checking for the movie name serached if result is unsuccess ", () => __awaiter(void 0, void 0, void 0, function* () {
        query.resolves([]);
        const res = yield (0, supertest_1.default)(index_1.default).get("/movies/searchbymoviename/?q=");
        expect(res.body).toEqual({
            message: "unsuccess"
        });
    }));
});
