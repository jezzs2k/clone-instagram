import { getConnection } from 'typeorm';

import { ArticleModel } from '../model/Article.model';

const articleModel = new ArticleModel();

export class ArticleService {
  createArticle = async (
    data: { title: string; image: string },
    userId: number
  ) => {
    try {
      let result;
      await getConnection().transaction(async (transactionArticle) => {
        result = await articleModel.createArticle(
          data,
          userId,
          transactionArticle
        );
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  updateArticle = async (
    data: { title: string; image: string },
    articleId: number
  ) => {
    try {
      let result;
      await getConnection().transaction(async (transactionArticle) => {
        result = await articleModel.updateArticle(
          data,
          articleId,
          transactionArticle
        );
      });

      return result;
    } catch (error) {
      throw error;
    }
  };

  deleteArticle = async (articleId: number, userId: number) => {
    try {
      let result;
      await getConnection().transaction(async (transactionArticle) => {
        result = await articleModel.deleteArticle(
          articleId,
          userId,
          transactionArticle
        );
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  getManyArticle = async (page: number) => {
    try {
      let result;
      await getConnection().transaction(async (transactionArticle) => {
        result = await articleModel.getManyArticle(page, transactionArticle);
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  getArticleOfUser = async (userId: number) => {
    try {
      let result;
      await getConnection().transaction(async (transactionArticle) => {
        result = await articleModel.getArticleOfUser(
          userId,
          transactionArticle
        );
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  getArticleById = async (id: number) => {
    let result;
    await getConnection().transaction(async (transactionArticle) => {
      result = await articleModel.getArticleById(id, transactionArticle);
    });
    return result;
  };
}
