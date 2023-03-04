export class Database {
#database = {};

  select(table:string):object {
    const data = this.database[table] ?? []
    // ?? = um operador que verifica se o estado da condição esta NULL ou UNDER, se esta ele NULL ele alocar o espaço para um dado ja programado.
    return data
  }

  insert(table, data:object):object {//espera uma objeto

    if(Array.isArray(this.database[table])) {
      // add o dado
      this.database[table].push(data)
    } else {
      // altera um dado ja existente
      this.database[table] = [data]
    }

    return data //retorna uma objeto
  }


}
