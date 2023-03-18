require('dotenv').config()

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export default {
  dev: process.env.NODE_ENV !== 'production',
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT) || 8000,
  cyclicDB: {
    url: process.env.CYCLIC_URL,
    dbUrl: process.env.CYCLIC_DB,
    bucketName: process.env.CYCLIC_BUCKET_NAME,
    appId: process.env.CYCLIC_APP_ID
  },
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  },
  api: {
    prefix: '/api'
  }
}
