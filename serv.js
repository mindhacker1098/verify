const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Example hardcoded data for demonstration
const validCertificates = {
    'CERT123': { 'name': 'John Doe', 'pdf': 'certificates/CERT123.pdf' },
    'CERT456': { 'name': 'Jane Smith', 'pdf': 'certificates/CERT456.pdf' },
    'CERT789': { 'name': 'Alice Johnson', 'pdf': 'certificates/CERT789.pdf' }
};

app.post('/verify', (req, res) => {
    const { certificateId } = req.body;

    if (validCertificates[certificateId]) {
        const certificate = validCertificates[certificateId];
        res.json({
            valid: true,
            name: certificate.name,
            pdf: certificate.pdf // Note: In a real-world scenario, you might want to secure this path.
        });
    } else {
        res.status(404).json({ valid: false });
    }
});

app.get('/certificate/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'certificates', filename);

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
