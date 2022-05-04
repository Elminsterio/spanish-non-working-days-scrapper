
const puppeteer = require('puppeteer');
const { accentsRemover } = require('./utils/stringCleaner.util');

async function ScrapFestivos(comunidad, provincia, municipio, year = new Date().getFullYear().toString()) {
    
    const treatedComunidad = accentsRemover(comunidad);
    const treatedProvincia = accentsRemover(provincia);
    const treatedMunicipio = accentsRemover(municipio);
    
    const nonWorkingDays = new Map();  

    let browser;
    let page;
    
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
            const weekendDays = await page.$$eval(`.bm-calendar-month-${numberMonthOnDOM} td.bm-calendar-weekend`, 
                                    result => {return {weekendDays: result.map(results => results.textContent )}});           
            nonWorkingDays.set(i, {...nationalHoliday, ...autonomicHoliday, ...localHoliday, ...weekendDays});
        }
        console.log(nonWorkingDays);
    } catch(error) {
        console.log('The page was not found or the data entered is wrong');
        console.log('---------------------------------------------------');
        console.log(error);
    } finally {
        await page.close();
        await browser.close();
    }
        
    return nonWorkingDays;

}

ScrapFestivos('comunidad de madrid', 'madrid', 'madrid', 2022)

module.exports = ScrapFestivos;