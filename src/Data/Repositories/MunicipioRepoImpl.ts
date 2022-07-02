import { MunicipiosRepositoryI } from "../../Domain/Repository/MunicipiosRepositoryI";
import MunicipioDataSourceI from "../Interfaces/DataSources/MunicipioDataSource";
import { Municipio } from "../../Domain/Entities/Municipio";

export class MunicipioRepositoryImpl implements MunicipiosRepositoryI {
  public municipiosDataSource: MunicipioDataSourceI;

  constructor(_municipiosDataSource: MunicipioDataSourceI) {
    this.municipiosDataSource = _municipiosDataSource;
  }

  getMunicipios(): Municipio[] {
    return this.municipiosDataSource.getMunicipios();
  }
}