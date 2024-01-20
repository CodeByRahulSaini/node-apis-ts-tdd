import { Ref, getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose'
import { User } from '../auth/user.model'
import { Document } from 'mongoose'
@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true
  }
})
@index({ title: 'text', body: 'text', tags: 'text' })
@index({ userId: 1 })
export class Note extends Document {
  @prop({ ref: () => User, required: true })
  userId?: Ref<User>

  @prop({ required: true })
  title!: string

  @prop()
  body!: string

  @prop({ type: () => [String] })
  tags?: string[]
}

// Create the note model from the Note class
const noteModel = getModelForClass(Note)
export default noteModel
