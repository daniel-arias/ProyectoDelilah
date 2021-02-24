const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const db = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

async function getQuery(dbQuery, typeQuery) {    
    try {
        const result = await db.query(dbQuery, typeQuery);
        return result;       
    } catch (err) {
        return Promise.reject(err);
    }
}

async function postQuery(dbQuery) {    
    try {
        const result = await db.query(dbQuery);
        return result;       
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = {
    db, getQuery, postQuery
}