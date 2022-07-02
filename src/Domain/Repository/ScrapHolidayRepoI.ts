import { Municipio } from "../Entities/Municipio";
import { Holiday } from "../Entities/Holiday";

export interface ScrapHolidayRepositoryI {
  getHolidays: (year: number, municipio: Municipio['municipio']) => Promise<void | Holiday>;
}