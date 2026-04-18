const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

let cert = null;
// Procura o ca.pem na raiz (onde ele está no seu GitHub)
const certPath = path.join(process.cwd(), 'ca.pem');

try {
    if (fs.existsSync(certPath)) {
        cert = fs.readFileSync(certPath);
        console.log("✅ Certificado SSL carregado com sucesso!");
    }
} catch (err) {
    console.log("⚠️ Erro ao ler certificado, tentando sem SSL.");
}

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // SE a variável de ambiente falhar, ele usa 'defaultdb' como padrão
    database: process.env.DB_NAME || 'defaultdb', 
    port: process.env.DB_PORT || 15921,
    ssl: cert ? { ca: cert, rejectUnauthorized: false } : null,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;