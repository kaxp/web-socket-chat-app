
var ws = require('ws').Server;
const http = require('http')
const exp = require('express')
var path = require('path');

const app = exp()


app.use(exp.static('public'))


app.get('/home', (req,res)=>{

    res.sendFile(path.join(__dirname + '/public/index.html'));
  //res.json({home : 'home'})
})


const server = http.createServer(app)
const PORT = process.env.PORT || 3000


server.listen(PORT,()=> {
    console.log(`the server is running on ${PORT} and date is ${new Date()}`)
})


/**
* WebSocket server
*/
var s = new ws({
    // WebSocket server is tied to a HTTP server. WebSocket
    // request is just an enhanced HTTP request. For more info 
    // http://tools.ietf.org/html/rfc6455#page-6
    server
  });



// const PORT = process.env.PORT || 3000

// var s = new server({ port: PORT});

var name;

s.on('connection', function(ws){
    ws.on('message', function(message){

        message = JSON.parse(message);

        if(message.type == 'name'){
            ws.personName = message.data;
            return;
        }

        console.log("Received: " + message);
        
        s.clients.forEach(function e(client){
            if(client != ws)
            client.send(JSON.stringify({
                name: ws.personName,
                data: message.data
            })); 
        });
    });

    ws.on('close', function(){
        console.log("I lost a client");
    });

    console.log("one more client connected");
})