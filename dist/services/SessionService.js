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
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = __importDefault(require("../errors/AppError"));
class SessionService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(email);
            if (!user) {
                throw new AppError_1.default('Credenciais inválidas', 401);
            }
            const passwordCompare = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!passwordCompare) {
                throw new AppError_1.default('Credenciais inválidas', 401);
            }
            if (!user.active) {
                throw new AppError_1.default('Usuário inativo', 401);
            }
            const token = (0, jsonwebtoken_1.sign)({}, process.env.APP_SECRET, {
                expiresIn: '1d',
            });
            return {
                token,
                user,
            };
        });
    }
}
exports.default = SessionService;
