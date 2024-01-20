import mongoose from 'mongoose'
import config from 'config'
const dbUrl = config.get<string>(process.env.NODE_ENV === 'test' ? 'dbURITest' : 'dbURI')

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl)
    console.log('Database connected...')
  } catch (error: unknown) {
    console.log(`DB Connection error | Retrying...`)
    setTimeout(connectDB, 10000)
  }
}
const disconnectDB = async () => {
  await mongoose.connection.close()
}

const clearDatabase = async () => {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
}

export { connectDB, disconnectDB, clearDatabase }
