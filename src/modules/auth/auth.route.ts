import express from 'express'
import { loginHandler, logoutHandler, refreshAccessTokenHandler, registerHandler } from './auth.controller'
import { auth } from '../../middleware/auth.middleware'
import { validate } from '../../middleware/error.middleware'
import { createUserSchema, loginUserSchema } from './auth.schema'

const router = express.Router()

router.post('/register', validate(createUserSchema), registerHandler)

router.post('/login', validate(loginUserSchema), loginHandler)

router.get('/refresh', refreshAccessTokenHandler)

router.post('/logout', auth, logoutHandler)

export default router
