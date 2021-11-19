import { IsString } from 'class-validator'

export class SignupDto {
  @IsString()
  login: string

  @IsString()
  name: string

  @IsString()
  password: string
}
