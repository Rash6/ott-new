"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const login_routes_1 = __importDefault(require("./routes/Login/login_routes"));
const movie_routes_1 = __importDefault(require("./routes/Movie/movie_routes"));
const admin_routes_1 = __importDefault(require("./routes/Admin/admin_routes"));
const User_routes_1 = __importDefault(require("./routes/User/User_routes"));
require('dotenv').config();
const express = require("express");
const app = express();
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");
const swaggerUi = require("swagger-ui-express");
app.use(express.json());
app.use((0, cookie_parser_1.default)());
//app.use("/api-docs",swaggerUi.server,swaggerUi.setup(swaggerDoc))
app.get("/", (req, res) => {
    res.status(200).send({ message: "welcome to ott platform" });
});
//routes
app.use('/login', login_routes_1.default);
app.use('/movies', movie_routes_1.default);
app.use('/admin', admin_routes_1.default);
app.use('/user', User_routes_1.default);
app.use((req, res) => {
    res.status(404).send({ message: 'route not found' });
});
app.listen(process.env.PORT, () => {
    console.log(`serving the port ${process.env.PORT}`);
});
exports.default = app;
