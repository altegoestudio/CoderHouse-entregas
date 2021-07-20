


//CRUD SQL

//CREATE
CREATE SCHEMA "db_16"
CREATE DATABASE db_15 CHARACTER SET utf8;
CREATE TABLE usuarios(
  id int AUTO_INCREMENT,
  nombre varchar(255) NOT NULL,
  apellido varchar(255) NOT NULL,
  edad integer NOT NULL unsigned,
  PRIMARY KEY (id)
);

INSERT INTO usuarios (nombre, apellido) VALUES ("Pablo", "Menendez");

//READ
SELECT nombre FROM "usuarios";
SELECT * FROM "usuarios" WHERE edad > 12;
SELECT DISTINCT nombre FROM usuarios;
SELECT COUNT(DISTINCT nombre) FROM usuarios;
SELECT

//UPDATE

UPDATE usuarios SET edad = 27 WHERE id = 6;

//DELETE
DELETE FROM usuarios WHERE id = 1;
