import { Municipio } from "../Entities/Municipio";

export interface MunicipiosRepositoryI {
  getMunicipios: () => Municipio[];
}