import { MongoClient, Db, Collection, Document } from "mongodb";

class DatabaseService {
  private static client: MongoClient | null = null;
  private static db: Db | null = null;

  private constructor() {
    // Private constructor to prevent instantiation
  }

  private static async connect(): Promise<void> {
    if (this.client && this.db) {
      return;
    }

    const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string;
    const dbName = process.env.NEXT_PUBLIC_MONGODB_NAME as string;

    if (!uri || !dbName) {
      throw new Error(
        "Database URI or name is not defined in environment variables."
      );
    }

    this.client = new MongoClient(uri);

    await this.client.connect();
    this.db = this.client.db(dbName);
  }

  public static async getDb(): Promise<Db> {
    if (!this.db) {
      await this.connect();
    }

    if (!this.db) {
      throw new Error("Database connection failed.");
    }

    return this.db;
  }

  public static async getCollection<T extends Document>(
    collectionName: "users" | "products" | "orders" | "addresses"
  ): Promise<Collection<T>> {
    if (!this.db) {
      await this.connect();
    }

    if (!this.db) {
      throw new Error("Database connection failed.");
    }

    return this.db.collection<T>(collectionName);
  }

  public static async closeConnection(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
    }
  }
}

export default DatabaseService;
