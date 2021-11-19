import * as bcrypt from 'bcrypt'
import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { User } from './user.entity'
import { SignupDto } from './dto/signup.dto'
import { SigninDto } from './dto/signin.dto'

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signUp(dto: SignupDto): Promise<void> {
    const { name, login, password } = dto
    const user = new User()
    user.name = name
    user.login = login
    user.salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(password, user.salt)
    try {
      await user.save()
    } catch (e) {
      if (+e.code === 23505) {
        throw new ConflictException('user already exist')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async signIn(dto: SigninDto): Promise<User> {
    const { login, password } = dto
    const user = await this.findOne({ login })

    if (user) {
      const correctPassword = await bcrypt.compare(password, user.password)
      if (correctPassword) {
        return user
      } else {
        return null
      }
    } else {
      return null
    }
  }
}
