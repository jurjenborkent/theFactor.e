let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);




io.on('connection', (socket) => {

  // Log als er een user connect.
        console.log('user connected');
// log als er een user disconnect.
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });


    socket.on('message', (message) => {
        console.log("Message Recieved: " + message);
        io.emit('message', {type:'new-message', text: message});
    });
});

http.listen(5000, () => {
    console.log('started on port 5000');
})