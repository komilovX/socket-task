import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SigninDto } from './dto/signin.dto'
import { SignupDto } from './dto/signup.dto'
import { AuthRepository } from './auth.repository'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { User } from './user.entity'
import { Not } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(dto: SignupDto) {
    return await this.authRepository.signUp(dto)
  }

  async signIn(dto: SigninDto): Promise<any> {
    const payload = await this.authRepository.signIn(dto)
    if (payload) {
      const token = await this.jwtService.sign(payload.toJSON())
      return { token, user: payload }
    } else {
      throw new NotFoundException('Wrong login or password!')
    }
  }
  async getUserFromAuthenticationToken(token: string) {
    const payload: User = this.jwtService.verify(token, {
      secret: this.configService.get<string>('SECRET_KEY'),
    })

    if (payload.id) {
      return this.authRepository.findOne(payload.id)
    }
  }

  async updateStatus(user: User, status: boolean) {
    return await this.authRepository.update(user, { isOnline: status })
  }

  async getOnlineUsers(userId: number) {
    return await this.authRepository.find({
      where: { id: Not(userId), isOnline: true },
    })
  }

  async findUser(userId: number) {
    return await this.authRepository.findOne(userId)
  }
}
