from scraper import scrape_linkedin_profile  # Import the scraping function
from flask import Flask, request, jsonify, send_file

from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for your entire app

# ...

@app.route('/download-profile', methods=['POST'])
def download_profile():
    username = request.form['username']
    profile_data = scrape_linkedin_profile(username)
    if 'error' in profile_data:
        return jsonify(profile_data), 400  # Or another appropriate HTTP status code
    # Further process the scraped data, like generating a PDF
    pdf_filename = f"{username}_profile.pdf"

    # Generate the PDF and save it to a temporary location
    generate_pdf(profile_data, pdf_filename)


    # Send the generated PDF file as a response
    return send_file(pdf_filename, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
