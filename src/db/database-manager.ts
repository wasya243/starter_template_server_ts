import * as mongoose from 'mongoose';

export class DatabaseManager {
  private readonly uri: string;
  private db: mongoose.Mongoose | null = null;

  constructor(uri: string) {
    this.uri = uri;
  }

  async connect(): Promise<mongoose.Mongoose> {
    const mongoOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 3000,
      socketTimeoutMS: 3000,
    };

    this.db = await mongoose.connect(this.uri, mongoOptions);

    console.log('Database connection established');

    return this.db;
  }
}
