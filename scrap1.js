
const puppeteer = require('puppeteer');
const accentsRemover = require('./utils/stringCleaner.util');

async function ScrapFestivos(comunidad, provincia, municipio, year = new Date().getFullYear().toString()) {
    
    let spanishMonths = {
        enero: [],
        febrero: [],
        marzo: [],
        abril: [],
        mayo: [],
        junio: [],
        julio: [],
        agosto: [],
        septiembre: [],
        octubre: [],
        noviembre: [],
        diciembre: []
    };
    
    const treatedComunidad = accentsRemover(comunidad);
    const treatedProvincia = accentsRemover(provincia);
    const treatedMunicipio = accentsRemover(municipio);
    
    let browser;
    let page;
    
    try {

        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
        
        await page.goto(`https://calendarios.ideal.es/laboral/${treatedComunidad}/${treatedProvincia}/${treatedMunicipio}/${year}`, {
            waitUntil: 'networkidle2',
        });
            
        for(let i = 1; i <= 12; i++) {
            
            if(i < 10) i = '0' + i;
                
            const days = await page.$$eval(`.bm-calendar-month-${i} [title]`, result => result.map(results => results.textContent))
                
            switch (i) {
                case '01':
                    spanishMonths.enero = days;
                    break;        
                case '02':
                    spanishMonths.febrero = days;
                    break;
                case '03':
                    spanishMonths.marzo = days;
                    break;
                case '04':
                    spanishMonths.abril = days;
                    break;
                case '05':
                    spanishMonths.mayo = days;
                    break;
                case '06':
                    spanishMonths.junio = days;
                    break;
                case '07':
                    spanishMonths.julio = days;
                    break;
                case '08':
                    spanishMonths.agosto = days;
                    break;
                case '09':
                    spanishMonths.septiembre = days;
                    break;
                case 10:
                    spanishMonths.octubre = days;
                    break;
                case 11:
                    spanishMonths.noviembre = days;
                    break;
                case 12:
                    spanishMonths.diciembre = days;
                    break;
            }
        }
        console.log(spanishMonths);
    } catch(error) {
        console.log('The page was not found or the data entered is wrong');
        console.log('---------------------------------------------------');
        console.log(error);
    } finally {
        await page.close();
        await browser.close();
    }
        
    return spanishMonths;

}

ScrapFestivos('dawdawd', 'dawdw', 'dwdwafaw', 2022)

module.exports = ScrapFestivos;