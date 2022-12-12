const express = require('express');
const app = express();
const port = 4000;
const server = require('http').createServer(app)
const cors = require('cors')
app.use(cors());
const io = require('socket.io')(server,{
    cors : {
        origin :"*",
        credentials :true
    }
});

app.get('/', (req, res) => {
    res.json('hi'); 
    console.log("connected");
});


io.on('connection', socket=>{
    
    socket.on('join', (data) =>{ 
        console.log('join socket on')
        socket.join(data.data.room,()=>{
            console.log(data.data.name+'방입장');
        });
        const name = data.data.name;
        const message = data.data.message;
        io.to(data.data.room).emit('message',({name,message}));
        console.log(data.data.name)
    });

    // socket.on('message',({name,message}) => {
    //     io.emit('message',({name, message}));
    //     console.log(name+" "+message);
    // })

    socket.on('disconnect',() => {
        
    })
}) 

server.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})



