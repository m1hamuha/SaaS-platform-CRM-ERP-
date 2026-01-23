import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
// import { BullModule } from '@nestjs/bull'; // Disabled for local testing
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { DatabaseModule } from './database/database.module'; // Disabled for testing
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { TenantMiddleware } from './middleware/tenant.middleware';
import configuration from './config/configuration';
import { throttlerConfig } from './config/throttler.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ThrottlerModule.forRoot(throttlerConfig),
    // DatabaseModule, // Disabled for local testing
    HealthModule,
    AuthModule,
    OrganizationsModule,
    UsersModule,
    CustomersModule,
    // Redis-based queue processing (disabled for local testing)
    // BullModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     redis: {
    //       host: configService.get<string>('REDIS_HOST', 'localhost'),
    //       port: configService.get<number>('REDIS_PORT', 6379),
    //     },
    //   }),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
