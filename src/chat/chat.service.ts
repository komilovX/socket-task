import { Injectable } from '@nestjs/common'
import { Socket } from 'socket.io'
import { parse } from 'cookie'
import { WsException } from '@nestjs/websockets'
import { AuthService } from 'src/auth/auth.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Message } from './message.entity'
import { Repository } from 'typeorm'
import { User } from 'src/auth/user.entity'

@Injectable()
export class ChatService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async getUserFromSocket(socket: Socket): Promise<User> {
    const cookie = socket.handshake.headers.cookie

    if (!cookie) {
      return null
    }
    const { token: authenticationToken } = parse(cookie)

    const user = await this.authService.getUserFromAuthenticationToken(
      authenticationToken,
    )
    if (!user) {
      throw new WsException('Invalid credentials.')
    }
    return user
  }

  async saveMessage(content: string, author: User, receiver: User) {
    const newMessage = await this.messagesRepository.create({
      content,
      author,
      receiver,
    })
    await this.messagesRepository.save(newMessage)
    return newMessage
  }

  async getAllMessages() {
    return this.messagesRepository.find({
      relations: ['author', 'receiver'],
    })
  }

  async updateUserStatus(user: User, status: boolean) {
    return this.authService.updateStatus(user, status)
  }

  async getOnlineUsers(userId: number) {
    return this.authService.getOnlineUsers(userId)
  }

  async findUser(userId: number) {
    return this.authService.findUser(userId)
  }
}
