import dotenv from 'dotenv'
import connectDb from './config/db.js'
import Product from './models/product.js'
import productsData from './products.json' assert { type: 'json' }

dotenv.config()
const appName = 'nec-store-api'

start()

async function start() {
  try {
    await connectDb(`${process.env.MONGO_URI}/${appName}`)
    await Product.deleteMany()
    await Product.create(productsData)
    console.log(`successfully connected to database: ${appName}`)
    console.log('successfully seeded products')
    process.exit(0)
  } catch (err) {
    console.error(`Error connecting to database: ${err.message}`)
    process.exit(1)
  }
}