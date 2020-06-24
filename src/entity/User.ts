import { Notification } from './Notification';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Article } from './Article';
import { Comment } from './Comment';
import { Like } from './Like';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'nvarchar',
    length: '300',
    nullable: false,
  })
  nickname: string;
  @Column({
    type: 'nvarchar',
    length: '300',
    nullable: false,
  })
  fullName: string;
  @Column({
    type: 'nvarchar',
    nullable: true,
  })
  avatar: string;
  @Column({
    type: 'nvarchar',
    nullable: true,
  })
  age: string;
  @Column({
    type: 'nvarchar',
    nullable: true,
  })
  gender: string;
  @Column({
    type: 'boolean',
    default: false,
  })
  isActive: boolean;
  @Column({
    type: 'nvarchar',
    length: '300',
    nullable: false,
  })
  email: string;
  @Column({
    type: 'nvarchar',
    nullable: false,
  })
  password: string;

  @OneToMany((type) => Article, (article) => article.user)
  articles: Article;

  @OneToMany((type) => Comment, (article) => article.user)
  comments: Comment;

  @OneToMany((type) => Notification, (notifi) => notifi.sender)
  notificationSender: Notification;

  @OneToMany((type) => Notification, (notifi) => notifi.receiver)
  notificationReceiver: Notification;

  @OneToMany((type) => Like, (like) => like.user)
  likes: Like;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
