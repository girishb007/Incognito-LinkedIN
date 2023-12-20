
const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
<<<<<<< HEAD
const port = 3010;
=======
const port = 3000;
>>>>>>> e360a9c35e8d8aec74c69814b137bc5e0bede1f4
const applescript = require('applescript');

     

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.post('/download-profile', async (req, res) => {
//     const username = req.body.username;
//     if (!username) {
//         return res.status(400).send('Username is required');
//     }
//     try {
//         const pdfBuffer = await generateLinkedInPDF(username);
//         res.setHeader('Content-Disposition', `attachment; filename=${username}_linkedin_profile.pdf`);
//         res.setHeader('Content-Type', 'application/pdf');
//         res.send(pdfBuffer);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error generating PDF');
//     }
// });



async function generateLinkedInPDF(username) {
    console.log("inside generate linkedin function");
    // const browser = await puppeteer.launch({ headless: "new" }); 
    // console.log('Browser executable path:', browser.executablePath());
    //const browser = await puppeteer.launch({ headless: true });
    const browser = await puppeteer.launch({ headless: false }); // Set headless: false for debugging
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000); 
<<<<<<< HEAD
=======
    
>>>>>>> e360a9c35e8d8aec74c69814b137bc5e0bede1f4
    const linkedinEmail = process.env.LINKEDIN_EMAIL || 'girishbisane9423@gmail.com'; // Replace with your email
    const linkedinPassword = process.env.LINKEDIN_PASSWORD || 'Hesoyam@9096'; // Replace with your password
    // Navigate to LinkedIn's login page
    await page.goto('https://www.linkedin.com/login');
    // Fill in the login form - make sure to use environment variables or another secure method to store credentials
    await page.type('#username', 'atulpatle8668@gmail.com', { delay: 30 });
    console.log("typed username");
    await page.type('#password', 'LinkedInProject@12345', { delay: 30 });
    console.log("typed apssword");

    // Click the login button
    await page.click('[type="submit"]');
    console.log("login button clicked");
    // Wait for navigation after login
    await page.waitForNavigation({timeout: 60000});
    // Go to the specific user's profile
<<<<<<< HEAD
    await page.goto(`https://www.linkedin.com/in/${username}`, { waitUntil: 'networkidle0' }, {timeout: 60000});
    console.log("go to username done");
    
    const pdf = await page.pdf({ format: 'A4' });
    const downloadsPath = '/Users/sid/Downloads/';
    const fullpath= `${downloadsPath}/${username}.pdf`;
    await page.pdf({
        path: fullpath, // Save the PDF to the Downloads folder
=======
    await page.goto(`https://www.linkedin.com/in/${username}`, { waitUntil: 'domcontentloaded' }, {timeout: 60000});
    console.log("go to username done");
    await autoScroll(page);

    
    const pdf = await page.pdf({ format: 'A4' });
    const downloadsPath = '/Users/girishbisane/Downloads/output.pdf';
    await page.pdf({
        path: downloadsPath, // Save the PDF to the Downloads folder
>>>>>>> e360a9c35e8d8aec74c69814b137bc5e0bede1f4
        format: 'A4',
        printBackground: true
      });
    
<<<<<<< HEAD
    
    // await browser.close();
    return pdf;
}

=======
      await browser.close();
      // Return the path of the saved PDF
      return downloadsPath;
}

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

>>>>>>> e360a9c35e8d8aec74c69814b137bc5e0bede1f4
// async function printLinkedInProfile(username) {
//     console.log("entered printlinkedin function");
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     const linkedinEmail = process.env.LINKEDIN_EMAIL || 'girishbisane9423@gmail.com'; // Replace with your email
//     const linkedinPassword = process.env.LINKEDIN_PASSWORD || 'Hesoyam@9096'; // Replace with your password
//     // Navigate to LinkedIn's login page
//     await page.goto('https://www.linkedin.com/login');
//     // Fill in the login form - make sure to use environment variables or another secure method to store credentials
//     await page.type('#username', linkedinEmail, { delay: 30 });
//     await page.type('#password', linkedinPassword, { delay: 30 });

//     // Click the login button
//     await page.click('[type="submit"]');
    
//     console.log("login button clicked");
//     // Wait for navigation after login
//     await page.waitForNavigation();
//     console.log("waitfornavogation");
//     // Go to the specific user's profile
//     await page.goto(`https://www.linkedin.com/in/${username}`, { waitUntil: 'networkidle2' });

//     // Click on the "More..." button to reveal the "Print" option
//     await page.click('.ellipsis-menu-selector');
//     console.log("ellipses button clicked");

//     // Wait for the "Print" option to appear and click it
//     await page.waitForSelector('.artdeco-dropdown-content .artdeco-button--tertiary');
//     await page.click('.artdeco-dropdown-content .artdeco-button--tertiary');

//     // Wait for the print dialog to open (you might need to adjust the timeout)
//     await page.waitForTimeout(25000); // Adjust the timeout as needed

//     // Simulate pressing the Enter key to confirm the print
//     await page.keyboard.press('Enter');

//     // Wait for the PDF to generate and close the browser
//     await page.waitForTimeout(25000); // Adjust the timeout as needed
//     await browser.close();
// }

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.post('/generate-linkedin-pdf', async (req, res) => {
    const username = req.body.username;
    if (!username) {
        return res.status(400).send('Username is required');
    }

    try {
        const pdfBuffer = await generateLinkedInPDF(username);
        res.setHeader('Content-Disposition', `attachment; filename=${username}_linkedin_profile.pdf`);
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating PDF');
    }
    
});



// app.post('/print-linkedin-profile', async (req, res) => {
//     const username = req.body.username;
//     if (!username) {
//         return res.status(400).send('Username is required');
//     }

//     try {
//         const pdfBuffer = await printLinkedInProfile(username);
//         res.setHeader('Content-Disposition', `attachment; filename=${username}_linkedin_profile.pdf`);
//         res.setHeader('Content-Type', 'application/pdf');
//         res.send(pdfBuffer);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error printing PDF');
//     }
// });
<<<<<<< HEAD

=======
>>>>>>> e360a9c35e8d8aec74c69814b137bc5e0bede1f4
