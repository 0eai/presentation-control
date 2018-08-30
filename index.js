var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const robot = require('robotjs')
const c = require('./constants')
const handleSocket = require('./Server/socket.js')
const os = require('os')

const port = process.env.PORT || 9999
const ifaces = os.networkInterfaces()

io.on('connection', socket => handleSocket(socket, robot))

io.on('connection', function(socket){
  console.log('\na user connected\n');
});

http.listen(9999, function(){
  console.log('listening on *:9999');
  Object.keys(ifaces).forEach(ifname =>
    ifaces[ifname].forEach(iface =>
      console.log('listening on', iface.address, 'and port', port)))
});
