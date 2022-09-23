import mongoose from 'mongoose'

const connectDb = (dbUrl) => {
  mongoose.connect(
    dbUrl, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
}

export default connectDb