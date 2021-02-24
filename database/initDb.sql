CREATE database IF NOT EXISTS delilahresto;
DROP TABLE IF EXISTS delilahresto.usuario;
DROP TABLE IF EXISTS delilahresto.producto;
DROP TABLE IF EXISTS delilahresto.pedido;
DROP TABLE IF EXISTS delilahresto.detallePedido;
CREATE TABLE delilahresto.usuario (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  usuario VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  telefono VARCHAR(100) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  contrasena VARCHAR(100) NOT NULL,
  rol ENUM('usuario', 'admin') NOT NULL
);
CREATE TABLE delilahresto.producto (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(100) NOT NULL,
  precio DECIMAL NOT NULL,
  imagen VARCHAR(255) NOT NULL
);
CREATE TABLE delilahresto.pedido (
	id INT PRIMARY KEY AUTO_INCREMENT,
  valorTotal DECIMAL NOT NULL,
  hora DATETIME NOT NULL,
  estado ENUM('nuevo', 'confirmado', 'preparando', 'enviando', 'cancelado', 'entregado') NOT NULL,
  metodoPago ENUM('efectivo', 'tarjeta credito') NOT NULL,
  idUsuario INT NOT NULL
);
CREATE TABLE delilahresto.detallePedido (
	id INT PRIMARY KEY AUTO_INCREMENT,
	idPedido INT NOT NULL,
	idProducto INT NOT NULL,
	cantidad INT NOT NULL
);

-- Insert Users
INSERT INTO `delilahresto`.`usuario`
(`id`,`nombre`,`usuario`,`correo`,`telefono`,`direccion`,`contrasena`,`rol`)
VALUES
(null,"test_name1","test_user1","test_correo1@correo.com","test_telefono1","test_direccion1","test_pass1","usuario");

INSERT INTO `delilahresto`.`usuario`
(`id`,`nombre`,`usuario`,`correo`,`telefono`,`direccion`,`contrasena`,`rol`)
VALUES
(null,"test_name2","test_user2","test_correo2@correo.com","test_telefono2","test_direccion2","test_pass2","usuario");

INSERT INTO `delilahresto`.`usuario`
(`id`,`nombre`,`usuario`,`correo`,`telefono`,`direccion`,`contrasena`,`rol`)
VALUES
(null,"test_name3","test_user3","test_correo3@correo.com","test_telefono3","test_direccion3","test_pass3","usuario");

INSERT INTO `delilahresto`.`usuario`
(`id`,`nombre`,`usuario`,`correo`,`telefono`,`direccion`,`contrasena`,`rol`)
VALUES
(null,"test_name4","test_user4","test_correo4@correo.com","test_telefono4","test_direccion4","test_pass4","usuario");

INSERT INTO `delilahresto`.`usuario`
(`id`,`nombre`,`usuario`,`correo`,`telefono`,`direccion`,`contrasena`,`rol`)
VALUES
(null,"test_admin","test_admin","test_correo_admin@correo.com","test_telefono_admin","test_direccion_admin","test_pass_admin","admin");

-- Insert Pedidos

INSERT INTO `delilahresto`.`pedido`
(`id`,`valorTotal`,`hora`,`estado`,`metodoPago`,`idUsuario`)
VALUES
(null,1000,('2020-11-13 10:10:10'),"nuevo","efectivo",1);

INSERT INTO `delilahresto`.`pedido`
(`id`,`valorTotal`,`hora`,`estado`,`metodoPago`,`idUsuario`)
VALUES(null,2000,('2020-11-13 10:10:10'),"confirmado","tarjeta credito",1);

INSERT INTO `delilahresto`.`pedido`
(`id`,`valorTotal`,`hora`,`estado`,`metodoPago`,`idUsuario`)
VALUES(null,3000,('2020-11-13 10:10:10'),"enviando","efectivo",1);

