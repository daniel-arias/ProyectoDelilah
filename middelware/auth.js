const jwt = require('jsonwebtoken');
const { ifError } = require('assert');
const { userInfo } = require('os');
const { db, getQuery } = require('./../database/mysqlHandler');


const authUser = (req, res, next) => {
    const { headers: { authorization } } = req;
    const token = authorization && authorization.split(' ')[1];
    
    if (!token) {
        return res.status(403).send('no valid auth method');
    }

    jwt.verify(token, process.env.key, (err, usuario) => {
        if (err) return res.status(400).send('no valid auth token');
        if (usuario.rol != "admin") return res.status(403).send('no user admin');
        return next();
    });
}

const login = async (req, res, next) => {
    console.log("checkLogin|middelware ");
    const { headers: { authorization } } = req;
    const token = authorization && authorization.split(' ')[1];
    
    if (!token) {
        return res(403).send('no valid auth method');
    }
    
    console.log("checkLogin|token: " + token);
    var userMail;

    jwt.verify(token, process.env.key, (err, usuario) => {
        if (err) return res(400).send('no valid auth token');
        console.log("usuario|email: " + usuario.email);
        console.log("usuario|rol: " + usuario.rol);
        if (!usuario.email || !usuario.rol ||  (usuario.rol !== 'usuario' && usuario.rol !== 'admin') ) return res(403).send('data user incorrect');
        userMail = usuario.email;
    });

    try {
        const baseQry = `SELECT * FROM ${process.env.DB_NAME}.usuario WHERE correo = "${userMail}"`;
        console.log("checkLogin|baseQry: " + baseQry);
        const resData = await getQuery(baseQry, { type: db.QueryTypes.SELECT });
        console.log("checkLogin|resData: " + JSON.stringify(resData));
        const found = resData.find(x => x.correo == userMail);
        console.log("checkLogin|found: " + found.correo + " id: " + found.id);
        
        return found ? next() : res(400).send('no valid auth token');
    
      } catch (error) {
        console.log('error ? ' + error);
        return res(400).send('no valid auth token');
      }
}

module.exports = {
    authUser,
    login
};


