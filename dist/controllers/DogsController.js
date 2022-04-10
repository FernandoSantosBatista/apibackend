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
const DogsRepository_1 = __importDefault(require("../repositories/DogsRepository"));
const CreateDogsService_1 = __importDefault(require("../services/CreateDogsService"));
const DeleteDogsService_1 = __importDefault(require("../services/DeleteDogsService"));
const ListAllDogsService_1 = __importDefault(require("../services/ListAllDogsService"));
const PaginatedDogsService_1 = __importDefault(require("../services/PaginatedDogsService"));
const ShowDogsService_1 = __importDefault(require("../services/ShowDogsService"));
const UpdateDogsService_1 = __importDefault(require("../services/UpdateDogsService"));
class DogsController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const dogsRepository = new DogsRepository_1.default();
            const dogsService = new ListAllDogsService_1.default(dogsRepository);
            const dogs = yield dogsService.execute();
            return response.json(dogs);
        });
    }
    paginated(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page } = request.query;
            const dogsRepository = new DogsRepository_1.default();
            const dogsPaginated = new PaginatedDogsService_1.default(dogsRepository);
            const dogs = yield dogsPaginated.execute({
                page: page !== undefined ? parseInt(page.toString(), 10) : 0,
            });
            return response.json(dogs);
        });
    }
    search(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = request.query;
            const dogsRepository = new DogsRepository_1.default();
            const dogs = yield dogsRepository.finAllByName((name === null || name === void 0 ? void 0 : name.toString()) || '');
            return response.json(dogs);
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const dogsRepository = new DogsRepository_1.default();
            const dogsService = new ShowDogsService_1.default(dogsRepository);
            const dogs = yield dogsService.execute(id);
            return response.json(dogs);
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, species, sex, age, size, logo } = request.body;
            const dogsRepository = new DogsRepository_1.default();
            const createDogs = new CreateDogsService_1.default(dogsRepository);
            const dogs = yield createDogs.execute({
                name,
                species,
                sex,
                age,
                size,
                logo,
            });
            return response.status(201).json(dogs);
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const { name, species, sex, age, size, logo } = request.body;
            const dogsRepository = new DogsRepository_1.default();
            const updateDogs = new UpdateDogsService_1.default(dogsRepository);
            const dogs = yield updateDogs.execute({
                id,
                name,
                species,
                sex,
                age,
                size,
                logo,
            });
            return response.json(dogs);
        });
    }
    destroy(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const dogsRepository = new DogsRepository_1.default();
            const destroyDogs = new DeleteDogsService_1.default(dogsRepository);
            yield destroyDogs.execute(id);
            return response.status(204).send();
        });
    }
}
exports.default = DogsController;
