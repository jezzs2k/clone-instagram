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
import { Comment } from './Comment';

@Entity('comment-to-user')
export class CommentToUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'nvarchar',
    nullable: false,
  })
  text: string;

  @Column()
  senderId: number;
  @ManyToOne((type) => User, (user) => user.commentsSender)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column({ nullable: true })
  receiverId: number;
  @ManyToOne((type) => User, (user) => user.commentsReceiver)
  @JoinColumn({ name: 'receiverId' })
  receiver: User;

  @Column()
  commentArticleId: number;
  @ManyToOne((type) => Comment, (comment) => comment.commentToUsers)
  @JoinColumn({ name: 'commentArticleId' })
  commentArticle: Comment;

  @Column()
  articleId: number;
  @ManyToOne((type) => Article, (article) => article.comments)
  @JoinColumn({ name: 'articleId' })
  article: Article;

  @OneToMany((type) => Like, (like) => like.comment)
  likes: Like;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
