require('dns').setDefaultResultOrder('ipv4first'); // Força o uso de IPv4 antes de tudo
const express = require('express')
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();
const db = require('./src/config/db');
const enviarEmail = require('./emailService'); // Seu motor de e-mail externo

const app = express(); // DECLARADO APENAS UMA VEZ
const saltRounds = 10;

// --- Configurações do Express ---
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- Configuração de Sessão ---
app.use(session({
    secret: 'chave_secreta_tixia',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// --- Configuração do EJS ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Configuração do Multer (Upload de Imagens) ---
const uploadDir = './public/uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, uploadDir); },
    filename: (req, file, cb) => { cb(null, Date.now() + '-' + file.originalname); }
});
const upload = multer({ storage: storage });

// --- Middleware de Proteção ---
const authMiddleware = (req, res, next) => {
    if (req.session.usuario) { next(); } else { res.redirect('/login'); }
};

// --- ROTAS DE AUTENTICAÇÃO ---
app.get('/login', (req, res) => { res.render('login', { layout: false }); });

app.post('/auth', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (users.length > 0) {
            const usuario = users[0];
            const match = await bcrypt.compare(password, usuario.senha);
            if (match) {
                req.session.usuario = usuario;
                return res.redirect('/dashboard');
            }
        }
        res.send("<script>alert('E-mail ou senha incorretos!'); window.location='/login';</script>");
    } catch (err) { res.status(500).send("Erro no servidor"); }
});

app.get('/logout', (req, res) => { req.session.destroy(); res.redirect('/login'); });

// --- ROTAS DO SISTEMA ---
app.get('/create-ticket', authMiddleware, (req, res) => {
    res.render('create-ticket', { user: req.session.usuario, currentPage: 'create-ticket' });
});

app.post('/novo-ticket', authMiddleware, upload.array('imagens', 3), async (req, res) => {
    const { titulo, descricaotext, prioridade } = req.body;
    const usuarioLogado = req.session.usuario;
    
    const img1 = req.files[0] ? req.files[0].filename : null;
    const img2 = req.files[1] ? req.files[1].filename : null;
    const img3 = req.files[2] ? req.files[2].filename : null;

    try {
        const [result] = await db.query(
            'INSERT INTO tickets (titulo, descricao, prioridade, cliente_id, imagem1, imagem2, imagem3) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [titulo, descricaotext, prioridade, usuarioLogado.id, img1, img2, img3]
        );
        
        const ticketId = result.insertId;

        // E-mail para o Cliente usando o seu serviço externo
        const htmlCliente = `
            <h2>Olá, ${usuarioLogado.nome}!</h2>
            <p>Recebemos seu ticket: <strong>${titulo}</strong></p>
            <p>Acompanhe aqui: <a href="http://localhost:3000/ticket/${ticketId}">Ver Ticket</a></p>
        `;
        enviarEmail(usuarioLogado.email, `Confirmação de Ticket #${ticketId}`, htmlCliente)
    .catch(err => console.error("Erro em background no envio de email:", err));

res.redirect('/dashboard?success=true');
    } catch (err) { res.status(500).send("Erro ao salvar: " + err.message); }
});

app.get('/dashboard', authMiddleware, async (req, res) => {
    const usuarioLogado = req.session.usuario;
    let query = usuarioLogado.tipo === 'admin' 
        ? `SELECT t.*, u.nome as cliente_nome FROM tickets t INNER JOIN usuarios u ON t.cliente_id = u.id ORDER BY t.criado_em DESC`
        : `SELECT * FROM tickets WHERE cliente_id = ? ORDER BY criado_em DESC`;
    let params = usuarioLogado.tipo === 'admin' ? [] : [usuarioLogado.id];

    try {
        const [rows] = await db.query(query, params);
        res.render('dashboard', { tickets: rows, currentPage: 'dashboard', user: usuarioLogado });
    } catch (err) { res.status(500).send("Erro ao carregar dashboard"); }
});

