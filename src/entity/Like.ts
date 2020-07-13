import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './User';
import { Article } from './Article';
import { Comment } from './Comment';
import { CommentToUser } from './CommentToUser';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;
  @ManyToOne((type) => User, (user) => user.likes)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  articleId: number;
  @ManyToOne((type) => Article, (article) => article.likes)
  @JoinColumn({ name: 'articleId' })
  article: Article;

  @Column({ nullable: true })
  commentId: number;
  @ManyToOne((type) => Comment, (comment) => comment.likes)
  @JoinColumn({ name: 'commentId' })
  comment: Comment;

  @Column({ nullable: true })
  commentToUserId: number;
  @ManyToOne(
    (type) => CommentToUser,
    (commentTOUser) => commentTOUser.likesChild
  )
  @JoinColumn({ name: 'commentToUserId' })
  commentToUsers: CommentToUser;

  @Column({
    type: 'boolean',
    default: true,
  })
  isLike: boolean;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
