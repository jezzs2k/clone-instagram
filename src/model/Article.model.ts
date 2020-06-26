import { EntityManager } from 'typeorm';

import { ArticleError } from '../common/error';
import { Article } from '../entity/Article';

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
      });

      if (!article) {
        throw ArticleError.ARTICLE_NOT_FOUND;
      }

      await transactionArticle.getRepository(Article).delete(article);

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
        order: { createAt: 'DESC' },
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
      const perPage = 1;
      const skip = (page - 1) * perPage;

      const articles = await transactionArticle.getRepository(Article).find({
        where: { userId },
        relations: ['user', 'likes', 'comments'],
        skip: skip,
        take: perPage,
        order: { createAt: 'DESC' },
      });

      return articles;
    } catch (error) {
      throw error;
    }
  };
}
