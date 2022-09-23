import express, { application } from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import 'express-async-errors'
import notFound from './middleware/not-found.js'
import errorHandler from './middleware/error-handler.js'
import productsRouter from './routes/products.js'

const appName = 'nec-store-api'
const app = express()
const port = process.env.PORT || 8000

dotenv.config()

app.get('/', (req, res) => {
  res.send(`
    <h2>Store API</h2>
    <a href="/api/v1/products">products route</a>
  `)
})

app
  .use(express.json())
  .use('/api/v1/products', productsRouter)
  .use(errorHandler)
  .use(notFound)

start()

async function start() {
  try {
    await connectDb(`${process.env.MONGO_URI}/${appName}`)
    app.listen(port, () => console.log(`${appName} server is listening on port ${port}...`))
  } catch (err) {
    console.error(`Error connecting to database: ${err.message}`)
  }
}