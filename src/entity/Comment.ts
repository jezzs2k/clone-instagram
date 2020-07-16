import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { User } from './User';
import { Article } from './Article';
import { Like } from './Like';
import { ReplyToComment } from './ReplyToComment';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'nvarchar',
    nullable: false,
  })
  text: string;

  @Column()
  senderId: number;
  @ManyToOne((type) => User, (user) => user.commentOfUser)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column()
  articleId: number;
  @ManyToOne((type) => Article, (article) => article.comments)
  @JoinColumn({ name: 'articleId' })
  article: Article;

  @OneToMany((type) => Like, (like) => like.comment)
  likes: Like;

  @OneToMany(
    (type) => ReplyToComment,
    (commentToUSer) => commentToUSer.commentArticle
  )
  commentToUsers: Comment;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
