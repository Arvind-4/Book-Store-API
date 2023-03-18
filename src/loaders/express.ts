import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import config from '@src/config'
import routes from '@src/api/routes'

export default ({ app }: { app: express.Application }): void => {
  app.use(helmet())
  app.use(cors())
  app.use(express.json({ limit: '2mb' }))
  app.use(config.api.prefix, routes())
}
