// Assuming you have a form with an input field for the LinkedIn username and a download button
const form = document.querySelector('#profile-form');
const usernameInput = document.querySelector('#username-input');
const downloadButton = document.querySelector('#download-button');

// Event listener for form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get the entered LinkedIn username
    const username = usernameInput.value;

    // Send a POST request to the server to initiate profile scraping and download
    try {
        const response = await fetch('http://localhost:5000/download-profile', {
            method: 'POST',
            body: new URLSearchParams({ username }),
        });

        if (response.ok) {
            // The server should respond with the PDF file
            // Trigger the download on the client side
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `${username}_profile.pdf`; // Set the download filename
            a.style.display = 'none';

            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
        } else {
            // Handle error responses from the server (e.g., display an error message)
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
});
