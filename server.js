const http = require('http')
const app = require('./app')
const session = require('./middelware/index')

const PORT = 3000
const server = http.createServer(app)
const io = require('socket.io')(server)
require('./routes/chat.socket.js').listen(io)

io.use(function(socket, next) {
  session(socket.request, socket.request.res, next);
})

server.listen(PORT, () => {
  console.log('Server has been started')
})

