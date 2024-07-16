document.getElementById('verifyButton').addEventListener('click', async function() {
    const certificateId = document.getElementById('certificateId').value.trim(); // Trim whitespace
    const resultDiv = document.getElementById('result');
    const certificateViewer = document.getElementById('certificateViewer');
    const certificateImage = document.getElementById('certificateImage');

    // Clear previous results
    resultDiv.innerHTML = '';
    certificateViewer.style.display = 'none';

    // Check if the input is not empty
    if (!certificateId) {
        resultDiv.innerHTML = '<p style="color: red;">Please enter a Certificate ID.</p>';
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ certificateId })
        });

        if (!response.ok) {
            throw new Error('Certificate not found');
        }

        const data = await response.json();

        if (data.valid) {
            resultDiv.innerHTML = `<p style="color: green;">Certificate is valid. Issued to: ${data.name}</p>`;
            certificateImage.src = `http://127.0.0.1:5000/certificate_image/${data.images[0].split('/').pop()}`;
            certificateViewer.style.display = 'block';
        } else {
            resultDiv.innerHTML = '<p style="color: red;">Certificate is invalid.</p>';
            certificateViewer.style.display = 'none';
        }

        resultDiv.innerHTML = `<p style="color: green;">Certificate is valid. Issued to: ${data.name}</p>`;
        certificateImage.src = `http://127.0.0.1:5000/certificate_image/${data.images[0].split('/').pop()}`;
        certificateViewer.style.display = 'block';

    } catch (error) {
        console.error("Error:", error);
        resultDiv.innerHTML = '<p style="color: red;">An error occurred while verifying the certificate.</p>';
        certificateViewer.style.display = 'none';
    }
});
