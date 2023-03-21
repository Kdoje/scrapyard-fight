var http = require('http').Server(this);
var io = require('socket.io')(http,  { cors: { origin: '*' } });


const port = 1337
io.on('connection', function (socket: any) {
    socket.emit('message', 'test')
    socket.on('message', function (messageContent: any) {
        io.emit('message', messageContent)
        console.log('got message')
    })
})
io.listen(port)
console.log('Listening on port ' + port + '...')

export {};