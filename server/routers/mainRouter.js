const router = require('express').Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.showAll);
router.get('/detail/:mangaId', mainController.showDet);
router.get('/chapter/:chapterId/:pageId', mainController.showChapter);

module.exports = router;
