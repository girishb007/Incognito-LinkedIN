from selenium import webdriver
from bs4 import BeautifulSoup
import time
from pdf_generator import generate_pdf  # Import the PDF generation function
from selenium import webdriver

def configure_driver():
    # Add options to make browsing easier
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')  # Run in the background without opening a browser window
    options.add_argument('--no-sandbox')  # Disable sandboxing (for Linux)

    # Specify the path to the Chrome WebDriver executable
    driver = webdriver.Chrome(executable_path='/Users/girishbisane/Downloads', options=options)

    return driver

def scrape_linkedin_profile(username):
    driver = configure_driver()
    url = f"https://www.linkedin.com/in/{username}"
    driver.get(url)

    # Wait for the page to load completely
    time.sleep(5)  # Adjust this delay as needed

    soup = BeautifulSoup(driver.page_source, 'html.parser')
    driver.quit()

    # Extract data from the soup object
    # Example: Find profile name
    profile_name = soup.find('...', {'class': '...'})  # Replace with correct tags and classes
    # Add more extraction logic here

    return {
        "name": profile_name.get_text(strip=True) if profile_name else 'Not found',
        # Include other data points
    }

username = "girish-bisane"

# Scrape the LinkedIn profile
profile_data = scrape_linkedin_profile(username)

# Generate the PDF
output_file = f"{username}_profile.pdf"
generate_pdf(profile_data, output_file)
