import express, { response } from 'express';
import { Database } from './database';
import { randomUUID } from 'node:crypto';

const app = express();
const port = 3000; // definir a porta.

//interceptador de dados
app.use(express.json());

const database = new Database();

const table = "user";

// request = parametro que esta vindo do CLIENTE
// response = parametro que esta vindo do CLIENTE
app.get('/', (request, response ) => {

  const user = database.select(table);

  response.json(user)
});

app.get('/:id', (request, response) => {
  const {id} = request.params

 const result = database.select(table, id);

 if(result === undefined) response.status(400).json({msg:'Usuarios nao encontrado'})

  response.json()
})

app.post('/', (request, response ) => {
const {name, email} = request.body;

const user = {
  id: randomUUID(), name, email
  // ou name: name, email: email
  //isso só em versões antigas
  };

  database.insert(table, user);

response.status(201).send({msg:'ok'});
});

app.delete('/:id', (request, response) => {
  const {id} = request.params

  const userExist = database.select(table, id);

  if(userExist === undefined) response.status(400).json(
    {msg:'Usuario nao encontrado'});

    database.delete(table, id)

    response.status(202).json(
      {msg: `Usuario ${userExist.name} deletado` });

  //database.select(table, id)
})

// precisa de uma porta e função de Call Back.
app.listen(port, () => {
  console.log(`Sever ON!! ╰(*°▽°*)╯ esta running - end:http://localhost:${port}`);

});

