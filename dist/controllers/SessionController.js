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
const SessionService_1 = __importDefault(require("../services/SessionService"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
class SessionController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request.body;
            const userRespository = new UserRepository_1.default();
            const createSesison = new SessionService_1.default(userRespository);
            const session = yield createSesison.execute({
                email,
                password,
            });
            return response.json(session);
        });
    }
}
exports.default = SessionController;
