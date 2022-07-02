import { Municipio } from "../../../Domain/Entities/Municipio";

export default interface MunicipioDataSourceI {
  getMunicipios(): Municipio[];
}