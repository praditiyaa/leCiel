const { ReadingList } = require('../models/index');
const { Op } = require('sequelize');

class readingList {
  static async createList(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      const { mangaId, type } = req.body;

      const [read, created] = await ReadingList.findOrCreate({
        where: { [Op.and]: { userId: userId, mangaId: mangaId } },
        defaults: {
          userId: userId,
          mangaId: mangaId,
          type,
        },
      });

      const message = created ? 'Created' : 'Existed';

      res.status(201).json({ message });
    } catch (err) {
      next(err);
    }
  }

  static async listDet(req, res, next) {
    try {
      const { userId } = req.loginInfo;

      let data = await ReadingList.findAll({
        where: { userId: userId },
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        order: [['id', 'asc']],
      });

      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  }

  static async delManga(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      const { mangaId } = req.params;

      const data = await ReadingList.destroy({
        where: { [Op.and]: { userId: userId, mangaId } },
      });

      if (!data) throw new Error('NotFound');

      res.status(200).json({ message: 'manga list deleted' });
    } catch (err) {
      next(err);
    }
  }

  static async upManga(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      const { mangaId } = req.params;
      const { type } = req.body;

      console.log(type);

      const data = await ReadingList.findOne({
        where: { [Op.and]: { userId: userId, mangaId } },
      });

      if (!data) throw new Error('NotFound');

      await ReadingList.update(
        { type },
        {
          where: { [Op.and]: { userId: userId, mangaId } },
        }
      );

      res.status(200).json({ message: 'manga type updated' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = readingList;
