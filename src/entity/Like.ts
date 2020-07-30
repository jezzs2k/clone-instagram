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

@Entity('like_content')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderId: number;
  @ManyToOne((type) => User, (user) => user.likes)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column({ nullable: true })
  articleId: number;
  @ManyToOne((type) => Article, (article) => article.likes)
  @JoinColumn({ name: 'articleId' })
  article: Article;

  @Column({ nullable: true })
  parent_Comment_Id: number;
  @ManyToOne((type) => Comment, (comment) => comment.parentLikes)
  @JoinColumn({ name: 'parent_Comment_Id' })
  parentComments: Comment;

  @Column({ nullable: true })
  commentId: number;
  @ManyToOne((type) => Comment, (comment) => comment.likes)
  @JoinColumn({ name: 'commentId' })
  comments: Comment;

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
