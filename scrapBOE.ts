import puppeteer from 'puppeteer';
import https from 'https';
import fs from 'fs';
import { Municipio } from './src/Domain/Entities/Municipio';

export default async function BOEScraper(municipio: Municipio['municipio']) {


  let browser: puppeteer.Browser | undefined;
  let page: puppeteer.Page | undefined;

  const url = 'https://www.laboral-social.com/calendario-laboral-nacional-comunidades-autonomas-fiestas-locales.html';

  console.log(`https://www.laboral-social.com/calendario-laboral-nacional-comunidades-autonomas-fiestas-locales.html`);

  try {
      
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    const links = await page.$$eval('p strong a', 
                  (el: Node[]) => el.filter((a:any) => a.href)
                                    .map((a:any) => a.href))

    links.forEach((link, index) => {
      https.get(url, (res) => {
        const fileSplit = link.split('/');
        const fileName = fileSplit[fileSplit.length - 1];
        const stream = fs.createWriteStream(__dirname + `/src/Assets/Festivos/${fileName}`);
        res.pipe(stream);
        stream.on('finish', () => stream.close())
      })
    })

  } catch(error) {
      console.log('The page was not found or the data entered is wrong');
      console.log('---------------------------------------------------');
      console.log(error);
  } finally {
      if(page !== undefined) await page.close();
      if(browser !== undefined) await browser.close();
  }
}
