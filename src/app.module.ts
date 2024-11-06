import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { PhotosModule } from './photos/photos.module';
import { ModelsModule } from './models/models.module';
import { EventsModule } from './events/events.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.DB_SSL === "true",
      extra: {
        ssl:
          process.env.DB_SSL === "true"
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
    }),
    AuthModule,
    UserModule,
    ProductsModule,
    PhotosModule,
    ModelsModule,
    EventsModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
