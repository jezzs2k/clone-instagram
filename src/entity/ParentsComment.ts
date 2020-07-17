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

@Entity('parents_comment')
export class ParentsComment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'nvarchar',
    nullable: false,
  })
  text: string;

  @Column()
  senderId: number;
  @ManyToOne((type) => User, (user) => user.parentsComment)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column()
  articleId: number;
  @ManyToOne((type) => Article, (article) => article.parentsComment)
  @JoinColumn({ name: 'articleId' })
  article: Article;

  @OneToMany((type) => Like, (like) => like.parentsComment)
  likes: Like;

  @OneToMany((type) => Comment, (comment) => comment.parentsComment)
  comments: Comment;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
