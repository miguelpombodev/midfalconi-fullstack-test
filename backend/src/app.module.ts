import { Module } from "@nestjs/common";

import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InfrastructureModule } from "./infrastructure/infrastructure.module";
import { PresentationModule } from "./presentation/presentation.module";
import { ApplicationModule } from "./application/application.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_DATABASE"),
        synchronize: process.env.NODE_ENV == "production" ? false : true,
        autoLoadEntities: true,
      }),
    }),
    PresentationModule,
    InfrastructureModule,
    ApplicationModule,
  ],
})
export class AppModule {}
