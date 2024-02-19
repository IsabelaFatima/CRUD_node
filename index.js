const express = require('express');
const app = express();
const port = 3333;

const mysql = require('mysql2')
//Config Mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db'
})

db.connect(err => {
    if (err) {
      console.error('Erro ao conectar ao MySQL: ' + err.stack);
      return;
    }
    console.log('Conectado ao MySQL como ID ' + db.threadId);
  });

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rotas
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM teste', (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });

  app.post('/usuario', (req, res) => {
    const { nome, email } = req.body;
    db.query('INSERT INTO usuarios (nome, email) VALUES (?, ?)', [nome, email], (err, result) => {
      if (err) throw err;
      res.send('Usuário criado com sucesso!');
    });
  });

  app.put('/usuario/:id', (req, res) => {
    const { nome, email } = req.body;
    const id = req.params.id;
    db.query('UPDATE usuarios SET nome = ?, email = ? WHERE id = ?', [nome, email, id], (err, result) => {
      if (err) throw err;
      res.send('Usuário atualizado com sucesso!');
    });
  });

  app.delete('/usuario/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
      if (err) throw err;
      res.send('Usuário deletado com sucesso!');
    });
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));