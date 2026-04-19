const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    // Usa a variável do Render se existir, senão usa o padrão
    host: process.env.EMAIL_HOST || "smtp.kinghost.net",
    port: parseInt(process.env.EMAIL_PORT) || 465,
    secure: true, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
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
        console.log("✅ E-mail enviado com sucesso!");
        return info;
    } catch (error) {
        console.error("❌ Erro ao enviar e-mail:", error.message);
        return null;
    }
};

module.exports = enviarEmail;