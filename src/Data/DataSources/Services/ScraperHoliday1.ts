import { ScraperHolidayModel } from "../../Interfaces/DataSources/Services/ScraperHoliday";
import { Municipio } from "../../../Domain/Entities/Municipio";
import mainScraper from "../../../../scrap1";
import secondaryScraper from "../../../../scrap2";

export class ScraperHoliday implements ScraperHolidayModel {

  async scrap1(year: number, municipio: Municipio['municipio']) {
    return await mainScraper(year, municipio);
  }

  async scrap2(year: number, municipio: Municipio['municipio']) {
    return await secondaryScraper(year, municipio);
  }
}