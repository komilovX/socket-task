import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { User } from 'src/auth/user.entity'
import { ChatGateway } from './chat.geteway'
import { ChatService } from './chat.service'
import { Message } from './message.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Message, User]), AuthModule],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
