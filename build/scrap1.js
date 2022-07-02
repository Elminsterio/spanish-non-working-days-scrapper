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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const municipiosClean_json_1 = __importDefault(require("./src/Assets/municipiosClean.json"));
const stringCleaner_util_1 = require("./utils/stringCleaner.util");
function mainScraper(year, municipio) {
    return __awaiter(this, void 0, void 0, function* () {
        const municipioFinded = municipiosClean_json_1.default.find((municipioFind) => municipioFind.municipio === municipio);
        if (!municipioFinded)
            return console.log('error');
        const treatedMunicipio = (0, stringCleaner_util_1.accentsRemover)(municipioFinded === null || municipioFinded === void 0 ? void 0 : municipioFinded.municipio);
        const treatedComunidad = (0, stringCleaner_util_1.accentsRemover)(municipioFinded === null || municipioFinded === void 0 ? void 0 : municipioFinded.comunidad);
        const treatedProvincia = (0, stringCleaner_util_1.accentsRemover)(municipioFinded === null || municipioFinded === void 0 ? void 0 : municipioFinded.provincia);
        const nonWorkingDays = { holidays: new Map() };
        let browser;
        let page;
        console.log(`https://calendarios.ideal.es/laboral/${treatedComunidad}/${treatedProvincia}/${treatedMunicipio}/${year}`);
        try {
            browser = yield puppeteer_1.default.launch({ headless: true });
            page = yield browser.newPage();
            yield page.goto(`https://calendarios.ideal.es/laboral/${treatedComunidad}/${treatedProvincia}/${treatedMunicipio}/${year}`, {
                waitUntil: 'networkidle2',
            });
            for (let i = 1; i <= 12; i++) {
                let numberMonthOnDOM = i < 10 ? '0' + i : i;
                const nationalHoliday = yield page.$$eval(`.bm-calendar-month-${numberMonthOnDOM} .bm-calendar-state-nacional:not(.bm-calendar-weekend)`, result => { return { nationalHoliday: result.map(results => results.textContent) }; });
                const autonomicHoliday = yield page.$$eval(`.bm-calendar-month-${numberMonthOnDOM} .bm-calendar-state-autonomico:not(.bm-calendar-weekend)`, result => { return { autonomicHoliday: result.map(results => results.textContent) }; });
                const localHoliday = yield page.$$eval(`.bm-calendar-month-${numberMonthOnDOM} .bm-calendar-state-local:not(.bm-calendar-weekend)`, result => { return { localHoliday: result.map(results => results.textContent) }; });
                const holidays = Object.assign(Object.assign(Object.assign({}, nationalHoliday), autonomicHoliday), localHoliday);
                nonWorkingDays.holidays.set(i, holidays);
            }
        }
        catch (error) {
            console.log('The page was not found or the data entered is wrong');
            console.log('---------------------------------------------------');
            console.log(error);
        }
        finally {
            if (page !== undefined)
                yield page.close();
            if (browser !== undefined)
                yield browser.close();
        }
        return nonWorkingDays;
    });
}
exports.default = mainScraper;
