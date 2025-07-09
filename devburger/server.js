const express = require('express')
const path = require('path');
const app = express();
const PORT = 3000;
const fs = require('fs');
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});

app.get('/sugestao', (req, res) => {
    const nome = req.query.nome;
    const ingredientes = req.query.ingredientes;

    res.send(`
        <html>
          <head><link rel="stylesheet" href="/css/style.css"></head>
          <body>
            <h1>Obrigado pela sugestão!</h1>
            <p><strong>Nome do lanche:</strong> ${nome}</p>
            <p><strong>Ingredientes:</strong> ${ingredientes}</p>
            <a href="/">Voltar</a>
          </body>
        </html>
    `);
});


app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});


app.use(express.urlencoded({ extended: true }));


app.post('/contato', (req, res) => {
    const { nome, email, mensagem } = req.body;
    console.log(`Nome: ${nome}, Email: ${email}, Mensagem: ${mensagem}`);
    res.send(`
            <html>
                <head><link rel="stylesheet" href="/css/style.css"></head>
                <body>
                <h1>Mensagem recebida!</h1>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mensagem:</strong> ${mensagem}</p>
                <a href="/">Voltar</a>
                </body>
            </html>
            `);
});





// Rota para listar todos os lanches
app.get('/api/lanches', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'data', 'lanches.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Erro ao ler os lanches.');
    }
    const lanches = JSON.parse(data);
    res.json(lanches);
  });
});
