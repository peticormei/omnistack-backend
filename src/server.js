const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectionRoom', box => {
        socket.join(box);
    });

    console.log('ok');
});

mongoose.connect(
    'mongodb+srv://omnistack:omnistack@cluster0-klxyc.mongodb.net/test?retryWrites=true', 
    {
        useNewUrlParser: true
    }
);


// MiddleWares
app.use((req, res, next) => {
    req.io = io
    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(routes);

server.listen(process.env.PORT || 3000, () => {
    console.log('server running on port 3000');
});
