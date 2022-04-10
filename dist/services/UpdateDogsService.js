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
class UpdateDogsService {
    constructor(dogsRepository) {
        this.dogsRepository = dogsRepository;
    }
    execute({ id, name, species, sex, age, size, logo, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dogs = yield this.dogsRepository.findById(id);
            if (!dogs) {
                throw new AppError_1.default('Dogs not found', 400);
            }
            dogs.name = name;
            dogs.species = species;
            dogs.sex = sex;
            dogs.age = age;
            dogs.size = size;
            dogs.logo = logo;
            yield this.dogsRepository.save(dogs);
            return dogs;
        });
    }
}
exports.default = UpdateDogsService;
