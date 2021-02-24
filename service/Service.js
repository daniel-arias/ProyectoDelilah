const { db, getQuery, postQuery } = require('./../database/mysqlHandler');
const jwt = require('jsonwebtoken');


async function GetUserId(token) {
  if (!token) {
    return -1;
  }

  var userMail;
  jwt.verify(token, process.env.key, (err, usuario) => {
    if (err) return -1;
    userMail = usuario.email;
  });

  try {
    console.log('here2');
    const baseQry = `SELECT * FROM ${process.env.DB_NAME}.usuario WHERE correo = "${userMail}"`;
    const resData = await getQuery(baseQry, { type: db.QueryTypes.SELECT });
    const found = resData.find(x => x.correo == userMail);

    return found ? found.id : -1;

  } catch (error) {
    console.log('error ? ' + error);
    return -1;
  }
}

class Service {
  constructor(entity) {
    this.get = this.get.bind(this);
    this.delete = this.delete.bind(this);
    this.entity = entity;
  }

  async delete(req, res) {
    const { params: { id: idParam } } = req;
    const id = parseFloat(idParam);
    if (!id || id === '') res.status(400).send('Error en la consulta');
    const qry = `DELETE FROM ${process.env.DB_NAME}.${this.entity} WHERE id = ${id}`;

    try {
      const resData = await postQuery(qry);
      console.log(resData);
      res.json(resData);

    } catch (error) {
      res.status(400).send('Error en la consulta');
    }
  }

  async get(req, res) {

    // if (!checkLogin(req)) return res(400).send('Not loggin');
    const { headers: { authorization } } = req;
    const token = authorization && authorization.split(' ')[1];

    const idUser = await GetUserId(token);
    const { params: { id: idParam } } = req;

    const id = parseFloat(idParam);
    var baseQry = `SELECT * FROM ${process.env.DB_NAME}.${this.entity}`;
    baseQry = this.entity === 'pedidos' && idUser > 0 ? `SELECT a.* FROM ${process.env.DB_NAME}.pedido as a inner join ${process.env.DB_NAME}.usuario as b on a.idUsuario = b.id where a.idUsuario = '${idUser}'` : baseQry;
    baseQry = (id) && this.entity === 'pedidos' ? baseQry + ` and a.id = '${id}'` : baseQry;
    const qry = (id) && this.entity !== 'pedidos' ? `${baseQry} WHERE id = "${id}"` : baseQry;

    try {
      const resData = await getQuery(qry, { type: db.QueryTypes.SELECT });
      res.json(resData);

    } catch (error) {
      res.status(400).send('Error en la consulta');
    }
  }
}

class UserExtended extends Service {
  constructor(entity) {
    super(entity);
  }

  async login(req, res) {
    const { email, password } = req.body;

    const baseQry = `SELECT * FROM ${process.env.DB_NAME}.usuario`;
    const usuarios = await getQuery(baseQry, { type: db.QueryTypes.SELECT })

    const user = usuarios.find(usuario => usuario.correo === email)

    if (!(user && user.contrasena === password)) {
      return res.status(400).send('not valid');
    }

    const { rol } = user;
    const token = jwt.sign({ rol, email }, process.env.key);

    res.json(token);
  };

  async post(req, res) {
    const {
      body: {
        nombre: nombreUser,
        usuario: usuarioUser,
        correo: correoUser,
        telefono: telefonoUser,
        direccion: direccionUser,
        contrasena: claveUser,
        rol: rolUser
      },
    } = req;

    if (
      Object.values(req.body).find(val => val === null || val === undefined)
    ) {
      res.status(409).send("La información no es correcta");
    } else {
      const baseQry =
        `INSERT INTO delilahresto.usuario` +
        `(id,nombre,usuario,correo,telefono,direccion,contrasena,rol)` +
        `VALUES` +
        `(null,"${nombreUser}","${usuarioUser}","${correoUser}","${telefonoUser}","${direccionUser}","${claveUser}","${rolUser}")`;

      try {
        const resData = await postQuery(baseQry);
        res.json(resData);

      } catch (error) {
        res.status(400).send('Error en la consulta');
      }
    }
  }
}

class ProductsExtended extends Service {
  constructor(entity) {
    super(entity);
  }

