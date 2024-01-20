import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { Status } from '../../utils/response.util'
import { Note } from './note.model'

describe('testing /note', () => {
  let setCookies

  const userDetails = {
    name: 'user',
    email: 'user@test.com',
    password: 'asd12@@d2w',
    passwordConfirm: 'asd12@@d2w'
  }

  const noteDetails: Partial<Note> = {
    title: 'Test name',
    body: 'One two three',
    tags: ['work', 'personal', 'random']
  }

  // Setting up environment for tests
  beforeAll(async () => {
    try {
      const REGISTER_ROUTE = '/api/auth/register'
      const LOGIN_ROUTE = '/api/auth/login'

      const res = await request(app).post(REGISTER_ROUTE).send(userDetails)
      if (res.body.status === Status.Success) {
        const loginResponse = await request(app).post(LOGIN_ROUTE).send(userDetails)
        setCookies = loginResponse.headers['set-cookie']
      }
      if (!setCookies) throw 'Login Failed.'
    } catch (error) {
      throw new Error(`Stopping tests, Reason: ${error}`)
    }
  })

  describe('POST /', () => {
    const ROUTE = '/api/notes'
    test('should create note', async () => {
      const res = await request(app).post(ROUTE).set('Cookie', setCookies).send(noteDetails)
      expect(res.body.status).toBe(Status.Success)
      expect(res.body.data.note).toMatchObject(noteDetails)
      noteDetails._id = res.body.data.note._id
    })
  })

  describe('GET /', () => {
    const ROUTE = '/api/notes'
    test('should return all notes', async () => {
      const res = await request(app).get(ROUTE).set('Cookie', setCookies).send()
      expect(res.body.status).toBe(Status.Success)
      expect(res.body.data.notes.length).toBe(1)
    })
  })

  describe('GET /:id', () => {
    const ROUTE = '/api/notes'
    test('should return all notes', async () => {
      const res = await request(app).get(`${ROUTE}/${noteDetails._id}`).set('Cookie', setCookies).send()
      expect(res.body.status).toBe(Status.Success)
      expect(res.body.data.note).toMatchObject(noteDetails)
    })
  })

  describe('PUT /:id', () => {
    const ROUTE = '/api/notes'
    test('should update note', async () => {
      noteDetails.title = 'New title'
      noteDetails.body = 'New body'
      const res = await request(app).put(`${ROUTE}/${noteDetails._id}`).set('Cookie', setCookies).send(noteDetails)
      expect(res.body.status).toBe(Status.Success)
      expect(res.body.data.note).toMatchObject(noteDetails)
    })
  })

  describe('DELETE /:id', () => {
    const ROUTE = '/api/notes'

    test('should not delete note with wrong id', async () => {
      const noteId = new mongoose.Types.ObjectId().toString()
      const deleteRes = await request(app).delete(`${ROUTE}/${noteId}`).set('Cookie', setCookies)
      expect(deleteRes.body.status).toBe(Status.Error)
    })

    test('should delete note', async () => {
      const deleteRes = await request(app).delete(`${ROUTE}/${noteDetails._id}`).set('Cookie', setCookies)
      expect(deleteRes.body.status).toBe(Status.Success)
    })
  })
})
