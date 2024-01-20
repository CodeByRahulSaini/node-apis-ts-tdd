import dotEnv from 'dotenv'
dotEnv.config()

import { connectDB, disconnectDB } from './utils/connect-db.util'
import { app } from './app'
import config from 'config'

const port = config.get<number>('port')

const server = app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
  connectDB()
})

// Graceful shutdown
const shutDown = () => {
  console.log('Closing http server.')

  server.close(() => {
    console.log('Http server closed.')
    disconnectDB().then(() => {
      console.log('Database disconnected...')
      process.exit(0)
    })
  })
}

process.on('SIGTERM', shutDown)
process.on('SIGINT', shutDown)
