import Product from '../models/product.js'
import errorHandler from '../middleware/error-handler.js'

const getProducts = async (req, res) => {
  // throw new Error('there was an error')
  const products = await Product.find(req.query)
  res.status(200).json({ products })
}

export { getProducts }