import { Router } from 'express'
import { getProducts } from '../controllers/products.js'

const router = Router()

router.route('/')
  .get(getProducts)

export default router