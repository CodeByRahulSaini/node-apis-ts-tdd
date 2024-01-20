import { Request, Response } from 'express'
import httpStatus from 'http-status'

import { CreateUserInput, GetNoteInput, ListNoteInput, ShareNoteInput } from './note.schema'
import { createNote, findAllNotes, findNote, deleteNote, updateNote, shareNote } from './note.service'
import { sendResponse, AppError } from '../../utils/response.util'
import tryCatch from '../../utils/trycatch.util'

/**
 * Create a new note
 */
export const add = tryCatch(async (req: Request<null, null, CreateUserInput>, res: Response) => {
  const note = await createNote({ userId: res.locals.userId, ...req.body })
  sendResponse(res, { note }, httpStatus.CREATED)
})

/**
 * Get all notes
 */
export const list = tryCatch(async (req: Request<null, null, null, ListNoteInput>, res: Response) => {
  const withSearch = req.query.search ? { $text: { $search: req.query.search } } : {}
  const notes = await findAllNotes({ userId: res.locals.userId, ...withSearch })

  sendResponse(res, { notes })
})

/**
 * Get a note by id
 */
export const get = tryCatch(async (req: Request<GetNoteInput, null, null>, res: Response) => {
  const note = await findNote({ _id: req.params.id, userId: res.locals.userId })
  if (!note) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Note not found')
  }
  sendResponse(res, { note })
})

/**
 * Update a note
 */
export const update = tryCatch(async (req: Request<GetNoteInput, null, CreateUserInput>, res: Response) => {
  const note = await updateNote({ _id: req.params.id, userId: res.locals.userId }, req.body)

  sendResponse(res, { note })
})

/**
 * Delete a note
 */
export const remove = tryCatch(async (req: Request<GetNoteInput, null, CreateUserInput>, res: Response) => {
  const { deletedCount } = await deleteNote({ _id: req.params.id, userId: res.locals.userId })
  if (deletedCount === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Note not found')
  }

  sendResponse(res)
})

/**
 * Share a note
 */
export const share = tryCatch(async (req: Request<GetNoteInput, null, ShareNoteInput>, res: Response) => {
  const note = await shareNote({ _id: req.params.id }, req.body.userId)
  sendResponse(res, { note })
})
