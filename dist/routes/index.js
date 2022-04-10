"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const session_1 = __importDefault(require("./session"));
const dogs_1 = __importDefault(require("./dogs"));
const client_1 = __importDefault(require("./client"));
const routes = (0, express_1.Router)();
const prefixRoutes = '/api/v1';
routes.get('/', (request, response) => response.json({ message: 'Hello Code83' }));
routes.use(`${prefixRoutes}/login`, session_1.default);
routes.use(`${prefixRoutes}/users`, user_1.default);
routes.use(`${prefixRoutes}/dogs`, dogs_1.default);
routes.use(`${prefixRoutes}/adopters`, client_1.default);
exports.default = routes;
