import DynamoDb from 'cyclic-dynamodb'

import Logger from '@src/loaders/logger'
import config from '@src/config'

export class DynamoDbInstance {
  private static instance: typeof DynamoDb
  private readonly dbUrl: string = config.cyclicDB.dbUrl

  private constructor () {
    Logger.warn('🔶 New Dynamo DB Instance Created!!')
  }

  private async initialize () {
    try {
      DynamoDbInstance.instance = await DynamoDb(this.dbUrl)
      Logger.warn('✅ Connected to DynamoDB')
    } catch (err) {
      Logger.error('❌ Could not connect to MongoDB\n%o', err)
      throw err
    }
  }

  public static getInstance = async (): Promise<DynamoDb> => {
    if (!DynamoDbInstance.instance) {
      DynamoDbInstance.instance = new DynamoDbInstance()
      await DynamoDbInstance.instance.initialize()
    }
    Logger.info('🔄 Old instance Called again :)')
    return DynamoDbInstance.instance
  }
}
