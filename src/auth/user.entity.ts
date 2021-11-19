import { classToPlain, Exclude } from 'class-transformer'
import { Message } from 'src/chat/message.entity'
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

@Entity()
@Unique(['login'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  login: string

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string

  @Column({ default: false })
  isOnline: boolean

  @Column()
  @Exclude({ toPlainOnly: true })
  salt: string

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[]

  toJSON() {
    return classToPlain(this)
  }
}
