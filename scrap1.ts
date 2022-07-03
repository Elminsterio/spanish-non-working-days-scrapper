import { Municipio } from "./src/Domain/Entities/Municipio";

import puppeteer from 'puppeteer';
import municipios from './src/Assets/municipiosClean.json';
import { accentsRemover } from './utils/stringCleaner.util';
import { HolidayMapElements, Holiday } from "./src/Domain/Entities/Holiday";

export default async function mainScraper(year: number, municipio: Municipio['municipio']): Promise<Holiday | void> {

    const municipioFinded = municipios.find((municipioFind: Municipio)=> municipioFind.municipio === municipio);
    if(!municipioFinded) return console.log('error');

    const treatedMunicipio = accentsRemover(municipioFinded?.municipio);
    const treatedComunidad = accentsRemover(municipioFinded?.comunidad);
    const treatedProvincia = accentsRemover(municipioFinded?.provincia);

    const nonWorkingDays = {holidays: new Map()};  

    let browser: puppeteer.Browser | undefined;
    let page: puppeteer.Page | undefined;

    console.log(`https://calendarios.ideal.es/laboral/${treatedComunidad}/${treatedProvincia}/${treatedMunicipio}/${year}`);
    try {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
        
        await page.goto(`https://calendarios.ideal.es/laboral/${treatedComunidad}/${treatedProvincia}/${treatedMunicipio}/${year}`, {
            waitUntil: 'networkidle2',
        });
            
        for(let i = 1; i <= 12; i++) {
            
            let numberMonthOnDOM = i < 10 ? '0' + i : i;
            
            const nationalHoliday = await page.$$eval(`.bm-calendar-month-${numberMonthOnDOM} .bm-calendar-state-nacional:not(.bm-calendar-weekend)`, 
                                    result => {return {nationalHoliday: result.map(results => results.textContent)}}); 
            const autonomicHoliday = await page.$$eval(`.bm-calendar-month-${numberMonthOnDOM} .bm-calendar-state-autonomico:not(.bm-calendar-weekend)`, 
                                    result => {return {autonomicHoliday: result.map(results => results.textContent)}});            
            const localHoliday = await page.$$eval(`.bm-calendar-month-${numberMonthOnDOM} .bm-calendar-state-local:not(.bm-calendar-weekend)`,
                                    result => {return {localHoliday: result.map(results => results.textContent)}}); 
            
            const holidays = {...nationalHoliday, ...autonomicHoliday, ...localHoliday};

            nonWorkingDays.holidays.set(i as HolidayMapElements['month'], holidays);
        }

    } catch(error) {
        console.log('The page was not found or the data entered is wrong');
        console.log('---------------------------------------------------');
        console.log(error);
    } finally {
        if(page !== undefined) await page.close();
        if(browser !== undefined) await browser.close();
    }
    return nonWorkingDays;
}
