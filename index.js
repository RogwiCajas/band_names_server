const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();

//sockets
const server = require('http').createServer(app);
const io = require('socket.io')(server);


// mensajes de sockets

io.on('connection', client => {
    console.log("Cliente conectado");
    client.on('disconnect', ()=>{

        console.log("Cliente desconectado");
    })

    client.on('mensaje', (payload)=>{
        console.log("Mensaje", payload);
        io.emit('mensaje', {admin: "nuevo mensaje"})
    } );
});




//Path pblico
const publicPath = path.resolve( __dirname, 'public'  );

app.use(express.static( publicPath));


server.listen(process.env.PORT, (err)=> {
    if(err) throw new Error(err);

    console.log(`servidor corriendo en puerto `, process.env.PORT);
});