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
const municipiosClean_json_1 = __importDefault(require("./src/Assets/municipiosClean.json"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const placesDiccionary_util_1 = require("./utils/placesDiccionary.util");
const stringCleaner_util_1 = require("./utils/stringCleaner.util");
function secondaryScraper(anio, municipio) {
    return __awaiter(this, void 0, void 0, function* () {
        const municipioFinded = municipiosClean_json_1.default.find((municipioFind) => municipioFind.municipio === municipio);
        if (!municipioFinded)
            return console.log('error');
        const municipioTratado = (0, stringCleaner_util_1.accentsRemover)(municipio.split(' ').join('_'));
        const provincia = municipioFinded.provincia;
        const CapLetters = placesDiccionary_util_1.provinciasScrap2[provincia];
        let browser;
        let page;
        try {
            browser = yield puppeteer_1.default.launch({ headless: true });
            page = yield browser.newPage();
            console.log(`https://www.calendarios-laborales.es/calendario-${municipioTratado}-${anio}-${CapLetters}`);
            yield page.goto(`https://www.calendarios-laborales.es/calendario-${municipioTratado}-${anio}-${CapLetters}`, {
                waitUntil: 'networkidle2',
            });
            const nonWorkingDays = { holidays: new Map() };
            for (let i = 1; i <= 12; i++) {
                const nationalHoliday = yield page.$$eval('.col-xs-12 .leyenda .nacional', (result, index) => {
                    return { nationalHoliday: result.filter((resultPreFilt) => new Date(resultPreFilt.getAttribute('content')).getMonth() === index - 1)
                            .map((resultPreMap) => resultPreMap.textContent) };
                }, i);
                const autonomicHoliday = yield page.$$eval('.col-xs-12 .leyenda .autonomico', (result, index) => {
                    return { autonomicHoliday: result.filter((resultPreFilt) => new Date(resultPreFilt.getAttribute('content')).getMonth() === index - 1)
                            .map((resultPreMap) => resultPreMap.textContent) };
                }, i);
                const localHoliday = yield page.$$eval('.col-xs-12 .leyenda .local', (result, index) => {
                    return { localHoliday: result.filter((resultPreFilt) => new Date(resultPreFilt.getAttribute('content')).getMonth() === index - 1)
                            .map((resultPreMap) => resultPreMap.textContent) };
                }, i);
                nonWorkingDays.holidays.set(i, Object.assign(Object.assign(Object.assign({}, nationalHoliday), autonomicHoliday), localHoliday));
            }
            console.log(nonWorkingDays);
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
    });
}
exports.default = secondaryScraper;
