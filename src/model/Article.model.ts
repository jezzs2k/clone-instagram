import { EntityManager } from 'typeorm';

import { ArticleError } from '../common/error';
import { Article } from '../entity/Article';
import { Comment } from '../entity/Comment';
import { Like } from './../entity/Like';

export class ArticleModel {
  createArticle = async (
    data: { title: string; image: string },
    userId: number,
    transactionArticle: EntityManager
  ) => {
    try {
      const article = {
        title: data.title || null,
        image: data.image || null,
        userId,
      };
      const result = await transactionArticle
        .getRepository(Article)
        .save(article);

      return result;
    } catch (error) {
      throw error;
    }
  };

  updateArticle = async (
    data: { title: string; image: string },
    articleId: number,
    transactionArticle: EntityManager
  ) => {
    try {
      const article = await transactionArticle.getRepository(Article).findOne({
        where: { id: articleId },
        cache: true,
      });

      article.title = data.title || article.title;
      article.image = data.image || article.image;

      await transactionArticle.getRepository(Article).save(article);

      return article;
    } catch (error) {
      throw error;
    }
  };

  deleteArticle = async (
    articleId: number,
    userId: number,
    transactionArticle: EntityManager
  ) => {
    try {
      const article = await transactionArticle.getRepository(Article).findOne({
        where: {
          id: articleId,
          userId,
        },
        cache: true,
      });

      if (!article) {
        throw ArticleError.ARTICLE_NOT_FOUND;
      }

      const likes = await transactionArticle
        .getRepository(Like)
        .find({ where: { articleId }, cache: true });

      const comments = await transactionArticle
        .getRepository(Comment)
        .find({ where: { articleId }, cache: true });

      await transactionArticle.getRepository(Comment).remove(comments);
      await transactionArticle.getRepository(Like).remove(likes);
      await transactionArticle.getRepository(Article).remove([article]);

      return article;
    } catch (error) {
      throw error;
    }
  };

  getManyArticle = async (page: number, transactionArticle: EntityManager) => {
    try {
      if (page === 0) {
        page = 1;
      }
      const perPage = 1;
      const skip = (page - 1) * perPage;

      const articles = await transactionArticle.getRepository(Article).find({
        relations: ['user', 'likes', 'comments'],
        skip: skip,
        take: perPage,
        order: { createAt: 'ASC' },
        cache: true,
      });

      return articles;
    } catch (error) {
      throw error;
    }
  };

  getArticleOfUser = async (
    page: number,
    userId: number,
    transactionArticle: EntityManager
  ) => {
    try {
      if (page === 0) {
        page = 1;
      }
      const perPage = 10;
      const skip = (page - 1) * perPage;

      const articles = await transactionArticle.getRepository(Article).find({
        where: { userId },
        skip: skip,
        take: perPage,
        relations: ['user', 'likes', 'comments'],
        order: { createAt: 'DESC' },
        cache: true,
      });

      return articles;
    } catch (error) {
      throw error;
    }
  };
}
