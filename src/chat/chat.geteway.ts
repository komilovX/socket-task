import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { User } from 'src/auth/user.entity'
import { ChatService } from './chat.service'

@WebSocketGateway({ transport: ['websocket'] })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(socket: Socket) {
    const user = await this.chatService.getUserFromSocket(socket)
    if (user) {
      await this.chatService.updateUserStatus(user, true)
    }
  }

  async handleDisconnect(socket: Socket) {
    const user = await this.chatService.getUserFromSocket(socket)
    if (user) {
      await this.chatService.updateUserStatus(user, false)
    }
  }

  @SubscribeMessage('send_message')
  async listenForMessages(
    @MessageBody() data: { content: string; receiverId: number },
    @ConnectedSocket() socket: Socket,
  ) {
    const author = await this.chatService.getUserFromSocket(socket)
    const receiver = await this.chatService.findUser(data.receiverId)
    const message = await this.chatService.saveMessage(
      data.content,
      author,
      receiver,
    )

    this.server.sockets.emit('receive_message', message)
    this.server.sockets.emit(`receive_message-${data.receiverId}`, message)
  }

  @SubscribeMessage('get_users')
  async getUsers(@ConnectedSocket() socket: Socket) {
    const user = await this.getUserFromSocket(socket)
    console.log('user', user)

    const onlineUsers = await this.chatService.getOnlineUsers(user.id)

    this.server.sockets.emit('receive_users', onlineUsers)
  }

  @SubscribeMessage('get_user')
  async getUser(@MessageBody() content: string) {
    const user = await this.chatService.findUser(+content)

    this.server.sockets.emit('receive_user', user)
  }

  private getUserFromSocket(socket: Socket): Promise<User> {
    return this.chatService.getUserFromSocket(socket)
  }
}
