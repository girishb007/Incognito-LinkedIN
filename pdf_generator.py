from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors

def generate_pdf(profile_data, output_file):
    # Create a PDF document
    c = canvas.Canvas(output_file, pagesize=letter)

    # Set the font and font size
    c.setFont("Helvetica", 12)

    # Write the profile name to the PDF
    c.drawString(100, 750, f"LinkedIn Profile: {profile_data['name']}")

    # Add more data to the PDF as needed
    # For example:
    # c.drawString(100, 730, f"Experience: {profile_data['experience']}")

    # Save the PDF
    c.save()
