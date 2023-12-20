const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const oAuth2Client = new google.auth.OAuth2(
    '720645953271-f6l0em7bfue3ab0072a036sqrac789hi.apps.googleusercontent.com', // Client ID
    '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', // Client Secret
    'http://localhost:3010' // Redirect URL
);

// Function to exchange authorization code for tokens
function getTokens(code) {
    oAuth2Client.getToken(code, (err, tokens) => {
        if (err) {
            console.error('Error retrieving access token', err);
            return;
        }
        oAuth2Client.setCredentials(tokens);
        console.log('Tokens acquired:', tokens);
        // Save these tokens in a secure place
    });
}

// Call this function with the actual code from Google
// getTokens('4/0AfJohXnM3O1t91-mJLP4sHE14ZMWotrXXpHbGdNW2FwE733Lo5vwZMFCDuJYQC68ydanhA');


async function sendEmail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'siddharthmohite409@gmail.com',
                accessToken: accessToken.token,
                clientId: '720645953271-f6l0em7bfue3ab0072a036sqrac789hi.apps.googleusercontent.com',
                clientSecret: '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',
                refreshToken: '1//06xemqdjtUAD9CgYIARAAGAYSNwF-L9IrT2RiAEpg9anK0IIQeYCJYfBEmY9-aCBo8SDVr9g0jLIYiaKBaBN9hh8ljtPqJCKz1Zg'
            }
        });

        const mailOptions = {
            from: '"Siddharth Mohite" <siddharthmohite409@gmail.com>',
            to: 'siddharthmohite409@gmail.com',
            subject: 'Hello from nodemailer!',
            text: 'Hello Gmail with OAuth2',
            html: '<h1>Hello Gmail with OAuth2</h1>'
        };

        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.error('sendEmail error:', error);
    }
}


    sendEmail().then(result => console.log('Email sent:', result))
             .catch(error => console.error('Error:', error));
