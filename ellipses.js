const puppeteer = require('puppeteer');

async function openPrintDialog() {
  const browser = await puppeteer.launch({ headless: false }); // Set headless: false for debugging
  const page = await browser.newPage();
  
  // Navigate to a webpage
  await page.goto('https://example.com');
  
  await page.evaluate(() => {
    window.print();
  });

  
  // Wait for the print dialog to open (you might need to adjust the timeout)
  await page.waitForTimeout(5000); // Adjust the timeout as needed
  
  // Close the browser
  // await browser.close();
}

openPrintDialog()
  .then(() => console.log('Print dialog opened in Chrome on macOS.'))
  .catch(error => console.error('Error:', error));
