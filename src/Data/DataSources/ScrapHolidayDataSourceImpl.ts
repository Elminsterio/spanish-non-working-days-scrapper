
import ScrapHolidayDataSourceI from "../Interfaces/DataSources/ScrapHolidayDataSource";
import { ScraperHolidayModel } from "../Interfaces/DataSources/Services/ScraperHoliday";
import { Municipio } from "../../Domain/Entities/Municipio";

export class MunicipioDataSourceImpl implements ScrapHolidayDataSourceI {
  public mainScraper: ScraperHolidayModel;

  constructor(_scraperHoliday1: ScraperHolidayModel){
    this.mainScraper = _scraperHoliday1;
  }

  async getHolidays(year: number, municipio: Municipio['municipio']) {
    return await this.mainScraper.scrap1(year, municipio);
  }
}