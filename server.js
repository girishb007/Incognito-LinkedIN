const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const port = 3010;

    

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.post('/download-profile', async (req, res) => {
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

async function generateLinkedInPDF(username) {
    // const browser = await puppeteer.launch({ headless: "new" }); 
    // console.log('Browser executable path:', browser.executablePath());
    //const browser = await puppeteer.launch({ headless: true });
    const browser = await puppeteer.launch({ headless: false }); // Set headless: false for debugging
    const page = await browser.newPage();
    const linkedinEmail = process.env.LINKEDIN_EMAIL || 'girishbisane9423@gmail.com'; // Replace with your email
    const linkedinPassword = process.env.LINKEDIN_PASSWORD || 'Hesoyam@9096'; // Replace with your password
    // Navigate to LinkedIn's login page
    await page.goto('https://www.linkedin.com/login');
    // Fill in the login form - make sure to use environment variables or another secure method to store credentials
    await page.type('#username', 'girishbisane9423@gmail.com', { delay: 30 });
    await page.type('#password', 'Hesoyam@9096', { delay: 30 });

    // Click the login button
    await page.click('[type="submit"]');
    // Wait for navigation after login
    await page.waitForNavigation();
    // Go to the specific user's profile
    await page.goto(`https://www.linkedin.com/in/${username}`, { waitUntil: 'networkidle2' });
    // Generate PDF
    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();
    return pdf;
}
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

