const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    // Wait for the 'networkidle0' event, which indicates that the network is idle
    await page.goto('https://example.com', { waitUntil: 'networkidle0' });

    const pdfPath = '/Users/sid/Downloads/example_page.pdf';

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true
    });

    console.log(`PDF saved at ${pdfPath}`);
    await browser.close();
  } catch (error) {
    // If there's an error, log it to the console
    console.error('Error saving PDF:', error);
  }
})();

