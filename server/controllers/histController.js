const { User, History, ReadingList } = require('../models/index');
const { animeList } = require('../api/axios');
const { Op } = require('sequelize');

class histController {
  static async createHist(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      let { mangaId } = req.params;

      const [hist, created] = await History.findOrCreate({
        where: { [Op.and]: { userId: userId, mangaId: mangaId } },
        defaults: {
          userId: userId,
          mangaId: mangaId,
        },
      });

      const message = created ? 'Updated' : 'Existed';

      res.status(201).json({ message });
    } catch (err) {
      next(err);
    }
  }

  static async readHist(req, res, next) {
    try {
      const { userId } = req.loginInfo;

      const data = await History.findAll({
        where: { userId: userId },
        order: [['id', 'DESC']],
      });

      if (!data) throw new Error('NotFound');

      res.status(201).json({ data });
    } catch (err) {
      next(err);
    }
  }

  static async delHist(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      let { histId } = req.params;

      const data = await History.destroy({
        where: { [Op.and]: { userId: userId, id: histId } },
      });

      if (!data) throw new Error('NotFound');

      res.status(200).json({ message: 'deleted' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = histController;
