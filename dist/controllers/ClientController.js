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
const ClientRepository_1 = __importDefault(require("../repositories/ClientRepository"));
const CreateClientService_1 = __importDefault(require("../services/CreateClientService"));
const UpdateClientService_1 = __importDefault(require("../services/UpdateClientService"));
const PaginatedClientsService_1 = __importDefault(require("../services/PaginatedClientsService"));
const DeleteClientService_1 = __importDefault(require("../services/DeleteClientService"));
const ShowClientsService_1 = __importDefault(require("../services/ShowClientsService"));
class ClientController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientRepository = new ClientRepository_1.default();
            const clients = yield clientRepository.findAll();
            return response.json(clients);
        });
    }
    paginated(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page } = request.query;
            const clientRepository = new ClientRepository_1.default();
            const clientsPaginated = new PaginatedClientsService_1.default(clientRepository);
            const clients = yield clientsPaginated.execute({
                page: page !== undefined ? parseInt(page.toString(), 10) : 0,
            });
            return response.json(clients);
        });
    }
    search(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = request.query;
            const clientRepository = new ClientRepository_1.default();
            const clients = yield clientRepository.finAllByName((name === null || name === void 0 ? void 0 : name.toString()) || '');
            return response.json(clients);
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, telephone, description } = request.body;
            const clientRepository = new ClientRepository_1.default();
            const createClient = new CreateClientService_1.default(clientRepository);
            const client = yield createClient.execute({
                name,
                email,
                telephone,
                description,
            });
            return response.status(201).json(client);
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const { name, email, telephone, description } = request.body;
            const clientRepository = new ClientRepository_1.default();
            const updateClient = new UpdateClientService_1.default(clientRepository);
            const client = yield updateClient.execute({
                id,
                name,
                email,
                telephone,
                description,
            });
            return response.json(client);
        });
    }
    destroy(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const clientRepository = new ClientRepository_1.default();
            const destroyClient = new DeleteClientService_1.default(clientRepository);
            yield destroyClient.execute(id);
            return response.status(204).send();
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const clientRepository = new ClientRepository_1.default();
            const clientService = new ShowClientsService_1.default(clientRepository);
            const clients = yield clientService.execute(id);
            return response.json(clients);
        });
    }
}
exports.default = ClientController;
