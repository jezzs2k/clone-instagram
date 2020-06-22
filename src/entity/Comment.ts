import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './User';
import { Article } from './Article';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'nvarchar',
    nullable: false,
  })
  text: number;

  @Column()
  userId: number;
  @ManyToOne((type) => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  articleId: number;
  @ManyToOne((type) => Article, (article) => article.comments)
  @JoinColumn({ name: 'articleId' })
  article: Article;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
