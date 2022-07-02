import MunicipioDataSourceI from "../Interfaces/DataSources/MunicipioDataSource";
import { MunicipiosModelI } from "../Interfaces/DataSources/Disc/DiscMunicipiosModelInterface";
import { Municipio } from "../../Domain/Entities/Municipio";

export class MunicipioDataSourceImpl implements MunicipioDataSourceI {
  public municipios: Municipio[];

  constructor(_municipiosModel: MunicipiosModelI){
    this.municipios = _municipiosModel.model;
  }

  getMunicipios() {
    return this.municipios;
  }
}