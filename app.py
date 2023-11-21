from flask import Flask, request, jsonify
from scraper import scrape_linkedin_profile  # Import the scraping function

app = Flask(__name__)

@app.route('/download-profile', methods=['POST'])
def download_profile():
    username = request.form['username']
    profile_data = scrape_linkedin_profile(username)
    if 'error' in profile_data:
        return jsonify(profile_data), 400  # Or another appropriate HTTP status code
    # Further process the scraped data, like generating a PDF
    return jsonify(profile_data)

if __name__ == '__main__':
    app.run(debug=True)
