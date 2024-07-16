from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import fitz  # PyMuPDF
import os

app = Flask(__name__)
CORS(app)

valid_certificates = {
    'CERT123': {'name': 'John Doe', 'pdf': 'certificates/CERT123.pdf'},
    'CERT456': {'name': 'Jane Smith', 'pdf': 'certificates/CERT456.pdf'},
    'CERT789': {'name': 'Alice Johnson', 'pdf': 'certificates/CERT789.pdf'}
}

def convert_pdf_to_image(pdf_path, output_folder='static/images'):
    pdf_document = fitz.open(pdf_path)
    image_paths = []

    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for page_num in range(len(pdf_document)):
        page = pdf_document.load_page(page_num)
        pix = page.get_pixmap()
        image_path = os.path.join(output_folder, f"page_{page_num + 1}.png")
        pix.save(image_path)
        image_paths.append(image_path)

    return image_paths

@app.route('/verify', methods=['POST'])
def verify_certificate():
    data = request.get_json()
    certificate_id = data.get('certificateId')

    if certificate_id in valid_certificates:
        certificate = valid_certificates[certificate_id]
        pdf_path = certificate['pdf']
        image_paths = convert_pdf_to_image(pdf_path)
        image_urls = [f"/certificate_image/{os.path.basename(image_path)}" for image_path in image_paths]
        return jsonify({
            'valid': True,
            'name': certificate['name'],
            'images': image_urls
        })
    else:
        return jsonify({'valid': False}), 404


@app.route('/certificate_image/<path:filename>', methods=['GET'])
def get_certificate_image(filename):
    file_path = os.path.join('static/images', filename)
    if os.path.exists(file_path):
        return send_file(file_path)
    else:
        return 'File not found', 404

if __name__ == '__main__':
    if not os.path.exists('static/images'):
        os.makedirs('static/images')
    app.run(debug=True)
