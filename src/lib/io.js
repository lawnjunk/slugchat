import socketIO from 'socket.io'

export default (http, events) => socketIO(http)
.on('connection', (socket) => {
  Object.keys(events)
  .map(type => ({type, handler: events[type]}))
  .map(event => {
    socket.on(event.type , (data) => {
      console.log('__EVENT__', event.type, data)
      try {
        event.handler(socket)(data)
      } catch (error) {
        console.error('__SUBSCRIBE_ERROR__', error)
      }
    })
    .on('error', (error) => {
      console.error('__SOCKET_ERROR__', error)
    })
  })
})
.on('error', (error) => {
  console.log('__SOCKET_IO_ERROR__', error)
})

