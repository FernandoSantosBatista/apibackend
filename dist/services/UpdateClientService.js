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
const AppError_1 = __importDefault(require("../errors/AppError"));
class UpdateClientService {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    execute({ id, name, email, telephone, description, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.clientRepository.findById(id);
            if (!client) {
                throw new AppError_1.default('Client not found!', 400);
            }
            if (email !== client.email) {
                const verifyEmail = this.clientRepository.findByEmail(email);
                if (yield verifyEmail) {
                    throw new AppError_1.default('E-mail already used!', 400);
                }
            }
            client.name = name;
            client.email = email;
            client.telephone = telephone;
            client.description = description;
            yield this.clientRepository.save(client);
            return client;
        });
    }
}
exports.default = UpdateClientService;