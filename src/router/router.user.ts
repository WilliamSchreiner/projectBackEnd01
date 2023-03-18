import { Router } from "express";
import { Database } from '../database';
import { randomUUID } from 'node:crypto';

const userRoute = Router();

const database = new Database();

const table = "user";

// request = parametro que esta vindo do CLIENTE
// response = parametro que esta vindo do CLIENTE
userRoute.get('/', (request, response ) => {

  const user = database.select(table);

  response.json(user)
});

userRoute.get('/:id', (request, response) => {
  const {id} = request.params

 const result = database.select(table, id);

 if(result === undefined) response.status(400).json({msg:'Usuarios nao encontrado'})

  response.json()
})

userRoute.post('/', (request, response ) => {
const {name, email} = request.body;

const user = {
  id: randomUUID(), name, email
  // ou name: name, email: email
  //isso só em versões antigas
  };

  database.insert(table, user);

response.status(201).send({msg:'ok'});
});

userRoute.delete('/:id', (request, response) => {
  const {id} = request.params

  const userExist:any = database.select(table, id);

  if(userExist === undefined)
  return response.status(400).json(
    {msg:'Usuario nao encontrado'});

    database.delete(table, id)

    response.status(202).json(
      {msg: `Usuario ${userExist.name} deletado` });

  //database.select(table, id)
});

userRoute.put('/:id', (request,response)=>{

  const {id} = request.params
  const {name, email} = request.body

  const userExist:any = database.select(table, id);

  if(userExist === undefined)
  return response.status(400).json(
    {msg:'Usuario nao encontrado'});

    database.update(table, id, {name, email})

    response.status(201).json(
      {msg: `Usuario ${userExist.name} foi` });

})

userRoute.get('/', (request, response)=>{

  response.send(`Rota userRote ON.`)
})

export {userRoute}
