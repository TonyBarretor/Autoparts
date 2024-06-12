const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Configura el transporte de nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tu_email@gmail.com',
            pass: 'tu_contraseña'
        }
    });

    const mailOptions = {
        from: email,
        to: 'tu_email@gmail.com',
        subject: `Mensaje de ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, error });
        }
        res.status(200).json({ success: true, info });
    });
});

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
