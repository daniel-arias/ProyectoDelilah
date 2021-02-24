
/**
 * Middlewares
 */
const md = require('./../middelware');


/**
 * Service
 */
const { Service, UserExtended, ProductsExtended, PedidosExtended, DetallePedidosExtended } = require('./Service');
const { URLS } = require('../utils/Constants');

const setRoutes = (app) => {
  const serviceUsers = new UserExtended("usuario");
  const serviceProductos = new ProductsExtended("producto");
  const servicePedidos = new PedidosExtended("pedidos");
  const serviceDetallePedidos = new DetallePedidosExtended("detallepedido");
  
  app.post(`${URLS.API_BASE}${URLS.LOGIN}`, serviceUsers.login);

  app.get(`${URLS.API_BASE}${URLS.USERS}/:id?`, md.auth.login,serviceUsers.get);
  app.post(`${URLS.API_BASE}${URLS.USERS}`, serviceUsers.post);
  app.delete(`${URLS.API_BASE}${URLS.USERS}/:id?`,md.auth.authUser, serviceUsers.delete);
  
  app.get(`${URLS.API_BASE}${URLS.PRODUCTOS}/:id?`, md.auth.authUser, serviceProductos.get);
  app.put(`${URLS.API_BASE}${URLS.PRODUCTOS}/:id?`, md.auth.authUser, serviceProductos.put);
  app.post(`${URLS.API_BASE}${URLS.PRODUCTOS}`, md.auth.authUser, serviceProductos.post);
  app.delete(`${URLS.API_BASE}${URLS.PRODUCTOS}/:id?`, md.auth.authUser, serviceProductos.delete);
  
  app.get(`${URLS.API_BASE}${URLS.PEDIDOS}/:id?`, md.auth.login, servicePedidos.get);
  app.put(`${URLS.API_BASE}${URLS.PEDIDOS}/:id?`,md.auth.authUser, servicePedidos.put);
  app.post(`${URLS.API_BASE}${URLS.PEDIDOS}`, md.auth.login, servicePedidos.post);
  app.delete(`${URLS.API_BASE}${URLS.PEDIDOS}/:id?`, md.auth.authUser, servicePedidos.delete);
  
  app.get(`${URLS.API_BASE}${URLS.DETALLE_PEDIDOS}/:id?`, md.auth.login, serviceDetallePedidos.get);
};


module.exports = {
  setRoutes
}