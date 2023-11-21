document.getElementById('downloadForm').addEventListener('submit', function(event){
    event.preventDefault();
    const username = document.getElementById('username').value;

    fetch('/download-profile', {
        method: 'POST',
        body: new URLSearchParams({ 'username': username }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
});
