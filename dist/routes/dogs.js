"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DogsController_1 = __importDefault(require("../controllers/DogsController"));
const dogsRoutes = (0, express_1.Router)();
const dogsController = new DogsController_1.default();
dogsRoutes.get('/', dogsController.index);
dogsRoutes.get('/:id', dogsController.show);
dogsRoutes.get('/', dogsController.index);
dogsRoutes.get('/paginated', dogsController.paginated);
dogsRoutes.get('/search', dogsController.search);
dogsRoutes.post('/', dogsController.create);
dogsRoutes.put('/:id', dogsController.update);
dogsRoutes.delete('/:id', dogsController.destroy);
exports.default = dogsRoutes;
