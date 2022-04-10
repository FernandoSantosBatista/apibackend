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
const CreateUserService_1 = __importDefault(require("../services/CreateUserService"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const EnableUserService_1 = __importDefault(require("../services/EnableUserService"));
class UserController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = request.body;
            const userRespository = new UserRepository_1.default();
            const createUser = new CreateUserService_1.default(userRespository);
            const user = yield createUser.execute({
                name,
                email,
                password,
            });
            return response.json(user);
        });
    }
    enable(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const userRespository = new UserRepository_1.default();
            const enableUser = new EnableUserService_1.default(userRespository);
            const user = yield enableUser.execute({
                id,
            });
            return response.json(user);
        });
    }
}
exports.default = UserController;
