const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'mail.domiciano.shop', 
    port: 587,
    secure: false, // OBRIGATÓRIO para porta 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // Mantém a compatibilidade com o que vimos no PHP
    },
    family: 4
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
        console.log("✅ E-mail enviado com sucesso!");
        return info;
    } catch (error) {
        console.error("❌ Erro ao enviar e-mail:", error.message);
        return null;
    }
};

module.exports = enviarEmail;