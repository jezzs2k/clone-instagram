import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './User';
import { Article } from './Article';
import { ParentsComment } from './ParentsComment';
import { Comment } from './Comment';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderId: number;
  @ManyToOne((type) => User, (user) => user.likes)
  @JoinColumn({ name: 'userId' })
  sender: User;

  @Column({ nullable: true })
  articleId: number;
  @ManyToOne((type) => Article, (article) => article.likes)
  @JoinColumn({ name: 'articleId' })
  article: Article;

  @Column({ nullable: true })
  parentsCommentId: number;
  @ManyToOne((type) => ParentsComment, (parentsComment) => parentsComment.likes)
  @JoinColumn({ name: 'commentId' })
  parentsComment: ParentsComment;

  @Column({ nullable: true })
  commentId: number;

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
