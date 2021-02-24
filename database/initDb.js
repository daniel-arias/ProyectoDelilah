const fs = require('fs');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const db = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}`);

fs.readFile('./database/initDb.sql', 'utf-8', createProduct)

async function createProduct(err, data) {
  if (err) console.log(err);

  const queries = data
    .split(';')
    .map(row => row.replace(/\n/gmi, ''))
    .filter(row => row !== '');

  db.authenticate()
    .then(async res => {
      console.log(res);
      await queries.forEach(async query => {
        await db.query(query)
          .then(res => console.log(res))
          .catch(error => console.log(error));
      });
    })
    .then(async res => {
      await db.close()
      .then(res => console.log(res))
      .catch(error => console.log(error));
    })
    .catch(error => {
      console.log(error);
    });    
}