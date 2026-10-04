const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // iPhone X dimensions
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'mobile-home.png', fullPage: true });

  await page.goto('http://localhost:3000/booking', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'mobile-booking.png', fullPage: true });
  
  await browser.close();
})();
