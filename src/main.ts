import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '..', 'config.env') })

import { Server } from './server'
import { CONFIG } from './config'

function runServer() {
  process.on('uncaughtException', (err: Error) => {
    console.error('uncaught exception', err, err.stack)
  })

  process.on('unhandledRejection', (err: Error) => {
    console.error('unhandled promise rejection', err, err.stack)
  })

  const server = new Server(CONFIG)

  server.run().catch((e: Error) => {
    console.error('error while starting server', e)
    process.exit(1)
  })
}

runServer()
