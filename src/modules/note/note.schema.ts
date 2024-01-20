import { object, string, TypeOf } from 'zod'

export const createNoteSchema = object({
  body: object({
    title: string({ required_error: 'Title is required' }),
    body: string({ required_error: 'Body is required' }),
    tags: string().array().optional()
  })
})

export const listNoteSchema = object({
  query: object({
    search: string()
  })
})

export const getNoteSchema = object({
  params: object({
    id: string({ required_error: 'Title is required' })
  })
})

export const updateNoteSchema = object({
  body: object({
    title: string().optional(),
    body: string().optional(),
    tags: string().array().optional()
  })
})

export const shareNoteSchema = object({
  body: object({
    userId: string({ required_error: 'User id is required' })
  })
})

export type CreateUserInput = TypeOf<typeof createNoteSchema>['body']
export type UpdateNoteInput = TypeOf<typeof updateNoteSchema>['body']
export type ListNoteInput = TypeOf<typeof listNoteSchema>['query']
export type GetNoteInput = TypeOf<typeof getNoteSchema>['params']
export type ShareNoteInput = TypeOf<typeof shareNoteSchema>['body']
