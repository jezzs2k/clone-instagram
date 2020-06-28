import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Article } from './Article';
import { Comment } from './Comment';
import { Like } from './Like';
import { Friend } from './Friend';
import { Notification } from './Notification';

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

  @OneToMany((type) => Comment, (article) => article.sender)
  commentsSender: Comment;
  @OneToMany((type) => Comment, (article) => article.receiver)
  commentsReceiver: Comment;

  @OneToMany((type) => Notification, (notifi) => notifi.sender)
  notificationsSender: Notification;
  @OneToMany((type) => Notification, (notifi) => notifi.receiver)
  notificationsReceiver: Notification;

  @OneToMany((type) => Friend, (friend) => friend.sender)
  friendsSender: Friend;

  @OneToMany((type) => Friend, (friend) => friend.receiver)
  friendsReceiver: Friend;

  @OneToMany((type) => Like, (like) => like.user)
  likes: Like;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
