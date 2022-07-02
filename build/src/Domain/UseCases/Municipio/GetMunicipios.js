"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersUseCase = void 0;
class GetUsersUseCase {
    constructor(_municipioRepo) {
        this.municipioRepo = _municipioRepo;
    }
    invoke() {
        return this.municipioRepo.getMunicipios();
    }
}
exports.GetUsersUseCase = GetUsersUseCase;
