import User from '../model/user.js'

const LOGIN = (socket) => (payload) => {
  User.fromToken(payload)
  .then(user => {
    socket.user = user;
    socket.broadcast.emit('USER_CONNECTED', user.username)
  })
  .catch(err => {
    socket.emit('error', err)
  })
}

const LOGOUT = (socket) => (payload) => {
  socket.broadcast.emit('USER_DISCONNECTED', socket.user.username)
}

export default {LOGIN, LOGOUT}
