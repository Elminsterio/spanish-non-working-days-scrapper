import { ScrapHolidayRepositoryI } from "../../Domain/Repository/ScrapHolidayRepoI";
import ScrapHolidayDataSourceI from '../Interfaces/DataSources/ScrapHolidayDataSource';
import { Holiday } from "../../Domain/Entities/Holiday";
import { Municipio } from "../../Domain/Entities/Municipio";


export class MunicipioRepositoryImpl implements ScrapHolidayRepositoryI {
  public ScrapHolidaysDataSource: ScrapHolidayDataSourceI;

  constructor(_scrapHolidayDataSource: ScrapHolidayDataSourceI) {
    this.ScrapHolidaysDataSource = _scrapHolidayDataSource;
  }

  async getHolidays(year: number, municipio: Municipio['municipio']): Promise<Holiday | void> {
    return await this.ScrapHolidaysDataSource.getHolidays(year, municipio);
  }
}