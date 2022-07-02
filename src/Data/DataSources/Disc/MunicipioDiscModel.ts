import { MunicipiosModelI } from "../../Interfaces/DataSources/Disc/DiscMunicipiosModelInterface";
import { Municipio } from "../../../Domain/Entities/Municipio";
import municipiosClean from '../../../Assets/municipiosClean.json';

export class MunicipiosModel implements MunicipiosModelI {
  model: Municipio[];

  constructor() {
    this.model = municipiosClean;
  }
}