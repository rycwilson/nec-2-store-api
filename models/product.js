import mongoose from 'mongoose'

const productAttributes = {
  name: {
    type: String,
    required: [true, 'Product name is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required']
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 4.5
  },
  company: {
    type: String,
    enum: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'],
      message: '{VALUE} is not supported'
    } 
  }
}
const options = { timestamps: true }
const productSchema = new mongoose.Schema(productAttributes, options)
const Product = mongoose.model('Product', productSchema)

export default Product

