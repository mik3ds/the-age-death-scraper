const puppeteer = require('puppeteer');

async function scrapeWebsite() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://tributes.theage.com.au/obituaries/theage-au/');
  
  // Wait for the content to load
  await page.waitForSelector('.notice-grid__item');

  // Extract the name of each person who has passed away
  const names = await page.$$eval('.notice-grid__item', entries => {
    return entries.map(entry => {
      const fullName = entry.querySelector('.notice-grid__full-name').textContent.trim();
      return fullName.replace(/,/, ''); // remove the trailing comma
    });
  });

  // Print the list of names
  console.log(names);

  await browser.close();
}

scrapeWebsite();
