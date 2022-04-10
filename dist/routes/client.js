"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClientController_1 = __importDefault(require("../controllers/ClientController"));
const clientRoutes = (0, express_1.Router)();
const clientController = new ClientController_1.default();
clientRoutes.get('/', clientController.index);
clientRoutes.get('/:id', clientController.show);
clientRoutes.get('/paginated', clientController.paginated);
clientRoutes.get('/search', clientController.search);
clientRoutes.post('/', clientController.create);
clientRoutes.put('/:id', clientController.update);
clientRoutes.delete('/:id', clientController.destroy);
exports.default = clientRoutes;
