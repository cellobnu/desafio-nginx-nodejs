const express = require('express')
const app = express()
const port = 3000

let result = ''

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database:'nodedb'
};


const mysql = require("mysql");
const conn = mysql.createConnection(config);

async function insertPeople(){
  return conn.query(`INSERT INTO people(name) values('Marcelo')`)
}

async function selectPeople(){
  conn.query('SELECT * FROM people;', (err, rows) => {
    if (err) throw err
    rows.forEach(row => {
      result += `<li>${row.name}</li>`
    });
  })
}

insertPeople();
selectPeople();

app.get('/', (rep, res) => {
  const html = `<h1>Full Cycle Rocks!</h1><ul>${result}</ul>`
  res.send(html)
})

app.listen(port, () => {
  console.log('Rodando da Porta', port)
})