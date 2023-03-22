import 'module-alias/register'
import express from 'express'

import config from '@src/config'
import Loaders from '@src/loaders'
import Logger from '@src/loaders/logger'

async function startServer() {
  const app = express()

  await Loaders({ expressApp: app })

  app
    .listen(config.port, () => {
      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `)
    })
    .on('error', (err) => {
      Logger.error(err)
      process.exit(1)
    })
}

startServer()
