const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

const enviarEmail = async (para, assunto, html) => {
    const mailOptions = {
        from: `"Tick[d] Suporte" <${process.env.EMAIL_USER}>`,
        to: para,
        subject: assunto,
        html: html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ E-mail enviado com sucesso via Gmail!");
        return info;
    } catch (error) {
        console.error("❌ Erro ao enviar e-mail:", error.message);
        return null;
    }
};

module.exports = enviarEmail;