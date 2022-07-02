import { Municipio } from "../../../Domain/Entities/Municipio";

export default interface ScrapHolidayDataSourceI {
  getHolidays(year: number, municipio: Municipio['municipio']): Promise<any>;
}