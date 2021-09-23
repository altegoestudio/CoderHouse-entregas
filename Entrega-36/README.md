# NOTAS

Tercera entrega del proyecto final

## Installation

Use the package manager to install foobar.

```bash
npm install
```

## Postman

```
importar con el archivo json de la carpeta raiz
```
## env

poner el puerto, usuario de ethereal y contraseña
```
MAIL_USER = "usuario@ethereal.email"
MAIL_PASS = "password"
PORT = 8081
```

## Base de Datos

para cambiar entre base de datos Mongo compass y Mongo Atlas, descomentar linea 42 del server.js

```javascript
//DB
//require('./mongo/connection');
require('./mongo/connectionAtlas');
```
