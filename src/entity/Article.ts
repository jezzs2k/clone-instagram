import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { User } from './User';
import { Comment } from './Comment';
import { Like } from './Like';

@Entity('article')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'nvarchar',
    nullable: true,
  })
  title: string;
  @Column({
    type: 'nvarchar',
    nullable: true,
  })
  image: string;

  @Column()
  userId: number;
  @ManyToOne((type) => User, (user) => user.articles)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany((type) => Comment, (comment) => comment.article)
  comments: Comment;

  @OneToMany((type) => Like, (like) => like.article)
  likes: Like;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
