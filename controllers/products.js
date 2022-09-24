import Product from '../models/product.js'
import errorHandler from '../middleware/error-handler.js'

const getProducts = async (req, res) => {
  // async handler allows this?
  // throw new Error('there was an error')
  const { featured, company, name, sort, fields, numericFilters } = req.query
  const q = {}
  if (featured) q.featured = featured === 'true' ? true : false
  if (company) q.company = company
  if (name) q.name = { $regex: name, $options: 'i' }
  if (numericFilters) {
    const operatorMap = {
      '>'   : '$gt',
      '>='  : '$gte',
      '='   : '$eq',
      '<'   : '$lt',
      '<='  : '$lte'
    }
    const regEx = /(<|>|>=|<=|=)/g
    let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
    const numericFields = ['price', 'rating']
    filters = filters.split(',').forEach(item => {
      const [field, operator, value] = item.split('-')
      if (numericFields.includes(field)) {
        q[field] = { [operator]: Number(value) }
      }
    })
  }
  let result = Product.find(q)
  if (sort) { 
    const sortParams = sort.split(',').join(' ')
    result = result.sort(sortParams) 
  } else {
    result = result.sort('createdAt')
  }
  if (fields) {
    const fieldsSet = fields.split(',').join(' ')
    result = result.select(fieldsSet)
  }
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)
  const products = await result
  res.status(200).json({ products })
}

export { getProducts }