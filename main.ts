import { ScraperHoliday } from './src/Data/DataSources/Services/ScraperHoliday1'

async function Main() {
  
  const scraper = new ScraperHoliday();
  const scrap1 = await scraper.scrap1(2022, 'madrid');
  const scrap2 = await scraper.scrap2(2022, 'madrid');
  console.log(scrap1, scrap2);
}

Main()