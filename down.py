from flask import Flask, send_from_directory, abort

app = Flask(__name__)

# Directory where PDF files are stored
PDF_DIRECTORY = 'certificates/'

@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    try:
        # Send the file from the PDF_DIRECTORY
        return send_from_directory(PDF_DIRECTORY, filename, as_attachment=True)
    except FileNotFoundError:
        # Return a 404 error if the file is not found
        abort(404)

if __name__ == '__main__':
    app.run(debug=True)
