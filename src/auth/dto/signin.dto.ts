import { IsString } from 'class-validator'

export class SigninDto {
  @IsString()
  login: string

  @IsString()
  password: string
}
