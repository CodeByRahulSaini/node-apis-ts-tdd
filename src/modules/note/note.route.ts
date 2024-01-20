import express from 'express'
import { list, get, add, update, remove, share } from './note.controller'
import { validate } from '../../middleware/error.middleware'
import { createNoteSchema, updateNoteSchema, shareNoteSchema } from './note.schema'
import { auth } from '../../middleware/auth.middleware'

const router = express.Router()

router.get('/', auth, list)
router.post('/', auth, validate(createNoteSchema), add)
router.get('/:id', auth, get)
router.put('/:id', auth, validate(updateNoteSchema), update)
router.delete('/:id', auth, remove)
router.post('/share/:id', auth, validate(shareNoteSchema), share)

export default router
