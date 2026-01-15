import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // Never use synchronize in production
        synchronize: configService.get<string>('app.nodeEnv') === 'development',
        // Log only in development
        logging: configService.get<string>('app.nodeEnv') === 'development',
        // Connection pooling configuration
        poolSize: configService.get<number>('database.poolSize', 10),
        maxQueryExecutionTime: 10000, // 10 seconds
        // Performance optimizations
        cache: {
          type: 'redis',
          options: {
            host: configService.get<string>('redis.host', 'localhost'),
            port: configService.get<number>('redis.port', 6379),
          },
          duration: 30000, // 30 seconds cache
        },
        // SSL configuration for production
        ssl: configService.get<string>('app.nodeEnv') === 'production' ? {
          rejectUnauthorized: false,
        } : false,
        // Additional connection options
        extra: {
          // Set the tenant ID for each connection (RLS)
          options:
            '-c app.current_organization_id=11111111-1111-1111-1111-111111111111', // default dev org
          // Connection pool settings
          max: configService.get<number>('database.poolSize', 10),
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 10000,
          // Statement timeout (5 minutes)
          statement_timeout: 300000,
        },
        // Migrations configuration
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        migrationsRun: configService.get<string>('app.nodeEnv') === 'production',
        migrationsTableName: 'migrations',
        // Retry configuration
        retryAttempts: 3,
        retryDelay: 3000,
      }),
    }),
  ],
})
export class DatabaseModule {}
