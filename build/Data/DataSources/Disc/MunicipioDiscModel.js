"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MunicipiosModel = void 0;
const municipiosClean_json_1 = __importDefault(require("../../../municipiosClean.json"));
class MunicipiosModel {
    constructor() {
        this.model = Promise.resolve(municipiosClean_json_1.default);
    }
}
exports.MunicipiosModel = MunicipiosModel;
