import { Body, Controller, Get, Post } from '@nestjs/common'
import { GetUser } from 'src/common/decorators/get-user.decorator'
import { Public } from 'src/common/decorators/public.decorator'
import { AuthService } from './auth.service'
import { SigninDto } from './dto/signin.dto'
import { SignupDto } from './dto/signup.dto'
import { User } from './user.entity'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUp(@Body() dto: SignupDto) {
    return this.authService.signUp(dto)
  }

  @Public()
  @Post('signin')
  async signIn(@Body() dto: SigninDto) {
    return this.authService.signIn(dto)
  }

  @Get('profile')
  async getProfile(@GetUser() user: User) {
    return user
  }
}
