from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/fetch_linkedin', methods=['POST'])
def fetch_linkedin():
    linkedin_username = request.form['username']
    api_key = 'tWm9eGyKm4bdaaFpV8OZmw'
    headers = {'Authorization': 'Bearer ' + api_key}
    api_endpoint = 'https://nubela.co/proxycurl/api/v2/linkedin'
    linkedin_profile_url = f'https://www.linkedin.com/in/{linkedin_username}/'

    response = requests.get(api_endpoint, params={'url': linkedin_profile_url,'skills': 'include'}, headers=headers)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Failed to fetch data'})

if __name__ == '__main__':
    app.run(debug=True)
