import * as Joi from 'joi'
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces'

export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema: Joi.object({
    DATABASE_HOST: Joi.string().default('localhost'),
    DATABASE_NAME: Joi.required(),
    DATABASE_USER: Joi.required(),
    DATABASE_PASSWORD: Joi.required(),
    DATABASE_PORT: Joi.number().default(5432),
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'provision')
      .default('development'),
  }),
}
