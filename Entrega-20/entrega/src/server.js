const express = require('express');
const app = express();

require('./database/connection');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});

const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');
app.use('/api', usersRouter);
app.use('/api', messagesRouter);


const PORT = 8080;


const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});


server.on('error', error => {
    console.log('error en el servidor:', error);
});
