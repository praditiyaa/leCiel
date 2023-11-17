const router = require('express').Router();
const readingListController = require('../controllers/readingListController');

router.post('/', readingListController.createList);
router.get('/', readingListController.listDet);

router.patch('/:mangaId', readingListController.upManga);
router.delete('/:mangaId', readingListController.delManga);

module.exports = router;
