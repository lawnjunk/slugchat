const TYPEING_START = (socket) => (payload) => {
  if(socket.user){
    socket.broadcast.emit('TYPEING_START', { user: socket.user.username })
  }
}

const TYPEING_STOP = (socket) => (payload) => {
  if(socket.user) {
    socket.broadcast.emit('TYPEING_STOP ', { user: socket.user.username })
  }
}

const MESSAGE = (socket) => (payload) => {
  if(socket.user){
    socket.broadcast.emit('MESSAGE', {...payload, user: req.user.username})
  }
}

export default {TYPEING_START, TYPEING_STOP, MESSAGE}
