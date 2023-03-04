import express from 'express';
import { Database } from './database';

const app = express();
const port = 3000; // definir a porta.

//interceptador de dados
app.use(express.json());

const database = new Database();

// request = parametro que esta vindo do CLIENTE
// response = parametro que esta vindo do CLIENTE
app.get('/', (request, response ) => {

  const user = database.select("user");

  response.json(user)
});

app.post('/', (request, response ) => {
const {name, email} = request.body;

const user = {
  id: '1', name, email
  // ou name: name, email: email
  //isso só em versões antigas
  };

  database.insert('user', user);

response.status(201).send();
});

// precisa de uma porta e função de Call Back
app.listen(port, () => {
  console.log(`Sever ON!! ╰(*°▽°*)╯ esta running - end: http://localhost:${port}`);

});

