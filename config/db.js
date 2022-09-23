import mongoose from 'mongoose'

const connectDb = (dbUrl) => {
  mongoose.connect(
    dbUrl, 
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
}

export default connectDb