import { Router } from 'express'
import healthCheckRoute from '@src/api/routes/healthcheck'
import ProductRouter from '@src/api/routes/product.router'

export default (): Router => {
  const router = Router()
  router.use('/products', ProductRouter)
  router.use('/health', healthCheckRoute)
  return router
}
