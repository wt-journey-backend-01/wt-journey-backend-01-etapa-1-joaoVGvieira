const express = require('express')
const path = require('path');
const app = express();
const PORT = 3000;
const fs = require('fs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

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

app.post('/contato', (req, res) => {
    const { nome, email, mensagem, assunto } = req.body; 
    if (!nome || !email || !assunto || !mensagem) {
    return res.status(400).send('Por favor, preencha todos os campos do formulário.');}
    console.log(`Nome: ${nome}, Email: ${email}, Assunto: ${assunto}, Mensagem: ${mensagem}`);
    res.send(`
        <html>
            <head><link rel="stylesheet" href="/css/style.css"></head>
            <body>
                <h1>Mensagem recebida!</h1>
                <p><strong>Assunto:</strong> ${assunto}</p>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mensagem:</strong> ${mensagem}</p>
                <a href="/">Voltar</a>
            </body>
        </html>
    `);
});




app.get('/api/lanches', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'data', 'lanches.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        erro: 'Erro ao acessar o arquivo de lanches.',
        detalhes: err.message
      });
    }

    try {
      const lanches = JSON.parse(data);
      res.json(lanches);
    } catch (parseError) {
      res.status(500).json({
        erro: 'Erro ao processar o conteúdo do arquivo JSON.',
        detalhes: parseError.message
      });
    }
  });
});
