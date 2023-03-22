import { Router } from 'express'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} from '@src/api/services/product.service'

const ProductRouter = Router()
ProductRouter.get('/all', getProducts)
ProductRouter.get('/single/:id', getSingleProduct)
ProductRouter.post('/create', createProduct)
ProductRouter.put('/update/:id', updateProduct)
ProductRouter.delete('/delete/:id', deleteProduct)

export default ProductRouter
