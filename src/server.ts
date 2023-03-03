import express from 'express';
const app = express();
const port = 3000; // definir a porta.

app.get('/', (request, response ) => {
  //response.send('Hello World ?👌🦎🦎')
  response.json({msg:"Fatality!"});
});

app.post('/', (request, response ) => {

});

// precisa de uma porta e função de Call Back
app.listen(port, () => {
  console.log(`Sever ON!! ╰(*°▽°*)╯ esta running - end: http://localhost:${port}`);

});
