"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ScraperHoliday1_1 = require("./src/Data/DataSources/Services/ScraperHoliday1");
function Main() {
    return __awaiter(this, void 0, void 0, function* () {
        const scraper = new ScraperHoliday1_1.ScraperHoliday();
        const scrap1 = yield scraper.scrap1(2022, 'madrid');
        const scrap2 = yield scraper.scrap2(2022, 'madrid');
        console.log(scrap1, scrap2);
    });
}
Main();
