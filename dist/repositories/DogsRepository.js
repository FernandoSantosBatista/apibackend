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
const Dogs_1 = __importDefault(require("../models/Dogs"));
class DogsRepository {
    constructor() {
        this.ormRepository = (0, typeorm_1.getRepository)(Dogs_1.default);
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ormRepository.delete(id);
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
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ormRepository.find();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ormRepository.findOne({
                where: { id },
            });
        });
    }
    create({ name, species, sex, age, size, logo, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dogs = this.ormRepository.create({
                name,
                species,
                sex,
                age,
                size,
                logo,
            });
            yield this.ormRepository.save(dogs);
            return dogs;
        });
    }
    save(dogs) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ormRepository.save(dogs);
        });
    }
}
exports.default = DogsRepository;
