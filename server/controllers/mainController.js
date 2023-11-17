const { User, History, ReadingList } = require('../models/index');
const { animeList, mangadex } = require('../api/axios');
const { Op } = require('sequelize');

class mainController {
  static async showAll(req, res, next) {
    try {
      let result;
      if (req.query) {
        const { offset } = req.query;
        result = await animeList.get(
          `/manga/ranking?fields=synopsis&offset=${offset}&ranking_type=manga&nsfw=false`
        );
      } else {
        result = await animeList.get(
          '/manga/ranking?fields=synopsis&ranking_type=manga&nsfw=false'
        );
      }

      const { data, paging } = result.data;

      paging.next = paging.next.split('/ranking')[1];
      if (paging.previous)
        paging.previous = paging.previous.split('/ranking')[1];

      res.status(200).json({ data, paging });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async showDet(req, res, next) {
    try {
      let { mangaId } = req.params;
      let listChapter;

      const { data } = await animeList.get(
        `/manga/${mangaId}?fields=id,title,main_picture,start_date,end_date,synopsis,rank,media_type,status,genres,authors{first_name,last_name}`
      );

      if (!data) throw new Error('NotFound');

      const year = data.start_date.split('-')[0];

      mangaId = (
        await mangadex.get('/manga', {
          params: { title: data.title, year },
        })
      ).data.data[0];

      if (!mangaId) {
        listChapter = 'NoDataFound';
      } else {
        listChapter = (
          await mangadex.get(`manga/${mangaId.id}/feed`, {
            params: {
              order: { chapter: 'asc' },
              'translatedLanguage[]': 'en',
              limit: 20,
            },
          })
        ).data.data;
      }

      res.status(200).json({ data, listChapter });
    } catch (err) {
      next(err);
    }
  }

  static async showChapter(req, res, next) {
    try {
      let { chapterId, pageId } = req.params;

      const {
        data: {
          chapter: { hash, data },
        },
      } = await mangadex.get(`/at-home/server/${chapterId}`);

      let result = `https://uploads.mangadex.org/data/${hash}/${
        data[pageId - 1]
      }`;

      if (!data[pageId - 1]) result = 'NoMorePage';

      res.status(200).json({ result });
    } catch (err) {
      next(err);
    }
  }

  static async postTwitter(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = mainController;
