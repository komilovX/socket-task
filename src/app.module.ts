import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { CommonModule } from './common/common.module'
import { configOptions } from './config/environment.config'
import { getTypeOrmConfig } from './config/typeorm.config'
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    AuthModule,
    CommonModule,
    ChatModule,
  ],
})
export class AppModule {}
