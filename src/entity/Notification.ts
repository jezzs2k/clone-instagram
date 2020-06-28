import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './User';

@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'nvarchar',
    nullable: false,
  })
  text: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isRead: boolean;

  @Column()
  senderId: number;
  @ManyToOne((type) => User, (user) => user.notificationSender)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column()
  receiverId: number;
  @ManyToOne((type) => User, (user) => user.notificationReceiver)
  @JoinColumn({ name: 'receiverId' })
  receiver: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