INSERT INTO `delilahresto`.`pedido`
(`id`,`valorTotal`,`hora`,`estado`,`metodoPago`,`idUsuario`)
VALUES(null,4000,('2020-11-13 10:10:10'),"cancelado","tarjeta credito",1);
(null,5000,('2020-11-13 10:10:10'),"entregado","efectivo",1);

INSERT INTO `delilahresto`.`pedido`
(`id`,`valorTotal`,`hora`,`estado`,`metodoPago`,`idUsuario`)
VALUES
(null,6000,('2020-11-14 10:10:10'),"nuevo","efectivo",2);

INSERT INTO `delilahresto`.`pedido`
(`id`,`valorTotal`,`hora`,`estado`,`metodoPago`,`idUsuario`)
VALUES
(null,7000,('2020-11-14 10:10:10'),"confirmado","efectivo",2);

INSERT INTO `delilahresto`.`pedido`
(`id`,`valorTotal`,`hora`,`estado`,`metodoPago`,`idUsuario`)
VALUES
(null,8000,('2020-11-15 10:10:10'),"confirmado","tarjeta credito",3);

INSERT INTO `delilahresto`.`pedido`
(`id`,`valorTotal`,`hora`,`estado`,`metodoPago`,`idUsuario`)
VALUES
(null,9000,('2020-11-15 10:10:10'),"enviando","tarjeta credito",3);

-- insert producto

INSERT INTO `delilahresto`.`producto`(`id`,`nombre`,`descripcion`,`precio`,`imagen`)
VALUES
(null, "producto 1","prod 1", 1000,"");
INSERT INTO `delilahresto`.`producto`(`id`,`nombre`,`descripcion`,`precio`,`imagen`)
VALUES
(null, "producto 2","prod 2", 1000,"");
INSERT INTO `delilahresto`.`producto`(`id`,`nombre`,`descripcion`,`precio`,`imagen`)
VALUES
(null, "producto 3","prod 3", 1000,"");
INSERT INTO `delilahresto`.`producto`(`id`,`nombre`,`descripcion`,`precio`,`imagen`)
VALUES
(null, "producto 4","prod 4", 1000,"");
INSERT INTO `delilahresto`.`producto`(`id`,`nombre`,`descripcion`,`precio`,`imagen`)
VALUES
(null, "producto 5","prod 5", 1000,"");
INSERT INTO `delilahresto`.`producto`(`id`,`nombre`,`descripcion`,`precio`,`imagen`)
VALUES
(null, "producto 6","prod 6", 1000,"");
INSERT INTO `delilahresto`.`producto`(`id`,`nombre`,`descripcion`,`precio`,`imagen`)
VALUES
(null, "producto 7","prod 7", 1000,"");
INSERT INTO `delilahresto`.`producto`(`id`,`nombre`,`descripcion`,`precio`,`imagen`)
VALUES
(null, "producto 8","prod 8", 1000,"");
INSERT INTO `delilahresto`.`producto`(`id`,`nombre`,`descripcion`,`precio`,`imagen`)
VALUES
(null, "producto 9","prod 9", 1000,"");

-- insert detallePedido

INSERT INTO `delilahresto`.`detallepedido` (`id`,`idPedido`,`idProducto`,`cantidad`)
VALUES
(null,1,1,10);
INSERT INTO `delilahresto`.`detallepedido` (`id`,`idPedido`,`idProducto`,`cantidad`)
VALUES
(null,2,2,20);
INSERT INTO `delilahresto`.`detallepedido` (`id`,`idPedido`,`idProducto`,`cantidad`)
VALUES
(null,3,3,30);
INSERT INTO `delilahresto`.`detallepedido` (`id`,`idPedido`,`idProducto`,`cantidad`)
VALUES
(null,4,4,40);
INSERT INTO `delilahresto`.`detallepedido` (`id`,`idPedido`,`idProducto`,`cantidad`)
VALUES
(null,5,5,50);