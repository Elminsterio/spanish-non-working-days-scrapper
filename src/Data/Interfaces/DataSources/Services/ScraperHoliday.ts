import { Holiday } from "../../../../Domain/Entities/Holiday";
import { Municipio } from "../../../../Domain/Entities/Municipio";

export interface ScraperHolidayModel {
  scrap1: (year: number, municipio: Municipio['municipio']) => Promise<void | Holiday>;
  scrap2: (year: number, municipio: Municipio['municipio']) => Promise<void | Holiday>;
}