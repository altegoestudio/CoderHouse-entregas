//Utilizar compresion GZIP
//usar llamadas asincrona
//evitar console.log() en desarrollo
//usar excepciones usar try and catch
// Usar NODE_ENV



var express = require("express");
var app = express();
var compression = require("compression");



app.use(compression());



//npm install log4js

const log4js = require("log4js");
const logger = log4js.getLogger();


log4js.configure({
  appenders:{
    miLoggerConsole: {type: "console"},
    miLoggerFile: {type: "file", filename: "info.log"},
    miLoggerFile2: {type: "file", filename: "warn.log"},
    miLoggerFile3: {type: "file", filename: "error.log"}
  },
  categories:{
    default: {appenders: ["miLoggerConsole"], level: "trace"},
    consola: {appenders: ["miLoggerConsole"], level: "debug"},
    archivo: {appenders: ["miLoggerFile"], level: "warn"},
    archivo2: {appenders: ["miLoggerFile2"], level: "info"},
    todo: {appenders: ["miLoggerConsole","miLoggerFile"], level: "error"}
  }
});


logger.trace("Trace");
logger.debug("Debug");
logger.warn("Warn");
logger.info("Info");
