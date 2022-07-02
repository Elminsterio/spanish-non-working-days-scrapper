import { Holiday } from '../../Entities/Holiday';
import { Municipio } from '../../Entities/Municipio';
import { ScrapHolidayRepositoryI } from '../../Repository/ScrapHolidayRepoI';

export interface GetMunicipiosUseCaseI {
  invoke: (year: number, municipio: Municipio['municipio']) => Promise<Holiday | void>;
}

export class GetUsersUseCase implements GetMunicipiosUseCaseI {
  municipioRepo: ScrapHolidayRepositoryI;
  
  constructor(_scrapHolidaysRepo: ScrapHolidayRepositoryI) {
    this.municipioRepo = _scrapHolidaysRepo;
  }

  async invoke(year: number, municipio: Municipio['municipio']) {
    return await this.municipioRepo.getHolidays(year, municipio);
  } 
}