import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mongoose, { Mongoose } from 'mongoose';
import { Logger } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  private mongoose: Mongoose;

  constructor(private configService: ConfigService) {}

  async connect(): Promise<void> {
    const uri = this.configService.get('MONGODB_URI');

    this.mongoose = await mongoose.connect(uri);

    const db = this.mongoose.connection.db;

    const collections = await db.listCollections().toArray();

    const collectionNames = collections.map((c) => c.name);

    if (collectionNames.includes('issues')) {
      this.logger.log('Collection exists');
    } else {
      this.logger.log('Collection does not exist');
    }
  }

  async disconnect(): Promise<void> {
    await this.mongoose.disconnect();
  }
}
