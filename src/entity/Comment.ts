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
import { ParentsComment } from './ParentsComment';

@Entity('comment_child')
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
  @ManyToOne((type) => User, (user) => user.commentsSender)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column({ nullable: true })
  receiverId: number;
  @ManyToOne((type) => User, (user) => user.commentsReceiver)
  @JoinColumn({ name: 'receiverId' })
  receiver: User;

  @Column()
  articleId: number;
  @ManyToOne((type) => Article, (article) => article.parentsComment)
  @JoinColumn({ name: 'articleId' })
  article: Article;

  @Column()
  parentsCommentId: number;
  @ManyToOne(
    (type) => ParentsComment,
    (parentsComment) => parentsComment.comments
  )
  @JoinColumn({ name: 'commentArticleId' })
  parentsComment: ParentsComment;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
