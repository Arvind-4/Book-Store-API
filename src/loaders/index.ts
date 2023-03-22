import type Express from 'express'
import express from '@src/loaders/express'
import Logger from '@src/loaders/logger'
import { DynamoDbInstance } from './database'

export default async ({
  expressApp,
}: {
  expressApp: Express.Application
}): Promise<void> => {
  await DynamoDbInstance.getInstance()
  Logger.info('✅ Database loaded and connected!')

  await express({ app: expressApp })
  Logger.info('✅ Express loaded')

  Logger.info('✅ All modules loaded!')
}
