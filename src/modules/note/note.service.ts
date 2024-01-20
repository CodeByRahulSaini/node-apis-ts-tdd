import mongoose, { FilterQuery, QueryOptions } from 'mongoose'
import noteModel, { Note } from './note.model'

export const createNote = async (input: Partial<Note>) => {
  return noteModel.create(input)
}

export const findAllNotes = async (query: FilterQuery<Note>) => {
  return noteModel.find(query)
}

export const findNote = async (query: FilterQuery<Note>, options: QueryOptions = {}) => {
  return noteModel.findOne(query, {}, options)
}

export const updateNote = async (query: FilterQuery<Note>, input: Partial<Note>) => {
  return noteModel.findOneAndUpdate(query, input, { new: true })
}

export const deleteNote = (query: FilterQuery<Note>) => {
  return noteModel.deleteOne(query)
}

export const shareNote = async (query: FilterQuery<Note>, userId: string) => {
  const note = await noteModel.findOne(query).lean()
  delete note?._id
  const mongooseId = new mongoose.Types.ObjectId(userId)
  return createNote({ ...note, userId: mongooseId })
}
