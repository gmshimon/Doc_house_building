/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module, OnModuleInit, Logger, Inject } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { DocterModule } from './docter/docter.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { SlotsModule } from './slots/slots.module';
import { ServicesModule } from './services/services.module';
import { AppointmentModule } from './appointment/appointment.module';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import Redis from 'ioredis';
import type { Cache } from 'cache-manager';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    DocterModule,
    CloudinaryModule,
    SlotsModule,
    ServicesModule,
    AppointmentModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    CacheModule.registerAsync({
      isGlobal: true,
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async () => {
        const client = new Redis({
          host: '127.0.0.1',
          port: 6379,
        });

        const redisStore: any = {
          opts: {},
          client,
          on() {
            return this;
          },
          async get(key: string) {
            return this.client.get(key);
          },
          async set(key: string, value: string, ttl?: number) {
            if (ttl) {
              await this.client.set(key, value, 'PX', ttl);
            } else {
              await this.client.set(key, value);
            }
            return true;
          },
          async delete(key: string) {
            const result = await this.client.del(key);
            return result > 0;
          },
          async clear() {
            await this.client.flushdb();
          },
          async disconnect() {
            await this.client.quit();
          },
        };

        return {
          // Default TTL in ms; override per-call where needed
          ttl: 300_000,
          stores: [redisStore as any],
        };
      },
    }),
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async onModuleInit() {
    try {
      const stores = (this.cacheManager as any).stores;
      const storeClient = Array.isArray(stores)
        ? stores[0]?.opts?.store?.client
        : undefined;
      if (storeClient) {
        this.logger.log(
          `Cache store: redis ${storeClient.options.host}:${storeClient.options.port}`,
        );
      } else {
        this.logger.log('Cache store: memory');
      }

      await this.cacheManager.set('redis_test', 'working', 5_000);
      const value = await this.cacheManager.get('redis_test');

      if (value === 'working') {
        this.logger.log('✅ Redis cache connected successfully!');
      } else {
        this.logger.error('❌ Redis cache NOT working. Value mismatch.');
      }
    } catch (err) {
      this.logger.error('❌ Redis connection FAILED:', err);
    }
  }
}
