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
Object.defineProperty(exports, "__esModule", { value: true });
class PaginatedClientsService {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    execute({ page }) {
        return __awaiter(this, void 0, void 0, function* () {
            const [clients, total] = yield this.clientRepository.findAllPaginated(page * 10);
            const totalPages = Math.ceil(total / 10);
            const response = {
                data: clients,
                totalElements: total,
                page,
                elements: clients.length,
                elementsPerPage: 10,
                totalPages,
                firstPage: page === 0,
                lastPage: page === totalPages - 1,
            };
            return response;
        });
    }
}
exports.default = PaginatedClientsService;
