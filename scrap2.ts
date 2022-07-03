import { Municipio } from "./src/Domain/Entities/Municipio";

import municipios from './src/Assets/municipiosClean.json';
import puppeteer from 'puppeteer';

import { provinciasScrap2 } from './utils/placesDiccionary.util';
import { accentsRemover } from './utils/stringCleaner.util';

export default async function secondaryScraper(anio: number, municipio: Municipio['municipio']) {
   
    const municipioFinded = municipios.find((municipioFind: Municipio) => municipioFind.municipio === municipio);
    if(!municipioFinded) return console.log('error');

    const municipioTratado = accentsRemover(municipio.split(' ').join('_'));    
    const provincia = municipioFinded.provincia;
    const CapLetters = provinciasScrap2[provincia as keyof typeof provinciasScrap2];

    let browser: puppeteer.Browser | undefined;
    let page: puppeteer.Page | undefined;

    const nonWorkingDays = {holidays: new Map()};

    try {

        browser = await puppeteer.launch({ headless: true });  
        page = await browser.newPage();
    
        console.log(`https://www.calendarios-laborales.es/calendario-${municipioTratado}-${anio}-${CapLetters}`);
    
        await page.goto(`https://www.calendarios-laborales.es/calendario-${municipioTratado}-${anio}-${CapLetters}`, {
            waitUntil: 'networkidle2',
        });
            
        for(let i = 1; i <= 12; i++) {

            const nationalHoliday = await page.$$eval('.col-xs-12 .leyenda .nacional', 
                                    (result: any, index: any) => {
                                        return {nationalHoliday: result.filter((resultPreFilt: any) => new Date(resultPreFilt.getAttribute('content')).getMonth() === index - 1)
                                                                       .map((resultPreMap: any) => resultPreMap.textContent)}
                                        }, i)

            const autonomicHoliday = await page.$$eval('.col-xs-12 .leyenda .autonomico', 
                                    (result: any, index: any) => {
                                        return {autonomicHoliday: result.filter((resultPreFilt: any) => new Date(resultPreFilt.getAttribute('content')).getMonth() === index - 1)
                                                                       .map((resultPreMap: any) => resultPreMap.textContent)}
                                        }, i)

            const localHoliday = await page.$$eval('.col-xs-12 .leyenda .local', 
                                 (result: any, index: any) => {
                                    return {localHoliday: result.filter((resultPreFilt: any) => new Date(resultPreFilt.getAttribute('content')).getMonth() === index - 1)
                                                                   .map((resultPreMap: any) => resultPreMap.textContent)}
                                    }, i)
            
            nonWorkingDays.holidays.set(i, {...nationalHoliday, ...autonomicHoliday, ...localHoliday});
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


