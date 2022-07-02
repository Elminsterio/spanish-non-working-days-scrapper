"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MunicipioRepositoryImpl = void 0;
class MunicipioRepositoryImpl {
    constructor(_municipiosDataSource) {
        this.municipiosDataSource = _municipiosDataSource;
    }
    getMunicipios() {
        return this.municipiosDataSource.getMunicipios();
    }
}
exports.MunicipioRepositoryImpl = MunicipioRepositoryImpl;
