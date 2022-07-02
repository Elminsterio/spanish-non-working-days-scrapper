"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MunicipioDataSourceImpl = void 0;
class MunicipioDataSourceImpl {
    constructor(_municipiosModel) {
        this.municipios = _municipiosModel.model;
    }
    getMunicipios() {
        return this.municipios;
    }
}
exports.MunicipioDataSourceImpl = MunicipioDataSourceImpl;