  async put(req, res) {
    const { params: { id: idParam } } = req;
    const idProducto = parseFloat(idParam);
    const baseQry = `SELECT * FROM ${process.env.DB_NAME}.producto WHERE id="${idProducto}"`;
    let product = await getQuery(baseQry, { type: db.QueryTypes.SELECT })

    if (
      Object.values(req.body).find(val => val === null || val === undefined) || Object.keys(product).length === 0
    ) {
      res.status(409).send("La información no es correcta");
    } else {

      const productUpdate = { ...req.body };
      try {
        let putQry =
          `UPDATE delilahresto.producto SET `;

        Object.keys(productUpdate).forEach(key => {
          putQry = putQry + key + ` = "${productUpdate[key]}", `;
        });

        putQry = putQry.substring(0, putQry.length - 2);
        putQry = putQry + ` WHERE id = "${idProducto}"`;
        const resData = await postQuery(putQry);
        res.status(204).send('OK');;

      } catch (error) {
        res.status(400).send('Error en la consulta');
      }
    }
  }

  async post(req, res) {
    console.log('here');
    console.log('body: ' + JSON.stringify(req.body, null, 2));
    const {
      body: {
        nombre: nombreProduct,
        descripcion: descripcionProduct,
        precio: precioProduct,
        imagen: imagenProduct
      },
    } = req;

    if (
      Object.values(req.body).find(val => val === null || val === undefined)
      || !nombreProduct || !descripcionProduct || !precioProduct || !imagenProduct
    ) {
      res.status(409).send("La información no es correcta");
    } else {
      const baseQry =
        `INSERT INTO delilahresto.producto` +
        `(id,nombre,descripcion,precio,imagen)` +
        `VALUES` +
        `(null,"${nombreProduct}","${descripcionProduct}","${precioProduct}","${imagenProduct}")`;

      try {
        const resData = await postQuery(baseQry);
        res.json(resData);

      } catch (error) {
        res.status(400).send('Error en la consulta');
      }
    }
  }
}

class PedidosExtended extends Service {

  async post(req, res) {
    const {
      body: {
        metodoPago: metodoPagoPedido,
        productos: productosPedido
      }
    } = req;

    if (
      Object.values(req.body).find(val => val === null || val === undefined)
      || !metodoPagoPedido || !productosPedido
    ) {
      res.status(409).send("La información no es correcta");
    } else {
      try {
        const { headers: { authorization } } = req;
        const token = authorization && authorization.split(' ')[1];

        const idUser = await GetUserId(token);
        const productsQry = `SELECT * FROM ${process.env.DB_NAME}.producto`;
        const productsDB = await postQuery(productsQry);

        var baseQry;
        var totalPedido = 0;
        var iCantidad;
        var iPrecio;

        productosPedido.forEach(detalle => {
          const { idProducto, cantidad } = detalle;
          const productFinded = productsDB[0].find(x => x.id === idProducto);

          if (!productFinded) {
            console.log("PedidosExtended|!productFinded");
            res.status(400).send('Error en la consulta');
          }

          iCantidad = parseInt(cantidad);
          iPrecio = parseInt(productFinded.precio);

          totalPedido += iCantidad * iPrecio;
        });

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        baseQry =
          `INSERT INTO delilahresto.pedido ` +
          `(id,valorTotal,hora,estado,metodoPago,idUsuario) ` +
          `VALUES ` +
          `(null,${totalPedido},('${dateTime}'),"nuevo","${metodoPagoPedido}","${idUser}")`;

        const resData = await postQuery(baseQry);
        const idPedido = resData[0];
        var detallePedidoQry = `INSERT INTO delilahresto.detallepedido (id,idPedido,idProducto,cantidad) VALUES `;
        productosPedido.forEach(detalle => {
          const { idProducto, cantidad } = detalle;

          detallePedidoQry = detallePedidoQry +
            `(null,${idPedido},'${idProducto}',"${cantidad}"),`;
        });

        detallePedidoQry = detallePedidoQry.substring(0, detallePedidoQry.length - 1);
        const resDataDetallePedido = await postQuery(detallePedidoQry);
        res.status(204).send('OK');
      } catch (error) {
        res.status(400).send('Error en la consulta');
      }
    }
  }

  async put(req, res) {

    const { params: { id: idParam } } = req;
    const idPedido = parseFloat(idParam);

    const {
      body: {
        estado: estadoPedido
      },
    } = req;

    if (
      Object.values(req.body).find(val => val === null || val === undefined || idPedido === '')
    ) {
      res.status(409).send("La información no es correcta");
    } else {
      const baseQry =
        `UPDATE delilahresto.pedido SET estado = "${estadoPedido}" ` +
        `WHERE id = ${idPedido}`;

      try {
        const resData = await postQuery(baseQry);
        res.json(resData);

      } catch (error) {
        res.status(400).send('Error en la consulta');
      }
    }
  }
}

class DetallePedidosExtended extends Service {

}

module.exports = {
  Service,
  UserExtended,
  ProductsExtended,
  PedidosExtended,
  DetallePedidosExtended,
};