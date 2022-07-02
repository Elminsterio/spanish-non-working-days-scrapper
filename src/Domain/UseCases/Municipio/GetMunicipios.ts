import { Municipio } from '../../Entities/Municipio';
import { MunicipiosRepositoryI } from '../../Repository/MunicipiosRepositoryI';

export interface GetMunicipiosUseCaseI {
  invoke: () => Municipio[];
}

export class GetUsersUseCase implements GetMunicipiosUseCaseI {
  municipioRepo: MunicipiosRepositoryI;
  
  constructor(_municipioRepo: MunicipiosRepositoryI) {
    this.municipioRepo = _municipioRepo;
  }

  invoke() {
    return this.municipioRepo.getMunicipios();
  } 
}