app.get('/ticket/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;
    try {
        const [tickets] = await db.query("SELECT * FROM tickets WHERE id = ?", [id]);
        if (tickets.length > 0) {
            const [mensagens] = await db.query(
                `SELECT m.*, u.nome, u.tipo FROM ticket_mensagens m JOIN usuarios u ON m.usuario_id = u.id WHERE m.ticket_id = ? ORDER BY m.criado_em ASC`, [id]
            );
            res.render('visualizar-ticket', { ticket: tickets[0], mensagens: mensagens, user: req.session.usuario, currentPage: 'dashboard' });
        } else { res.status(404).send("Ticket não encontrado"); }
    } catch (err) { res.status(500).send("Erro: " + err.message); }
});

app.post('/ticket/responder', authMiddleware, async (req, res) => {
    const { ticket_id, mensagem } = req.body;
    const usuarioLogado = req.session.usuario;
    try {
        await db.query("INSERT INTO ticket_mensagens (ticket_id, usuario_id, mensagem) VALUES (?, ?, ?)", [ticket_id, usuarioLogado.id, mensagem]);

        const [ticketInfo] = await db.query(`SELECT t.titulo, u.email, u.nome FROM tickets t JOIN usuarios u ON t.cliente_id = u.id WHERE t.id = ?`, [ticket_id]);

        if (usuarioLogado.tipo === 'admin') {
            await db.query("UPDATE tickets SET status = 'em_progresso' WHERE id = ?", [ticket_id]);
            const htmlResp = `<p>Olá ${ticketInfo[0].nome},</p><p>Nova resposta no ticket <strong>${ticketInfo[0].titulo}</strong>.</p>`;
            enviarEmail(ticketInfo[0].email, `Nova resposta no Ticket #${ticket_id}`, htmlResp);
        }
        res.redirect(`/ticket/${ticket_id}`);
    } catch (err) { res.status(500).send("Erro ao responder"); }
});

app.get('/calendar', authMiddleware, async (req, res) => {
    const usuarioLogado = req.session.usuario;
    let query = usuarioLogado.tipo === 'admin' 
        ? `SELECT t.*, u.nome as cliente_nome FROM tickets t INNER JOIN usuarios u ON t.cliente_id = u.id`
        : `SELECT * FROM tickets WHERE cliente_id = ?`;
    let params = usuarioLogado.tipo === 'admin' ? [] : [usuarioLogado.id];
    try {
        const [rows] = await db.query(query, params);
        res.render('calendar', { tickets: rows, user: usuarioLogado, currentPage: 'calendar' });
    } catch (err) { res.status(500).send("Erro no calendário"); }
});

app.get('/cadastro', authMiddleware, async (req, res) => {
    if (req.session.usuario.tipo !== 'admin') return res.redirect('/dashboard');
    try {
        const [usuarios] = await db.query('SELECT id, nome, email, tipo, criado_em FROM usuarios ORDER BY criado_em DESC');
        res.render('cadastro', { user: req.session.usuario, usuarios: usuarios, currentPage: 'cadastro' });
    } catch (err) { res.status(500).send("Erro ao carregar usuários"); }
});

app.post('/admin/criar-usuario', authMiddleware, async (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    try {
        const hash = await bcrypt.hash(senha, saltRounds);
        await db.query('INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)', [nome, email, hash, tipo]);
        res.send("<script>alert('Sucesso!'); window.location='/cadastro';</script>");
    } catch (err) { res.status(500).send("Erro ao criar usuário"); }
});

app.post('/ticket/status', authMiddleware, async (req, res) => {
    const { ticket_id, novo_status } = req.body;
    if (req.session.usuario.tipo !== 'admin') return res.status(403).send("Acesso negado");
    try {
        await db.query("UPDATE tickets SET status = ? WHERE id = ?", [novo_status, ticket_id]);
        res.redirect(`/ticket/${ticket_id}`);
    } catch (err) { res.status(500).send("Erro no status"); }
});

const PORT = process.env.PORT || 3000; // O Render vai preencher process.env.PORT automaticamente
app.listen(PORT, () => {
    console.log(`Plataforma rodando na porta ${PORT}`);
});