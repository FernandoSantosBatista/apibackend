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
const typeorm_1 = require("typeorm");
const Client_1 = __importDefault(require("../models/Client"));
class ClientRepository {
    constructor() {
        this.ormRepository = (0, typeorm_1.getRepository)(Client_1.default);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ormRepository.find();
        });
    }
    findAllPaginated(page) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ormRepository.findAndCount({
                skip: page,
                take: 10,
            });
        });
    }
    finAllByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ormRepository.find({
                name: (0, typeorm_1.Like)(`%${name}%`),
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ormRepository.findOne({
                where: { id },
            });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ormRepository.findOne({
                where: { email },
            });
        });
    }
    create({ name, email, telephone, description, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.ormRepository.create({
                name,
                email,
                telephone,
                description,
            });
            yield this.ormRepository.save(client);
            return client;
        });
    }
    save(client) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ormRepository.save(client);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ormRepository.delete(id);
        });
    }
}
exports.default = ClientRepository;
