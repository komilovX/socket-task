import { User } from 'src/auth/user.entity'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  content: string

  @Column({ nullable: true })
  filePath: string

  @Column({ nullable: true })
  fileName: string

  @ManyToOne(() => User, (user) => user.messages)
  author: User

  @Column('int')
  authorId: number

  @ManyToOne(() => User, (user) => user.messages)
  receiver: User

  @Column('int')
  receiverId: number

  @CreateDateColumn()
  createdAt: Date
}
