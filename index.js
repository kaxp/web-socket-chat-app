const exp = require('express')
var server = require('ws').Server;



const PORT = process.env.PORT || 3000

var s = new server({ port: PORT});

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