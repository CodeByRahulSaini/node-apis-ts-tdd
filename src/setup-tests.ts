import { connectDB, disconnectDB, clearDatabase } from './utils/connect-db.util'

beforeAll(async () => {
  await connectDB()
})

afterAll(async () => {
  await clearDatabase()
  await disconnectDB()
})
