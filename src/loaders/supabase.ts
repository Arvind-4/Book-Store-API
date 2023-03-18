import { createClient, SupabaseClient } from "@supabase/supabase-js";
import Logger from "@src/loaders/logger";

export class SupabaseInstance {
  private static instance: SupabaseInstance;
  public static supabase: SupabaseClient;

  //Connection Configutation
  private options: object = {
    db: {
      schema: "public",
    },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
    global: {
      headers: { "x-onsite-rfid-v1": "onsite-rfid-backend" },
    },
  };

  //Database Credentials
  private projectURL: string = "https://ysxlddldteikevwsracz.supabase.co";
  private anaon_key: string =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzeGxkZGxkdGVpa2V2d3NyYWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwNTgyMzYsImV4cCI6MTk5MjYzNDIzNn0.wC_nJrGiIX1IVHTzHXOcPQ-e_mVygdsnrsu7B2eZb8k";

  //Constructor
  private constructor() {
    Logger.warn("🔶 New Supabase Instance Created!!");
  }

  private async initialize() {
    try {
      SupabaseInstance.supabase = await createClient(
        this.projectURL,
        this.anaon_key,
        this.options
      );
      Logger.warn(`✅ Connected to Supabase`);
    } catch (err) {
      Logger.error("❌ Could not connect to MongoDB\n%o", err);
      throw err;
    }
  }

  //Singleton Function Implement
  public static getInstance = async (): Promise<SupabaseInstance> => {
    if (!SupabaseInstance.instance) {
      SupabaseInstance.instance = new SupabaseInstance();
      await SupabaseInstance.instance.initialize();
    }
    Logger.info(`🔄 Old instance Called again :)`);
    return SupabaseInstance.instance;
  };
}
