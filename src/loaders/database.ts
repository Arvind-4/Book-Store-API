import { Db, Collection, MongoClient, MongoError } from "mongodb";
import Logger from "@src/loaders/logger";
import config from "@src/config/index";

export class DBInstance {
  private static instance: DBInstance;
  private static db: Db;
  private opts: object = {
    appname: "HTB",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxIdleTimeMS: 5000, //time a connection can be idle before it's closed.\
    tls: true,
    compressors: ["zstd"],
  };

  //Database Credentials
  private URL: string = config.dbURL;
  private dbName: string = config.dbName;
  private dbClient: MongoClient = new MongoClient(this.URL, this.opts);

  //Constructor
  private constructor() {
    Logger.warn("🔶 New MongoClient Instance Created!!");
  }

  private async initialize() {
    try {
      const connClient = await this.dbClient.connect();
      DBInstance.db = connClient.db(this.dbName);
      Logger.warn(`✅ Connected to MongoDB: ${this.dbName}`);
    } catch (err) {
      Logger.error("❌ Could not connect to MongoDB\n%o", err);
      throw MongoError;
    }
  }

  //Singleton Function Implement
  public static getInstance = async (): Promise<DBInstance> => {
    if (!DBInstance.instance) {
      DBInstance.instance = new DBInstance();
      await DBInstance.instance.initialize();
    }
    Logger.info(`🔄 Old instance Called again :)`);
    return DBInstance.instance;
  };

  public getCollection = async (collection: string): Promise<Collection> => {
    return DBInstance.db.collection(collection);
  };
}
