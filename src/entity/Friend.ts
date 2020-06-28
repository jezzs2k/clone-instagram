import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './User';

@Entity('friend')
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  isFollow: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  isFollowAgain: boolean;

  @Column()
  senderId: number;
  @ManyToOne((type) => User, (user) => user.comments)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column({ nullable: true })
  receiverId: number;
  @ManyToOne((type) => User, (user) => user.comments)
  @JoinColumn({ name: 'receiverId' })
  receiver: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
