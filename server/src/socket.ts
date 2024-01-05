import { Server, Socket } from 'socket.io'
import { httpServer } from './app'
import { handleMessageEvent } from './socketEventHandlers'
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './interfaces'
import { logger } from './config/winston.config'

const setupSocket = () => {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    cors: {
      origin: '*',
    },
  })

  io.on('connection', (socket: Socket) => {
    logger.info('connected!', socket.id)

    // event handlers
    handleMessageEvent(socket)

    //handle client disconnection
    socket.on('disconnect', () => {
      logger.info('disconnected!', socket.id)
    })
  })

  return io
}

export default setupSocket
