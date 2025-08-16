// mongoose-connection.logger.ts
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class MongooseConnectionLogger implements OnApplicationBootstrap {
  private readonly logger = new Logger('Mongoose');

  constructor(@InjectConnection() private readonly conn: Connection) {}

  async onApplicationBootstrap() {
    this.conn.on('connected',    () => this.logger.log('✅ Conectado a MongoDB'));
    this.conn.on('error',        (err) => this.logger.error(`❌ Error MongoDB: ${err}`));
    this.conn.on('disconnected', () => this.logger.warn('⚠️ Desconectado de MongoDB'));

      try {
      await this.conn.db?.admin().ping();
      this.logger.log(`🏓 Ping OK — DB: ${this.conn.db?.databaseName || 'desconocida'}`);
    } catch (e) {
      this.logger.error('🏓 Ping FAILED', e as any);
    }
  }
}