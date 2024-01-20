import express from 'express'
import morgan from 'morgan'
import config from 'config'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { errorHandler, notFoundHandler } from './middleware/error.middleware'
import { rateLimitMiddleware } from './middleware/rate-limiter.middleware'

import noteRouter from './modules/note/note.route'
import authRouter from './modules/auth/auth.route'

const app = express()

// Middleware
app.use(rateLimitMiddleware)
app.use(express.json())
app.use(cookieParser())
app.use(helmet())

// Cors
app.use(
  cors({
    origin: config.get<string>('origin'),
    credentials: true
  })
)

// Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// Routes
app.use('/api/auth', authRouter)
app.use('/api/notes', noteRouter)

// Error Handlers
app.all('*', notFoundHandler)
app.use(errorHandler)

export { app }
